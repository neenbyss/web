"use client"

import Image from "next/image"
import {
  IconFile,
  IconFileTypePdf,
  IconFileZip,
  IconVideo,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { Badge } from "@/components/ui/badge"

function previewUrl(item: UploadMetadata): string {
  return item.sizes?.["640"]?.webp?.url ?? item.sizes?.["320"]?.webp?.url ?? item.url
}

function FileGlyph({ mime }: { mime: string }) {
  if (mime === "application/pdf") return <IconFileTypePdf />
  if (mime.includes("zip") || mime.includes("rar") || mime.includes("gzip")) return <IconFileZip />
  if (mime.startsWith("video/")) return <IconVideo />
  return <IconFile />
}

/** Miniatura del archivo (imagen / video / icono). Reutilizable. */
export function UploadThumb({ item }: { item: UploadMetadata }) {
  if (item.category === "image") {
    const unoptimized = item.mime === "image/svg+xml" || item.mime === "image/gif"
    return (
      <Image
        src={previewUrl(item)}
        alt={item.alt || item.originalName}
        fill
        unoptimized={unoptimized}
        sizes="(max-width: 640px) 50vw, 220px"
        className="object-cover"
      />
    )
  }

  if (item.category === "video") {
    return (
      <video src={item.url} muted playsInline preload="metadata" className="size-full object-cover" />
    )
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground [&_svg]:size-8">
      <FileGlyph mime={item.mime} />
    </div>
  )
}

export interface UploadItemProps {
  item: UploadMetadata
  active?: boolean
  onOpen?: (item: UploadMetadata) => void
  className?: string
}

/** Celda de la galería: miniatura clickable que abre la vista de detalle. */
export function UploadItem({ item, active, onOpen, className }: UploadItemProps) {
  return (
    <button
      type="button"
      data-active={active ? "" : undefined}
      onClick={() => onOpen?.(item)}
      className={cn(
        "group/item flex flex-col overflow-hidden rounded-md border border-border bg-card text-left transition-colors outline-none hover:border-primary/60 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-active:border-primary",
        className,
      )}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-muted">
        <UploadThumb item={item} />
        <Badge
          variant="secondary"
          className="absolute top-1.5 left-1.5 rounded-sm bg-background/80 px-1.5 py-0.5 backdrop-blur-sm"
        >
          {item.category}
        </Badge>
      </div>

      <div className="flex flex-col gap-0.5 p-3">
        <p className="truncate text-xs font-medium text-foreground" title={item.originalName}>
          {item.title || item.originalName}
        </p>
        <p className="text-[0.7rem] text-muted-foreground">
          {formatBytes(item.size)}
          {item.width && item.height ? ` · ${item.width}×${item.height}` : ""}
        </p>
      </div>
    </button>
  )
}
