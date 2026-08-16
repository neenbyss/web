import { Mark } from "@tiptap/core"

export interface TextColorOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textColor: {
      setTextColor: (color: string) => ReturnType
      unsetTextColor: () => ReturnType
    }
  }
}

export const TextColor = Mark.create<TextColorOptions>({
  name: "textColor",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).style.color || null,
        renderHTML: (attrs) => {
          if (!attrs.color) return {}
          return { style: `color: ${attrs.color}` }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => ((el as HTMLElement).style.color ? null : false),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setTextColor:
        (color: string) =>
        ({ commands }) =>
          commands.setMark(this.name, { color }),
      unsetTextColor:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    }
  },
})
