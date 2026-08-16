import { Mark } from "@tiptap/core"

export interface FontSizeOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = Mark.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).style.fontSize || null,
        renderHTML: (attrs) => {
          if (!attrs.fontSize) return {}
          return { style: `font-size: ${attrs.fontSize}` }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => ((el as HTMLElement).style.fontSize ? null : false),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ commands }) =>
          commands.setMark(this.name, { fontSize }),
      unsetFontSize:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    }
  },
})
