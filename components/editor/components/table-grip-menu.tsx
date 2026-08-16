"use client"

import type { Editor } from "@tiptap/react"
import type { Node as PMNode } from "@tiptap/pm/model"
import { CellSelection, TableMap } from "@tiptap/pm/tables"
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowDown,
  IconCopy,
  IconTrash,
  IconEraser,
  IconLayoutNavbar,
} from "@tabler/icons-react"

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
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

export interface TableGripMenuProps {
  editor: Editor
  kind: "col" | "row"
  index: number
  cellPos: number
  onClose: () => void
  /** Muestra una advertencia en un modal (la acción no se puede completar). */
  onWarn: (message: string) => void
}

/** Menú contextual de columna/fila (tipo Notion) que abre el grip de la tabla. */
export function TableGripMenu({ editor, kind, index, cellPos, onClose, onWarn }: TableGripMenuProps) {
  // Solo la fila 1 / columna A pueden ser cabecera.
  const isFirst = index === 0

  const getTableNode = (): PMNode | null => {
    try {
      const $cell = editor.state.doc.resolve(cellPos)
      for (let d = $cell.depth; d >= 0; d--) {
        if ($cell.node(d).type.spec.tableRole === "table") return $cell.node(d)
      }
    } catch {
      /* noop */
    }
    return null
  }

  // Encabezado = TODA la 1ª fila / 1ª columna es `tableHeader` (no solo la celda
  // esquina A1, que se comparte). Así el switch de la columna A no se enciende por
  // error cuando lo que está puesto es el encabezado de FILA.
  const isHeaderRow = (table: PMNode): boolean => {
    const row = table.firstChild
    if (!row || row.childCount === 0) return false
    for (let i = 0; i < row.childCount; i++)
      if (row.child(i).type.name !== "tableHeader") return false
    return true
  }
  const isHeaderColumn = (table: PMNode): boolean => {
    if (table.childCount === 0) return false
    for (let r = 0; r < table.childCount; r++) {
      const first = table.child(r).firstChild
      if (!first || first.type.name !== "tableHeader") return false
    }
    return true
  }

  const table = getTableNode()
  const headerRowActive = table ? isHeaderRow(table) : false
  const headerColActive = table ? isHeaderColumn(table) : false
  const isHeader = kind === "col" ? headerColActive : headerRowActive

  // ¿Hay una celda combinada que cruza la 1ª fila/columna? (como Notion, no se
  // puede poner encabezado si una celda combinada la atraviesa).
  const headerHasSpanConflict = (): boolean => {
    if (!table) return false
    try {
      const map = TableMap.get(table)
      if (kind === "col" && map.width > 1) {
        for (let row = 0; row < map.height; row++)
          if (map.map[row * map.width] === map.map[row * map.width + 1]) return true
      } else if (kind === "row" && map.height > 1) {
        for (let col = 0; col < map.width; col++)
          if (map.map[col] === map.map[map.width + col]) return true
      }
    } catch {
      /* noop */
    }
    return false
  }

  const toggleHeader = () => {
    if (!isHeader) {
      if (headerHasSpanConflict()) {
        onWarn(
          kind === "col"
            ? "Descombina las celdas que cruzan la primera columna antes de activar el encabezado."
            : "Descombina las celdas que cruzan la primera fila antes de activar el encabezado.",
        )
        onClose()
        return
      }
      // Validación: solo puede haber UN encabezado (fila O columna, no ambos).
      if ((kind === "col" && headerRowActive) || (kind === "row" && headerColActive)) {
        onWarn(
          kind === "col"
            ? "Ya hay un encabezado de fila. Solo puede haber uno (fila o columna): desactívalo primero."
            : "Ya hay un encabezado de columna. Solo puede haber uno (fila o columna): desactívalo primero.",
        )
        onClose()
        return
      }
    }
    reselect()
    editor
      .chain()
      .focus()
      [kind === "col" ? "toggleHeaderColumn" : "toggleHeaderRow"]()
      .run()
    // No cerramos: el switch refleja el nuevo estado al re-renderizar.
  }

  // Reafirma la selección de columna/fila justo antes de cada acción (el pos de
  // la celda no cambia mientras el menú está abierto).
  const reselect = () => {
    try {
      const $cell = editor.state.doc.resolve(cellPos)
      const sel =
        kind === "col" ? CellSelection.colSelection($cell) : CellSelection.rowSelection($cell)
      editor.view.dispatch(editor.state.tr.setSelection(sel))
    } catch {
      /* noop */
    }
  }

  const act = (fn: (c: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => {
    reselect()
    fn(editor.chain().focus()).run()
    onClose()
  }

  const setColor = (key: string) => {
    reselect()
    editor
      .chain()
      .focus()
      .setCellAttribute("backgroundColor", key ? `var(--editor-bg-${key})` : null)
      .run()
    onClose()
  }

  const clearContents = () => {
    reselect()
    const sel = editor.state.selection
    if (sel instanceof CellSelection) {
      const cells: { pos: number; size: number }[] = []
      sel.forEachCell((cell, pos) => cells.push({ pos, size: cell.nodeSize }))
      const tr = editor.state.tr
      // De atrás hacia delante para no invalidar posiciones al reemplazar.
      for (let i = cells.length - 1; i >= 0; i--) {
        const { pos, size } = cells[i]
        tr.replaceWith(pos + 1, pos + size - 1, editor.schema.nodes.paragraph.create())
      }
      editor.view.dispatch(tr)
      editor.commands.focus()
    }
    onClose()
  }

  const duplicateRow = () => {
    try {
      const $cell = editor.state.doc.resolve(cellPos)
      const rowNode = $cell.node($cell.depth)
      const rowPos = $cell.before($cell.depth)
      editor
        .chain()
        .focus()
        .insertContentAt(rowPos + rowNode.nodeSize, rowNode.toJSON())
        .run()
    } catch {
      /* noop */
    }
    onClose()
  }

  return (
    <DropdownMenuContent
      align="start"
      side={kind === "col" ? "bottom" : "right"}
      sideOffset={6}
      className="w-56"
    >
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-muted-foreground">
          {kind === "col" ? "Columna" : "Fila"}
        </DropdownMenuLabel>
      </DropdownMenuGroup>

      {isFirst && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium tracking-wider uppercase"
        >
          <span className="flex items-center gap-2.5">
            <IconLayoutNavbar className="size-3.5" />
            {kind === "col" ? "Encabezado de columna" : "Encabezado de fila"}
          </span>
          <Switch checked={isHeader} onCheckedChange={toggleHeader} />
        </div>
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

      {kind === "col" ? (
        <>
          <DropdownMenuItem onClick={() => act((c) => c.addColumnBefore())}>
            <IconArrowLeft />
            Insertar a la izquierda
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => act((c) => c.addColumnAfter())}>
            <IconArrowRight />
            Insertar a la derecha
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem onClick={() => act((c) => c.addRowBefore())}>
            <IconArrowUp />
            Insertar arriba
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => act((c) => c.addRowAfter())}>
            <IconArrowDown />
            Insertar debajo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={duplicateRow}>
            <IconCopy />
            Duplicar
          </DropdownMenuItem>
        </>
      )}

      <DropdownMenuItem onClick={clearContents}>
        <IconEraser />
        Borrar contenidos
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="text-destructive"
        onClick={() => act((c) => (kind === "col" ? c.deleteColumn() : c.deleteRow()))}
      >
        <IconTrash />
        Eliminar {kind === "col" ? "columna" : "fila"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
