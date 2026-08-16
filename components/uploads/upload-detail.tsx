"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
  IconExternalLink,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { Button } from "@/components/ui/button"
import { UploadThumb } from "./upload-item"
import { UploadEditForm } from "./upload-edit-form"
import { useUploadsContext } from "./uploads-context"

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es", { dateStyle: "medium", timeStyle: "short" })
  } catch {
    return iso
  }
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate text-right font-medium text-foreground">{value}</span>
    </div>
  )
}

function BigPreview({ item }: { item: UploadMetadata }) {
  if (item.category === "image") {
    const unoptimized = item.mime === "image/svg+xml" || item.mime === "image/gif"
    return (
      <div className="relative h-full min-h-64 w-full">
        <Image
          src={item.url}
          alt={item.alt || item.originalName}
          fill
          unoptimized={unoptimized}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-contain"
        />
      </div>
    )
  }
  if (item.category === "video") {
    return <video src={item.url} controls className="max-h-[55vh] w-full bg-black object-contain" />
  }
  return (
    <div className="flex min-h-64 items-center justify-center">
      <UploadThumb item={item} />
    </div>
  )
}

export interface UploadDetailProps {
  item: UploadMetadata
  items: UploadMetadata[]
  onNavigate: (id: string) => void
  onClose: () => void
  className?: string
}

/** Vista de detalle: preview grande, dimensiones, metadatos y navegación entre archivos. */
export function UploadDetail({ item, items, onNavigate, onClose, className }: UploadDetailProps) {
  const { remove } = useUploadsContext()
  const [deleting, setDeleting] = React.useState(false)

  const index = items.findIndex((i) => i.id === item.id)
  const prev = index > 0 ? items[index - 1] : null
  const next = index >= 0 && index < items.length - 1 ? items[index + 1] : null

  async function handleDelete() {
    setDeleting(true)
    const ok = await remove(item.id)
    setDeleting(false)
    if (ok) {
      if (next) onNavigate(next.id)
      else if (prev) onNavigate(prev.id)
      else onClose()
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Cabecera con navegación */}
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="xs" onClick={onClose}>
          <IconArrowLeft />
          Galería
        </Button>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[0.7rem] text-muted-foreground">
            {index + 1} / {items.length}
          </span>
          <Button
            variant="outline"
            size="icon-xs"
            disabled={!prev}
            onClick={() => prev && onNavigate(prev.id)}
            title="Anterior"
          >
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-xs"
            disabled={!next}
            onClick={() => next && onNavigate(next.id)}
            title="Siguiente"
          >
            <IconChevronRight />
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        {/* Preview + info */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-md border border-border bg-muted">
            <BigPreview item={item} />
          </div>

          <div className="flex flex-col">
            <InfoRow label="Archivo" value={item.originalName} />
            <InfoRow label="Formato" value={item.mime || "—"} />
            <InfoRow
              label="Dimensiones"
              value={item.width && item.height ? `${item.width} × ${item.height}px` : "—"}
            />
            <InfoRow label="Tamaño" value={formatBytes(item.size)} />
            <InfoRow label="Categoría" value={item.category} />
            <InfoRow label="Creado" value={formatDate(item.createdAt)} />
            <InfoRow label="Actualizado" value={formatDate(item.updatedAt)} />
          </div>

          <div className="flex items-center justify-between gap-2">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <IconExternalLink className="size-3.5" />
              Abrir original
            </a>
            <Button variant="destructive" size="xs" onClick={handleDelete} disabled={deleting}>
              <IconTrash />
              {deleting ? "Eliminando…" : "Eliminar"}
            </Button>
          </div>
        </div>

        {/* Formulario de metadatos SEO */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Metadatos
          </h3>
          <UploadEditForm key={item.id} item={item} />
        </div>
      </div>

      {/* Tira de miniaturas de todos los archivos */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-border pt-3">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => onNavigate(it.id)}
              data-active={it.id === item.id ? "" : undefined}
              className="relative size-14 shrink-0 overflow-hidden rounded-sm border border-border bg-muted transition-colors data-active:border-primary data-active:ring-1 data-active:ring-primary"
              title={it.originalName}
            >
              <UploadThumb item={it} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
