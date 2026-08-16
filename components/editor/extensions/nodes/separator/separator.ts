import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { SeparatorNodeView } from "./separator-node-view"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    horizontalRuleNode: {
      setHorizontalRule: () => ReturnType
    }
  }
}

/**
 * Separador horizontal con NodeView propio (seleccionable y cómodo). Reemplaza
 * al `horizontalRule` de StarterKit (que hay que desactivar en el core).
 */
export const HorizontalRule = Node.create({
  name: "horizontalRule",
  group: "block",
  selectable: true,
  draggable: true,

  parseHTML() {
    return [{ tag: "hr" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SeparatorNodeView)
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain }) =>
          chain().insertContent({ type: this.name }).run(),
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type,
      }),
    ]
  },
})
