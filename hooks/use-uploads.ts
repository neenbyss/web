"use client"

import * as React from "react"

import type { UploadCategory } from "@/lib/upload/config"
import type { UploadMetadata } from "@/lib/upload/types"
import type { UploadMetadataUpdate } from "@/lib/validations/upload"

const API = "/api/uploads"

export interface UseUploadsOptions {
  category?: UploadCategory
  initialItems?: UploadMetadata[]
  folderId?: string | null
}

export interface UseUploadsReturn {
  items: UploadMetadata[]
  isLoading: boolean
  uploading: boolean
  progress: number
  error: string | null
  upload: (files: File[]) => Promise<UploadMetadata[]>
  remove: (id: string) => Promise<boolean>
  update: (id: string, data: UploadMetadataUpdate) => Promise<UploadMetadata | null>
  refresh: () => Promise<void>
  clearError: () => void
}

interface ApiError {
  error?: string
}

function buildQuery(opts: UseUploadsOptions): string {
  const params = new URLSearchParams()
  if (opts.category) params.set("category", opts.category)
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

/** Cliente del recurso /api/uploads con estado, progreso y manejo de errores. */
export function useUploads(options: UseUploadsOptions = {}): UseUploadsReturn {
  const { category, initialItems, folderId } = options

  const [items, setItems] = React.useState<UploadMetadata[]>(initialItems ?? [])
  const [isLoading, setIsLoading] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)

  const clearError = React.useCallback(() => setError(null), [])

  const refresh = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}${buildQuery({ category })}`, { cache: "no-store" })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError((json as ApiError).error ?? "No se pudo cargar la lista.")
        return
      }
      setItems(json.data as UploadMetadata[])
    } catch {
      setError("Error de red al cargar los archivos.")
    } finally {
      setIsLoading(false)
    }
  }, [category])

  // Sube UN archivo con progreso propio (0..1) reportado vía callback.
  const uploadOne = React.useCallback(
    (file: File, onFraction: (f: number) => void) =>
      new Promise<{ saved?: UploadMetadata; error?: string }>((resolve) => {
        const form = new FormData()
        form.append("file", file)
        if (folderId) form.append("folderId", folderId)

        const xhr = new XMLHttpRequest()
        xhr.open("POST", API)

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onFraction(e.loaded / e.total)
        }

        xhr.onload = () => {
          let json: { ok?: boolean; data?: UploadMetadata[]; error?: string } = {}
          try {
            json = JSON.parse(xhr.responseText)
          } catch {
            /* respuesta no JSON */
          }
          if (xhr.status >= 200 && xhr.status < 300 && json.ok && json.data?.[0]) {
            resolve({ saved: json.data[0] })
          } else {
            resolve({ error: json.error ?? `Error al subir "${file.name}" (${xhr.status}).` })
          }
        }

        xhr.onerror = () => resolve({ error: `Error de red al subir "${file.name}".` })
        xhr.send(form)
      }),
    [folderId],
  )

  // Sube los archivos de uno en uno: memoria acotada en el servidor,
  // progreso agregado y tolerancia a fallos (un archivo no aborta el resto).
  const upload = React.useCallback(
    async (files: File[]): Promise<UploadMetadata[]> => {
      if (files.length === 0) return []

      setUploading(true)
      setProgress(0)
      setError(null)

      const total = files.length
      const saved: UploadMetadata[] = []
      const errors: string[] = []

      for (let i = 0; i < total; i++) {
        const result = await uploadOne(files[i], (fraction) => {
          setProgress(Math.round(((i + fraction) / total) * 100))
        })

        if (result.saved) {
          const item = result.saved
          setItems((prev) => (prev.some((p) => p.id === item.id) ? prev : [item, ...prev]))
          saved.push(item)
        } else if (result.error) {
          errors.push(result.error)
        }
        setProgress(Math.round(((i + 1) / total) * 100))
      }

      setUploading(false)
      if (errors.length > 0) {
        setError(
          errors.length === total
            ? errors[0]
            : `${saved.length} subido(s), ${errors.length} con error: ${errors[0]}`,
        )
      }
      return saved
    },
    [uploadOne],
  )

  const remove = React.useCallback(async (id: string) => {
    setError(null)
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError((json as ApiError).error ?? "No se pudo eliminar.")
        return false
      }
      setItems((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch {
      setError("Error de red al eliminar.")
      return false
    }
  }, [])

  const update = React.useCallback(async (id: string, data: UploadMetadataUpdate) => {
    setError(null)
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError((json as ApiError).error ?? "No se pudo guardar.")
        return null
      }
      const updated = json.data as UploadMetadata
      setItems((prev) => prev.map((p) => (p.id === id ? updated : p)))
      return updated
    } catch {
      setError("Error de red al guardar.")
      return null
    }
  }, [])

  return {
    items,
    isLoading,
    uploading,
    progress,
    error,
    upload,
    remove,
    update,
    refresh,
    clearError,
  }
}
