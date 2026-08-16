"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useDropzone, type UseDropzoneOptions, type UseDropzoneReturn } from "@/hooks/use-dropzone"

const DropzoneContext = React.createContext<UseDropzoneReturn | null>(null)

/** Acceso al estado del Dropzone desde cualquier subcomponente. */
export function useDropzoneContext(): UseDropzoneReturn {
  const ctx = React.useContext(DropzoneContext)
  if (!ctx) throw new Error("useDropzoneContext debe usarse dentro de <Dropzone>.")
  return ctx
}

export interface DropzoneProps
  extends UseDropzoneOptions,
    Omit<React.ComponentProps<"div">, "onDrop" | "onError"> {}

/**
 * Zona de arrastre headless y 100% customizable.
 * Root `<div>` con `data-slot="dropzone"` y `data-dragging` / `data-disabled`
 * / `data-invalid` para estilar cualquier parte desde fuera.
 */
function Dropzone({
  className,
  children,
  accept,
  maxSize,
  maxFiles,
  multiple,
  disabled,
  onDrop,
  onError,
  ...props
}: DropzoneProps) {
  const dz = useDropzone({ accept, maxSize, maxFiles, multiple, disabled, onDrop, onError })
  const rootProps = dz.getRootProps()

  return (
    <DropzoneContext.Provider value={dz}>
      <div
        data-slot="dropzone"
        {...rootProps}
        {...props}
        className={cn(
          "group/dropzone relative flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input p-8 text-center transition-colors outline-none",
          "hover:border-primary/60 hover:bg-accent/40",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "data-dragging:border-primary data-dragging:bg-primary/5",
          "data-invalid:border-destructive data-invalid:bg-destructive/5",
          "data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
      >
        <DropzoneInput />
        {children}
      </div>
    </DropzoneContext.Provider>
  )
}

/** Input file oculto. Se monta automáticamente dentro de `<Dropzone>`. */
function DropzoneInput() {
  const { inputRef, getInputProps } = useDropzoneContext()
  return <input ref={inputRef} data-slot="dropzone-input" {...getInputProps()} />
}

/** Botón/elemento que abre el explorador de archivos. */
function DropzoneTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { open } = useDropzoneContext()
  return (
    <button
      type="button"
      data-slot="dropzone-trigger"
      onClick={(e) => {
        // No re-disparar el onClick del root (evita doble apertura).
        e.stopPropagation()
        onClick?.(e)
        open()
      }}
      className={className}
      {...props}
    />
  )
}

function DropzoneIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropzone-icon"
      className={cn(
        "mb-1 flex size-11 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-data-dragging/dropzone:bg-primary/10 group-data-dragging/dropzone:text-primary [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  )
}

function DropzoneTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropzone-title"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DropzoneDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dropzone-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dropzone,
  DropzoneInput,
  DropzoneTrigger,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneDescription,
}
