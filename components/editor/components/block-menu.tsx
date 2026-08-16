"use client"

import type * as React from "react"
import type { Editor } from "@tiptap/react"
import type { Node } from "@tiptap/pm/model"
import {
  IconTypography,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconListCheck,
  IconQuote,
  IconSourceCode,
  IconCopy,
  IconTrash,
  IconArrowAutofitWidth,
} from "@tabler/icons-react"

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const COLORS: { name: string; key: string }[] = [
  { name: "Por defecto", key: "" },
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

function nodeLabel(node: Node): string {
  switch (node.type.name) {
    case "paragraph":
      return "Texto"
    case "heading":
      return `Encabezado ${node.attrs.level}`
    case "bulletList":
      return "Lista"
    case "orderedList":
      return "Lista numerada"
    case "taskList":
      return "Lista de tareas"
    case "blockquote":
      return "Cita"
    case "codeBlock":
      return "Código"
    case "horizontalRule":
      return "Divisor"
    case "imageBlock":
      return "Imagen"
    case "embed":
      return "Embed"
    case "fileBlock":
      return "Archivo"
    case "table":
      return "Tabla"
    default:
      return "Bloque"
  }
}

const TURN_INTO = [
  { label: "Texto", icon: IconTypography, run: (c: ReturnType<Editor["chain"]>) => c.setParagraph() },
  { label: "Encabezado 1", icon: IconH1, run: (c: ReturnType<Editor["chain"]>) => c.toggleHeading({ level: 1 }) },
  { label: "Encabezado 2", icon: IconH2, run: (c: ReturnType<Editor["chain"]>) => c.toggleHeading({ level: 2 }) },
  { label: "Encabezado 3", icon: IconH3, run: (c: ReturnType<Editor["chain"]>) => c.toggleHeading({ level: 3 }) },
  { label: "Lista", icon: IconList, run: (c: ReturnType<Editor["chain"]>) => c.toggleBulletList() },
  { label: "Lista numerada", icon: IconListNumbers, run: (c: ReturnType<Editor["chain"]>) => c.toggleOrderedList() },
  { label: "Lista de tareas", icon: IconListCheck, run: (c: ReturnType<Editor["chain"]>) => c.toggleTaskList() },
  { label: "Cita", icon: IconQuote, run: (c: ReturnType<Editor["chain"]>) => c.toggleBlockquote() },
  { label: "Código", icon: IconSourceCode, run: (c: ReturnType<Editor["chain"]>) => c.toggleCodeBlock() },
]

export interface BlockMenuProps {
  editor: Editor
  node: Node | null
  pos: number
  onClose: () => void
  anchor?: React.RefObject<HTMLElement | null>
}

/** Menú de acciones de bloque (tipo Notion) para el drag handle. */
export function BlockMenu({ editor, node, pos, onClose, anchor }: BlockMenuProps) {
  if (!node || pos < 0) return null

  const from = pos
  const to = pos + node.nodeSize
  const isTextish = node.type.name === "paragraph" || node.type.name === "heading"
  const isTable = node.type.name === "table"

  // Ajustar ancho: limpia los `colwidth` de todas las celdas para que la tabla
  // reparta el ancho de forma automática (ocupa todo el ancho disponible).
  const fitTableWidth = () => {
    // Nº de columnas (de la primera fila) y ancho disponible de la tabla.
    const tableDom = editor.view.nodeDOM(from) as HTMLElement | null
    const tableEl = (tableDom?.querySelector?.("table") ?? tableDom) as HTMLElement | null
    const firstRow = node.firstChild
    const cols = firstRow ? firstRow.childCount : 0
    if (!tableEl || cols === 0) {
      onClose()
      return
    }
    const perCol = Math.max(Math.floor(tableEl.clientWidth / cols), 40)

    const tr = editor.state.tr
    editor.state.doc.nodesBetween(from, to, (n, p) => {
      const role = n.type.spec.tableRole
      if (role === "cell" || role === "header_cell") {
        const span = (n.attrs.colspan as number) || 1
        const widths = Array.from({ length: span }, () => perCol)
        tr.setNodeMarkup(p, undefined, { ...n.attrs, colwidth: widths })
      }
    })
    if (tr.docChanged) editor.view.dispatch(tr)
    onClose()
  }

  const turnInto = (run: (c: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => {
    run(editor.chain().focus().setTextSelection(pos + 1)).run()
    onClose()
  }

  const applyColor = (key: string) => {
    const chain = editor.chain().focus().setTextSelection({ from: from + 1, to: to - 1 })
    if (key) chain.setTextColor(`var(--editor-color-${key})`).run()
    else chain.unsetTextColor().run()
    onClose()
  }

  const duplicate = () => {
    editor.chain().focus().insertContentAt(to, node.toJSON()).run()
    onClose()
  }

  const remove = () => {
    editor.chain().focus().deleteRange({ from, to }).run()
    onClose()
  }

  return (
    <DropdownMenuContent anchor={anchor} align="start" side="right" sideOffset={6} className="w-52">
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-muted-foreground">{nodeLabel(node)}</DropdownMenuLabel>
      </DropdownMenuGroup>

      {isTextish && (
        <DropdownMenuGroup>
          <div className="px-2 pt-1.5 pb-2">
            <p className="mb-1.5 px-1 text-xs text-muted-foreground">Convertir en</p>
            <div className="flex flex-wrap gap-1">
              {TURN_INTO.map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.label}
                    type="button"
                    title={t.label}
                    onClick={() => turnInto(t.run)}
                    className="flex size-7 items-center justify-center rounded border border-border/70 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="px-2 pt-1.5 pb-2">
            <p className="mb-1.5 px-1 text-xs text-muted-foreground">Color del texto</p>
            <div className="flex flex-wrap gap-1">
              {COLORS.map((c) => (
                <button
                  key={c.key || "default"}
                  type="button"
                  title={c.name}
                  onClick={() => applyColor(c.key)}
                  className="flex size-6 items-center justify-center rounded border border-border/70 text-xs font-semibold transition-transform hover:scale-110"
                  style={{ color: c.key ? `var(--editor-color-${c.key})` : undefined }}
                >
                  A
                </button>
              ))}
            </div>
          </div>
        </DropdownMenuGroup>
      )}

      {isTextish && <DropdownMenuSeparator />}

      <DropdownMenuGroup>
        {isTable && (
          <DropdownMenuItem onClick={fitTableWidth}>
            <IconArrowAutofitWidth />
            Ajustar ancho
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={duplicate}>
          <IconCopy />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={remove} className="text-destructive">
          <IconTrash />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
