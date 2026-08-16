import { Extension } from "@tiptap/core"
import { Plugin, PluginKey, type Transaction } from "@tiptap/pm/state"
import type { Node as PMNode } from "@tiptap/pm/model"

const key = new PluginKey("tableHeaderScope")

/**
 * Determina el `scope` que deben llevar los `<th>` de una tabla para SEO/a11y:
 * - encabezado de FILA  → `scope="col"` (cada th titula su columna)
 * - encabezado de COLUMNA → `scope="row"` (cada th titula su fila)
 * (La UI valida que solo haya UNO de los dos, así que no es ambiguo.)
 */
function scopeForTable(table: PMNode): "col" | "row" | null {
  const firstRow = table.firstChild
  let headerRow = !!firstRow && firstRow.childCount > 0
  if (firstRow)
    for (let i = 0; i < firstRow.childCount; i += 1)
      if (firstRow.child(i).type.name !== "tableHeader") headerRow = false
  let headerCol = table.childCount > 0
  for (let r = 0; r < table.childCount; r += 1)
    if (table.child(r).firstChild?.type.name !== "tableHeader") headerCol = false
  return headerRow ? "col" : headerCol ? "row" : null
}

/**
 * Mantiene el atributo `scope` de las celdas de cabecera al día en TODAS las
 * tablas del documento (via `appendTransaction`). Así el HTML exportado es
 * SEO-friendly (`<th scope="col|row">`) sin que el usuario haga nada.
 */
export const TableHeaderScope = Extension.create({
  name: "tableHeaderScope",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key,
        appendTransaction(transactions, _oldState, newState) {
          if (!transactions.some((t) => t.docChanged)) return null
          let tr: Transaction | null = null
          newState.doc.descendants((node, pos) => {
            if (node.type.spec.tableRole !== "table") return true
            const scope = scopeForTable(node)
            const tableStart = pos + 1
            node.forEach((row, rowOffset) => {
              row.forEach((cell, cellOffset) => {
                const want = cell.type.name === "tableHeader" ? scope : null
                if ((cell.attrs.scope ?? null) !== want) {
                  const cellPos = tableStart + rowOffset + 1 + cellOffset
                  tr = (tr ?? newState.tr).setNodeMarkup(cellPos, undefined, {
                    ...cell.attrs,
                    scope: want,
                  })
                }
              })
            })
            return false
          })
          return tr
        },
      }),
    ]
  },
})
