"use client"

import type { Editor } from "@tiptap/react"
import { CellSelection } from "@tiptap/pm/tables"
import { IconArrowsJoin, IconEraser } from "@tabler/icons-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const BG_COLORS: { name: string; key: string }[] = [
  { name: "Sin color", key: "" },
  { name: "Gris", key: "gray" },
  { name: "Marrón", key: "brown" },
  { name: "Naranja", key: "orange" },
  { name: "Amarillo", key: "yellow" },
  { name: "Verde", key: "green" },
  { name: "Azul", key: "blue" },
  { name: "Púrpura", key: "purple" },
  { name: "Rosa", key: "pink" },
  { name: "Rojo", key: "red" },
]

export interface TableCellToolsProps {
  editor: Editor
  /** "cells" = selección de varias celdas (con combinar); "cell" = celda actual. */
  mode: "cells" | "cell"
  onClose: () => void
}

/** Herramientas de celda(s): combinar/separar, color de fondo, borrar contenidos. */
export function TableCellTools({ editor, mode, onClose }: TableCellToolsProps) {
  const setColor = (key: string) => {
    editor
      .chain()
      .focus()
      .setCellAttribute("backgroundColor", key ? `var(--editor-bg-${key})` : null)
      .run()
    onClose()
  }

  const clearContents = () => {
    const sel = editor.state.selection
    const empty = () => editor.schema.nodes.paragraph.create()
    if (sel instanceof CellSelection) {
      const cells: { pos: number; size: number }[] = []
      sel.forEachCell((cell, pos) => cells.push({ pos, size: cell.nodeSize }))
      const tr = editor.state.tr
      for (let i = cells.length - 1; i >= 0; i--) {
        const { pos, size } = cells[i]
        tr.replaceWith(pos + 1, pos + size - 1, empty())
      }
      editor.view.dispatch(tr)
    } else {
      const $c = sel.$head
      for (let d = $c.depth; d > 0; d--) {
        const role = $c.node(d).type.spec.tableRole
        if (role === "cell" || role === "header_cell") {
          const from = $c.before(d)
          const to = $c.after(d)
          editor.view.dispatch(editor.state.tr.replaceWith(from + 1, to - 1, empty()))
          break
        }
      }
    }
    editor.commands.focus()
    onClose()
  }

  const mergeOrSplit = () => {
    editor.chain().focus().mergeOrSplit().run()
    onClose()
  }

  return (
    <DropdownMenuContent
      align="start"
      side="right"
      sideOffset={6}
      className="w-52"
    >
      {mode === "cells" && (
        <>
          <DropdownMenuItem onClick={mergeOrSplit}>
            <IconArrowsJoin />
            Combinar / separar celdas
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}

      <div className="px-2 pt-1.5 pb-2">
        <p className="mb-1.5 px-1 text-xs text-muted-foreground">Color de fondo</p>
        <div className="flex flex-wrap gap-1">
          {BG_COLORS.map((c) => (
            <button
              key={c.key || "none"}
              type="button"
              title={c.name}
              onClick={() => setColor(c.key)}
              className={cn(
                "size-6 rounded border border-border/70 transition-transform hover:scale-110",
                !c.key &&
                  "bg-[linear-gradient(45deg,transparent_45%,var(--destructive)_45%,var(--destructive)_55%,transparent_55%)]",
              )}
              style={c.key ? { backgroundColor: `var(--editor-bg-${c.key})` } : undefined}
            />
          ))}
        </div>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={clearContents}>
        <IconEraser />
        Borrar contenidos
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
