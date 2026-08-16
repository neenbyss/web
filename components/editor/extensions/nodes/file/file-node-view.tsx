"use client"

import * as React from "react"
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react"
import {
  IconFile,
  IconFileTypePdf,
  IconFileZip,
  IconDownload,
  IconTrash,
  IconPencil,
  IconPaperclip,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { Button } from "@/components/ui/button"
import { MediaPicker } from "../../../components/media-picker"
import { UploadMetaDialog } from "../../../components/upload-meta-dialog"

function glyph(mime: string | null) {
  if (mime === "application/pdf") return <IconFileTypePdf />
  if (mime && (mime.includes("zip") || mime.includes("rar") || mime.includes("gzip"))) return <IconFileZip />
  return <IconFile />
}

export function FileNodeView({ node, updateAttributes, deleteNode, selected, editor }: NodeViewProps) {
  const { uploadId, href, name, size, mime } = node.attrs as {
    uploadId: string | null
    href: string | null
    name: string | null
    size: number | null
    mime: string | null
  }
  const editable = editor.isEditable
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [metaOpen, setMetaOpen] = React.useState(false)

  const applyItem = (item: UploadMetadata) =>
    updateAttributes({
      uploadId: item.id,
      href: item.url,
      name: item.originalName,
      size: item.size,
      mime: item.mime,
    })

  if (!href) {
    return (
      <NodeViewWrapper data-type="file-block" className="my-4">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="flex w-full items-center gap-2 rounded-md border border-dashed border-input bg-muted/30 p-4 text-muted-foreground transition-colors hover:border-primary/60 hover:bg-accent/40"
        >
          <IconPaperclip className="size-5" />
          <span className="text-sm font-medium">Adjuntar archivo</span>
        </button>
        <MediaPicker
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          category="file"
          title="Adjuntar archivo"
          onSelect={applyItem}
        />
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper
      data-type="file-block"
      className={cn("group/file my-4", selected && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-md")}
    >
      <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:size-5">
          {glyph(mime)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{name || "Archivo"}</p>
          <p className="text-xs text-muted-foreground">{size ? formatBytes(size) : mime}</p>
        </div>
        <a href={href} download={name || ""} target="_blank" rel="noreferrer">
          <Button size="icon-sm" variant="ghost" title="Descargar">
            <IconDownload />
          </Button>
        </a>
        {editable && (
          <div className="flex items-center opacity-0 transition-opacity group-hover/file:opacity-100">
            <Button size="icon-sm" variant="ghost" title="Editar metadatos" onClick={() => setMetaOpen(true)}>
              <IconPencil />
            </Button>
            <Button size="icon-sm" variant="ghost" title="Reemplazar" onClick={() => setPickerOpen(true)}>
              <IconPaperclip />
            </Button>
            <Button size="icon-sm" variant="ghost" title="Eliminar" className="text-destructive" onClick={() => deleteNode()}>
              <IconTrash />
            </Button>
          </div>
        )}
      </div>

      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        category="file"
        title="Reemplazar archivo"
        onSelect={applyItem}
      />
      <UploadMetaDialog uploadId={uploadId} open={metaOpen} onOpenChange={setMetaOpen} />
    </NodeViewWrapper>
  )
}
