import { Extension } from "@tiptap/core"
import { Plugin } from "@tiptap/pm/state"
import { CellSelection } from "@tiptap/pm/tables"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

/**
 * Resalta con un borde la celda donde está el cursor (para que "clic en una
 * celda" se vea como seleccionada). No aplica en selecciones de varias celdas
 * (esas usan `.selectedCell`).
 */
export const TableActiveCell = Extension.create({
  name: "tableActiveCell",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations(state) {
            const { selection } = state
            if (selection instanceof CellSelection) return null
            const $head = selection.$head
            for (let d = $head.depth; d > 0; d--) {
              const role = $head.node(d).type.spec.tableRole
              if (role === "cell" || role === "header_cell") {
                return DecorationSet.create(state.doc, [
                  Decoration.node($head.before(d), $head.after(d), { class: "active-cell" }),
                ])
              }
            }
            return null
          },
        },
      }),
    ]
  },
})
