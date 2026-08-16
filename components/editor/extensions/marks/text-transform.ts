import { Mark } from "@tiptap/core"

export interface TextTransformOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textTransform: {
      setTextTransform: (textTransform: string) => ReturnType
      unsetTextTransform: () => ReturnType
    }
  }
}

export const TextTransform = Mark.create<TextTransformOptions>({
  name: "textTransform",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      textTransform: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).style.textTransform || null,
        renderHTML: (attrs) => {
          if (!attrs.textTransform) return {}
          return { style: `text-transform: ${attrs.textTransform}` }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => ((el as HTMLElement).style.textTransform ? null : false),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setTextTransform:
        (textTransform: string) =>
        ({ commands }) =>
          commands.setMark(this.name, { textTransform }),
      unsetTextTransform:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    }
  },
})
