"use client"

import * as React from "react"
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react"
import { IconMovie, IconTrash } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { normalizeEmbedUrl } from "./embed"

export function EmbedNodeView({ node, updateAttributes, deleteNode, selected, editor }: NodeViewProps) {
  const src = node.attrs.src as string | null
  const editable = editor.isEditable
  const [url, setUrl] = React.useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    updateAttributes({ src: normalizeEmbedUrl(url) })
  }

  if (!src) {
    return (
      <NodeViewWrapper data-type="embed" className="my-4">
        <form
          onSubmit={submit}
          className="flex flex-col gap-3 rounded-md border border-dashed border-input bg-muted/30 p-6"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconMovie className="size-5" />
            <span className="text-sm font-medium">Insertar embed</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Pega una URL de YouTube, Vimeo o iframe…"
              autoFocus
            />
            <Button type="submit" size="sm" disabled={!url.trim()}>
              Insertar
            </Button>
          </div>
        </form>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper
      data-type="embed"
      className={cn("group/embed relative my-4", selected && "ring-2 ring-primary ring-offset-2 ring-offset-background")}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
        <iframe
          src={src}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {editable && (
        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover/embed:opacity-100">
          <Button size="icon-xs" variant="secondary" title="Eliminar" className="text-destructive" onClick={() => deleteNode()}>
            <IconTrash />
          </Button>
        </div>
      )}
    </NodeViewWrapper>
  )
}
