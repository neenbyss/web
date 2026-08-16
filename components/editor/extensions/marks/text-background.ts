import { Mark, mergeAttributes } from "@tiptap/core"

export interface TextBackgroundOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textBackground: {
      setTextBackground: (color: string) => ReturnType
      unsetTextBackground: () => ReturnType
    }
  }
}

/**
 * Marca de "background text": aplica un color de fondo al texto seleccionado.
 * Reemplaza a la extensión Highlight; misma dinámica que `text-color.ts`.
 */
export const TextBackground = Mark.create<TextBackgroundOptions>({
  name: "textBackground",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).style.backgroundColor || null,
        renderHTML: (attrs) => {
          if (!attrs.color) return {}
          return { style: `background-color: ${attrs.color}` }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => ((el as HTMLElement).style.backgroundColor ? null : false),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes({ "data-text-background": "" }, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTextBackground:
        (color: string) =>
        ({ commands }) =>
          commands.setMark(this.name, { color }),
      unsetTextBackground:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    }
  },
})
