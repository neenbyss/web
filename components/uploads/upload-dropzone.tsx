"use client"

import * as React from "react"
import { IconCloudUpload, IconAlertTriangle } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { CATEGORY_META, formatBytes } from "@/lib/upload/categories"
import {
  Dropzone,
  DropzoneDescription,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneTrigger,
} from "@/components/ui/dropzone"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { useUploadsContext } from "./uploads-context"

export interface UploadDropzoneProps {
  className?: string
}

/** Dropzone conectado a la API: sube a la categoría del contexto con progreso. */
export function UploadDropzone({ className }: UploadDropzoneProps) {
  const { category, upload, uploading, progress, error, clearError } = useUploadsContext()
  const meta = category ? CATEGORY_META[category] : null
  const [clientErrors, setClientErrors] = React.useState<string[]>([])

  const errors = React.useMemo(
    () => [...(error ? [error] : []), ...clientErrors],
    [error, clientErrors],
  )

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Dropzone
        accept={meta?.accept ?? undefined}
        maxSize={meta?.maxSize}
        disabled={uploading}
        onDrop={(files) => {
          clearError()
          setClientErrors([])
          void upload(files)
        }}
        onError={(errs) => setClientErrors(errs.map((e) => e.message))}
      >
        <DropzoneIcon>
          <IconCloudUpload />
        </DropzoneIcon>
        <DropzoneTitle>
          Arrastra, pega (Ctrl+V) o haz clic para subir
        </DropzoneTitle>
        <DropzoneDescription>
          {meta ? `${meta.description} Máx. ${formatBytes(meta.maxSize)}.` : "Cualquier archivo."}
        </DropzoneDescription>
        <DropzoneTrigger className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition-colors hover:bg-primary/80">
          Seleccionar archivos
        </DropzoneTrigger>
      </Dropzone>

      {uploading && (
        <Progress value={progress} className="w-full">
          <ProgressTrack size="sm">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      )}

      {errors.length > 0 && (
        <ul className="flex flex-col gap-1 text-xs text-destructive">
          {errors.map((msg, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <IconAlertTriangle className="size-3.5 shrink-0" />
              {msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
