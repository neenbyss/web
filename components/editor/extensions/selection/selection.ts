import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

type StyledSelectionState = { focused: boolean; blockMode: boolean }

export const styledSelectionKey = new PluginKey<StyledSelectionState>(
  "styledSelection",
)

/**
 * Estiliza la selección:
 * - **Modo bloque** (activado por la banda/marquee, `MarqueeSelection`): pinta un
 *   **rectángulo translúcido** detrás de cada bloque seleccionado
 *   (`editor-block-selected`), tipo Notion. Solo en este modo; una selección de
 *   texto normal NO pinta fondo de bloque (usa el `::selection` nativo).
 * - Cuando la selección es de un solo bloque y el editor **pierde el foco**
 *   (bubble/toolbar/menú), mantiene el resaltado inline (`selection-persist`)
 *   para que no desaparezca al interactuar fuera.
 *
 * El modo bloque se activa con `tr.setMeta(styledSelectionKey, { blockMode: true })`
 * y se cancela en cuanto cambia la selección (o el doc) por otro medio.
 */
export const StyledSelection = Extension.create({
  name: "styledSelection",

  addProseMirrorPlugins() {
    return [
      new Plugin<StyledSelectionState>({
        key: styledSelectionKey,
        state: {
          init: () => ({ focused: true, blockMode: false }),
          apply(tr, prev) {
            const meta = tr.getMeta(styledSelectionKey) as
              | Partial<StyledSelectionState>
              | undefined

            let focused = prev.focused
            let blockMode = prev.blockMode

            if (meta && typeof meta.focused === "boolean") focused = meta.focused

            if (meta && typeof meta.blockMode === "boolean") {
              blockMode = meta.blockMode
            } else if (tr.docChanged) {
              blockMode = false
            } else if (tr.selectionSet) {
              // Cambió la selección por otro medio (texto, click, teclado) → salir.
              blockMode = false
            }

            return { focused, blockMode }
          },
        },
        props: {
          handleDOMEvents: {
            focus: (view) => {
              view.dispatch(
                view.state.tr.setMeta(styledSelectionKey, { focused: true }),
              )
              return false
            },
            blur: (view) => {
              view.dispatch(
                view.state.tr.setMeta(styledSelectionKey, { focused: false }),
              )
              return false
            },
          },
          decorations(state) {
            const { from, to, empty } = state.selection
            if (empty) return null
            const st = styledSelectionKey.getState(state)
            const focused = st?.focused ?? true
            const blockMode = st?.blockMode ?? false
            const decos: Decoration[] = []

            if (blockMode) {
              // Rectángulo translúcido por cada bloque top-level en la selección.
              state.doc.forEach((node, offset) => {
                const nodeFrom = offset
                const nodeTo = offset + node.nodeSize
                if (nodeFrom < to && nodeTo > from) {
                  decos.push(
                    Decoration.node(nodeFrom, nodeTo, {
                      class: "editor-block-selected",
                    }),
                  )
                }
              })
            } else if (!focused) {
              // Selección de texto que persiste cuando el editor pierde el foco.
              decos.push(Decoration.inline(from, to, { class: "selection-persist" }))
            }

            return decos.length ? DecorationSet.create(state.doc, decos) : null
          },
        },
      }),
    ]
  },
})
