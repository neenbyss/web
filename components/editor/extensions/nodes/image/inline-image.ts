import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { InlineImageNodeView } from "./inline-image-node-view"

export interface InlineImageAttrs {
  uploadId?: string | null
  src: string
  srcset?: string | null
  alt?: string | null
  title?: string | null
  width?: number | null
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineImage: {
      /** Inserta una imagen EN LÍNEA (fluye dentro del texto como un carácter). */
      insertInlineImage: (attrs: InlineImageAttrs) => ReturnType
    }
  }
}

/**
 * Imagen en línea: nodo inline atómico que fluye dentro de un párrafo (a
 * diferencia de `imageBlock`, que ocupa su propia línea). Ideal para íconos o
 * imágenes pequeñas incrustadas en el texto.
 */
export const InlineImage = Node.create({
  name: "inlineImage",
  group: "inline",
  inline: true,
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      uploadId: { default: null },
      src: { default: null },
      srcset: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: "img[data-inline-image]" }]
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, srcset, alt, title, width } = node.attrs
    return [
      "img",
      mergeAttributes(
        {
          "data-inline-image": "true",
          src,
          srcset: srcset || undefined,
          alt,
          title: title || undefined,
          style: `display:inline-block;vertical-align:text-bottom;max-width:100%;border-radius:4px;${
            width ? `width:${width}px;` : ""
          }`,
        },
        HTMLAttributes,
      ),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineImageNodeView)
  },

  addCommands() {
    return {
      insertInlineImage:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    }
  },
})
