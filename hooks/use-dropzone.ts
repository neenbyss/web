"use client"

import * as React from "react"

export type DropzoneErrorCode =
  | "file-too-large"
  | "file-invalid-type"
  | "too-many-files"

export interface DropzoneError {
  file: File
  code: DropzoneErrorCode
  message: string
}

export interface UseDropzoneOptions {
  /**
   * Tipos aceptados: mimes exactos ("image/png"), comodines ("image/*")
   * o extensiones (".pdf"). Cadena separada por comas o array.
   */
  accept?: string | readonly string[]
  /** Tamaño máximo por archivo (bytes). */
  maxSize?: number
  /** Nº máximo de archivos por operación. */
  maxFiles?: number
  /** Permite seleccionar varios archivos. */
  multiple?: boolean
  disabled?: boolean
  /** Se llama con los archivos válidos tras seleccionar / soltar / pegar. */
  onDrop?: (files: File[]) => void
  /** Se llama con los archivos rechazados por la validación de cliente. */
  onError?: (errors: DropzoneError[]) => void
}

export interface DropzoneState {
  /** Hay un archivo siendo arrastrado sobre la zona. */
  isDragging: boolean
  /** El último intento tuvo archivos rechazados. */
  isInvalid: boolean
  disabled: boolean
}

export interface UseDropzoneReturn extends DropzoneState {
  inputRef: React.RefObject<HTMLInputElement | null>
  /** Abre el explorador de archivos. */
  open: () => void
  /** Props para el `<div>` raíz (drag & drop + paste + click). */
  getRootProps: () => React.HTMLAttributes<HTMLElement> & {
    "data-dragging": "" | undefined
    "data-disabled": "" | undefined
    "data-invalid": "" | undefined
  }
  /** Props para el `<input type="file">` oculto. */
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>
  accept?: string
  multiple: boolean
}

function normalizeAccept(accept?: string | readonly string[]): string[] {
  if (!accept) return []
  const list = typeof accept === "string" ? accept.split(",") : accept
  return list.map((s) => s.trim().toLowerCase()).filter(Boolean)
}

function matchesAccept(file: File, patterns: string[]): boolean {
  if (patterns.length === 0) return true
  const mime = file.type.toLowerCase()
  const name = file.name.toLowerCase()

  return patterns.some((pattern) => {
    if (pattern.startsWith(".")) return name.endsWith(pattern)
    if (pattern.endsWith("/*")) return mime.startsWith(pattern.slice(0, -1)) // "image/"
    return mime === pattern
  })
}

/**
 * Lógica pura y headless de un dropzone: click, drag & drop y paste, con
 * validación de cliente (solo UX; la validación real vive en el servidor).
 */
export function useDropzone(options: UseDropzoneOptions = {}): UseDropzoneReturn {
  const { accept, maxSize, maxFiles, multiple = true, disabled = false, onDrop, onError } = options

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isInvalid, setIsInvalid] = React.useState(false)
  const dragDepth = React.useRef(0)

  const acceptPatterns = React.useMemo(() => normalizeAccept(accept), [accept])
  const acceptAttr = React.useMemo<string | undefined>(
    () => (typeof accept === "string" ? accept : accept ? accept.join(",") : undefined),
    [accept],
  )

  const process = React.useCallback(
    (fileList: FileList | File[] | null) => {
      if (disabled || !fileList) return
      const incoming = Array.from(fileList)
      if (incoming.length === 0) return

      const accepted: File[] = []
      const errors: DropzoneError[] = []

      for (const file of incoming) {
        if (!matchesAccept(file, acceptPatterns)) {
          errors.push({
            file,
            code: "file-invalid-type",
            message: `"${file.name}" tiene un tipo no permitido.`,
          })
          continue
        }
        if (maxSize != null && file.size > maxSize) {
          errors.push({
            file,
            code: "file-too-large",
            message: `"${file.name}" supera el tamaño máximo.`,
          })
          continue
        }
        accepted.push(file)
      }

      let finalAccepted = accepted
      if (!multiple) finalAccepted = accepted.slice(0, 1)
      if (maxFiles != null && finalAccepted.length > maxFiles) {
        for (const extra of finalAccepted.slice(maxFiles)) {
          errors.push({
            file: extra,
            code: "too-many-files",
            message: `Máximo ${maxFiles} archivo(s).`,
          })
        }
        finalAccepted = finalAccepted.slice(0, maxFiles)
      }

      setIsInvalid(errors.length > 0)
      if (errors.length > 0) onError?.(errors)
      if (finalAccepted.length > 0) onDrop?.(finalAccepted)
    },
    [disabled, acceptPatterns, maxSize, maxFiles, multiple, onDrop, onError],
  )

  const open = React.useCallback(() => {
    if (disabled) return
    inputRef.current?.click()
  }, [disabled])

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      process(e.target.files)
      // Permite volver a seleccionar el mismo archivo.
      e.target.value = ""
    },
    [process],
  )

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (disabled) return
      dragDepth.current += 1
      if (e.dataTransfer?.types?.includes("Files")) setIsDragging(true)
    },
    [disabled],
  )

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled && e.dataTransfer) e.dataTransfer.dropEffect = "copy"
    },
    [disabled],
  )

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragDepth.current -= 1
    if (dragDepth.current <= 0) {
      dragDepth.current = 0
      setIsDragging(false)
    }
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      dragDepth.current = 0
      setIsDragging(false)
      if (disabled) return
      process(e.dataTransfer?.files ?? null)
    },
    [disabled, process],
  )

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent) => {
      if (disabled) return
      const files = e.clipboardData?.files
      if (files && files.length > 0) {
        e.preventDefault()
        process(files)
      }
    },
    [disabled, process],
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        open()
      }
    },
    [open],
  )

  const getRootProps = React.useCallback(
    () => ({
      role: "button" as const,
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || undefined,
      "data-dragging": isDragging ? ("" as const) : undefined,
      "data-disabled": disabled ? ("" as const) : undefined,
      "data-invalid": isInvalid ? ("" as const) : undefined,
      onClick: open,
      onKeyDown: handleKeyDown,
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onPaste: handlePaste,
    }),
    [
      disabled,
      isDragging,
      isInvalid,
      open,
      handleKeyDown,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handlePaste,
    ],
  )

  const getInputProps = React.useCallback(
    (): React.InputHTMLAttributes<HTMLInputElement> => ({
      type: "file",
      accept: acceptAttr,
      multiple,
      disabled,
      hidden: true,
      tabIndex: -1,
      onChange: handleInputChange,
    }),
    [acceptAttr, multiple, disabled, handleInputChange],
  )

  return {
    isDragging,
    isInvalid,
    disabled,
    inputRef,
    open,
    getRootProps,
    getInputProps,
    accept: acceptAttr,
    multiple,
  }
}
