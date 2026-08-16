"use client"

import * as React from "react"
import { IconPhotoUp, IconX } from "@tabler/icons-react"

import { CATEGORY_META, formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { useUploads } from "@/hooks/use-uploads"
import {
  Dropzone,
  DropzoneDescription,
  DropzoneTitle,
  useDropzoneContext,
} from "@/components/ui/dropzone"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"

/**
 * Ejemplo de Dropzone **fuertemente customizado** a partir del primitivo.
 * Muestra cómo estilar con los atributos `data-*` (dragging/invalid) y componer
 * children propios, conectado a la API de uploads (categoría imagen).
 */
export function UploadsDemo({ initialItems }: { initialItems?: UploadMetadata[] }) {
  const meta = CATEGORY_META.image
  const { items, upload, uploading, progress, error } = useUploads({
    category: "image",
    initialItems,
  })
  const [clientErrors, setClientErrors] = React.useState<string[]>([])

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        accept={meta.accept ?? undefined}
        maxSize={meta.maxSize}
        disabled={uploading}
        onDrop={(files) => {
          setClientErrors([])
          void upload(files)
        }}
        onError={(errs) => setClientErrors(errs.map((e) => e.message))}
        className="border-2 border-primary/25 bg-primary/[0.03] p-10 data-dragging:border-primary data-dragging:bg-primary/10"
      >
        <DemoInner />
        <DropzoneTitle className="text-base">Sube tus imágenes</DropzoneTitle>
        <DropzoneDescription>
          {meta.description} Máx. {formatBytes(meta.maxSize)}.
        </DropzoneDescription>
      </Dropzone>

      {uploading && (
        <Progress value={progress}>
          <ProgressTrack size="sm">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      )}

      {(error || clientErrors.length > 0) && (
        <ul className="text-xs text-destructive">
          {[...(error ? [error] : []), ...clientErrors].map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.slice(0, 8).map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[0.7rem] text-foreground"
            >
              <IconX className="size-3 text-muted-foreground" />
              {item.originalName}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/** Icono que reacciona al estado de arrastre vía el contexto del Dropzone. */
function DemoInner() {
  const { isDragging } = useDropzoneContext()
  return (
    <div
      className="mb-1 flex size-14 items-center justify-center rounded-full border border-primary/30 bg-background text-primary transition-transform [&_svg]:size-6"
      style={{ transform: isDragging ? "scale(1.08)" : undefined }}
    >
      <IconPhotoUp />
    </div>
  )
}
