import type { Editor } from "@tiptap/react"
import type { Node as PMNode } from "@tiptap/pm/model"

/** Lee el ancho de lectura real (`--editor-measure`) en px, para que la tabla
 *  nazca adaptada a CUALQUIER editor/contenedor (distintas anchuras máximas). */
function readMeasurePx(editor: Editor): number {
  try {
    const dom = editor.view.dom as HTMLElement
    const raw = getComputedStyle(dom).getPropertyValue("--editor-measure").trim()
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    if (raw.endsWith("rem")) return parseFloat(raw) * root
    if (raw.endsWith("px")) return parseFloat(raw)
  } catch {
    /* noop */
  }
  return 768
}

/**
 * Inserta una tabla y le fija `colwidth` iniciales a cada celda para que nazca
 * con un ancho concreto (≈ el ancho de lectura), repartido en columnas iguales.
 *
 * Por qué: la tabla NO usa `w-full` (para que el resize sea columna a columna
 * sin auto-reparto). Sin `colwidth`, una tabla nueva colapsaría al mínimo. Con
 * anchos explícitos, el `.tableWrapper` (que se ajusta a la tabla con
 * `fit-content`) mide lo mismo que la tabla → el scroll y el botón "+ fila"
 * miden la tabla, no toda la página.
 */
export function insertFilledTable(
  editor: Editor,
  rows: number,
  cols: number,
  deleteRange?: { from: number; to: number },
) {
  const chain = editor.chain().focus()
  if (deleteRange) chain.deleteRange(deleteRange)
  chain.insertTable({ rows, cols, withHeaderRow: false }).run()

  const colWidth = Math.max(Math.floor(readMeasurePx(editor) / cols), 40)
  const { state } = editor
  const $from = state.selection.$from
  let table: PMNode | null = null
  let tablePos = -1
  for (let d = $from.depth; d > 0; d -= 1) {
    if ($from.node(d).type.spec.tableRole === "table") {
      table = $from.node(d)
      tablePos = $from.before(d)
      break
    }
  }
  if (!table) return

  const tr = state.tr
  table.descendants((node, pos) => {
    const role = node.type.spec.tableRole
    if (role === "cell" || role === "header_cell") {
      const colspan = (node.attrs.colspan as number) ?? 1
      tr.setNodeMarkup(tablePos + 1 + pos, undefined, {
        ...node.attrs,
        colwidth: Array.from({ length: colspan }, () => colWidth),
      })
    }
    return true
  })
  editor.view.dispatch(tr)
}
