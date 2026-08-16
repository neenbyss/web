"use client"

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react"

import { cn } from "@/lib/utils"

/**
 * Separador (hr) con un área de clic cómoda (padding vertical) para poder
 * seleccionarlo fácil sin que la línea se vea gruesa. Al seleccionarlo la línea
 * se resalta. Se puede arrastrar el propio separador para moverlo de sitio
 * (`data-drag-handle`). Se elimina desde el menú del drag handle o con Supr.
 */
export function SeparatorNodeView({ selected }: NodeViewProps) {
  return (
    <NodeViewWrapper
      data-type="separator"
      data-drag-handle
      draggable="true"
      className="group/hr relative my-2 flex cursor-grab items-center py-1.5 active:cursor-grabbing"
      contentEditable={false}
    >
      <hr
        className={cn(
          "pointer-events-none my-0! w-full rounded-full border-0 transition-all",
          selected ? "h-px bg-primary/70" : "h-px bg-border group-hover/hr:bg-primary/40",
        )}
      />
    </NodeViewWrapper>
  )
}
