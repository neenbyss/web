"use client"

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react"

import { cn } from "@/lib/utils"

/**
 * Vista de la imagen en línea: un `<img>` que fluye dentro del texto. Al
 * seleccionarlo se resalta con un anillo; es atómico (se borra con Supr) y
 * arrastrable. El alt/tamaño se ajustan desde el diálogo de inserción.
 */
export function InlineImageNodeView({ node, selected }: NodeViewProps) {
  const a = node.attrs as {
    src: string
    srcset: string | null
    alt: string | null
    title: string | null
    width: number | null
  }

  return (
    <NodeViewWrapper as="span" className="inline" data-drag-handle draggable="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-inline-image="true"
        src={a.src}
        srcSet={a.srcset ?? undefined}
        alt={a.alt ?? ""}
        title={a.title ?? undefined}
        draggable={false}
        style={a.width ? { width: `${a.width}px` } : undefined}
        className={cn(
          "inline-block max-w-full rounded-[4px] align-text-bottom transition-shadow",
          selected && "ring-2 ring-primary/60",
        )}
      />
    </NodeViewWrapper>
  )
}
