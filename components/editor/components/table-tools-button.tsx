"use client"

import * as React from "react"
import type { Editor } from "@tiptap/react"
import { IconGripVertical } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableCellTools } from "./table-cell-tools"

export interface TableToolsButtonProps {
  editor: Editor
  /** "cells" = selección múltiple (con combinar); "cell" = celda del cursor. */
  mode: "cells" | "cell"
  /** Posición fija del botón (viewport coords). */
  style: React.CSSProperties
  className: string
  open: boolean
  onActivate: () => void
  onClose: () => void
}

/**
 * Botón "⋮" de herramientas de celda(s). Igual que el grip: ES el
 * `DropdownMenuTrigger` de base-ui con `modal`, sin refs de anclaje ni botón
 * separado. Abrimos en `onClick` (ignorando la apertura de base-ui) para que el
 * menú se ancle al propio botón.
 */
export function TableToolsButton({
  editor,
  mode,
  style,
  className,
  open,
  onActivate,
  onClose,
}: TableToolsButtonProps) {
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next, details) => {
        if (next) return
        const r = details?.reason
        if (r === "sibling-open" || r === "focus-out") return
        onClose()
      }}
      modal
    >
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            title="Herramientas de celda"
            data-kind="row"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onActivate}
            className={cn("editor-table-grip", className)}
            style={style}
          >
            {/* Mismo diseño que el grip de columna/fila: línea sobre el borde por
                defecto → pastilla con grip al hover. En color de la selección. */}
            <span className="editor-table-grip-line" aria-hidden />
            <span className="editor-table-grip-dots" aria-hidden>
              <IconGripVertical />
            </span>
          </button>
        }
      />
      {open && <TableCellTools editor={editor} mode={mode} onClose={onClose} />}
    </DropdownMenu>
  )
}
