import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { ImageNodeView } from "./image-node-view"

export type ImageAlign = "left" | "center" | "right"
export type ImageFit = "contain" | "cover" | "fill"
export type ImageRatio = "auto" | "16/9" | "4/3" | "1/1" | "3/4"
export type ImageObjectPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right"

export interface ImageBlockOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageBlock: {
      /** Inserta un bloque de imagen (vacío abre el selector de media). */
      insertImageBlock: (attrs?: {
        uploadId?: string
        src?: string
        srcset?: string | null
        alt?: string
        title?: string
        figcaption?: string
        width?: number
        align?: ImageAlign
        fit?: ImageFit
        ratio?: ImageRatio
        fullWidth?: boolean
        objectPosition?: ImageObjectPosition
        name?: string
        size?: number
      }) => ReturnType
    }
  }
}

/** Nodo de imagen: `<figure><img><figcaption>`. Vacío muestra el MediaPicker. */
export const ImageBlock = Node.create<ImageBlockOptions>({
  name: "imageBlock",
  group: "block",
  atom: true,
  draggable: true,
  isolating: true,

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      uploadId: { default: null },
      src: { default: null },
      srcset: { default: null },
      alt: { default: null },
      title: { default: null },
      figcaption: { default: "" },
      width: { default: 100 },
      align: { default: "center" as ImageAlign },
      fit: { default: "contain" as ImageFit },
      ratio: { default: "auto" as ImageRatio },
      fullWidth: { default: false },
      objectPosition: { default: "center" as ImageObjectPosition },
      name: { default: null },
      size: { default: null },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image-block"]',
        getAttrs: (el) => {
          const node = el as HTMLElement
          const img = node.querySelector("img")
          const cap = node.querySelector("figcaption")
          return {
            uploadId: node.getAttribute("data-upload-id") ?? null,
            src: img?.getAttribute("src") ?? null,
            srcset: img?.getAttribute("srcset") ?? null,
            alt: img?.getAttribute("alt") ?? null,
            title: img?.getAttribute("title") ?? null,
            figcaption: cap?.textContent ?? "",
            width: Number(node.getAttribute("data-width")) || 100,
            align: (node.getAttribute("data-align") as ImageAlign) || "center",
            fit: (node.getAttribute("data-fit") as ImageFit) || "contain",
            ratio: (node.getAttribute("data-ratio") as ImageRatio) || "auto",
            fullWidth: node.getAttribute("data-full-width") === "true",
            objectPosition:
              (node.getAttribute("data-object-position") as ImageObjectPosition) || "center",
            name: node.getAttribute("data-name"),
            size: Number(node.getAttribute("data-size")) || null,
          }
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const {
      uploadId,
      src,
      srcset,
      alt,
      title,
      figcaption,
      width,
      align,
      fit,
      ratio,
      fullWidth,
      objectPosition,
      name,
      size,
    } = node.attrs
    const marginX = align === "left" ? "0 auto 0 0" : align === "right" ? "0 0 0 auto" : "0 auto"
    const figureStyle = `width:${fullWidth ? 100 : width}%;margin:${marginX};`
    const imgStyle = `width:100%;${ratio !== "auto" ? `aspect-ratio:${ratio};height:100%;` : "height:auto;"}object-fit:${fit};object-position:${objectPosition};`
    return [
      "figure",
      mergeAttributes(
        {
          "data-type": "image-block",
          "data-upload-id": uploadId || undefined,
          "data-width": String(width),
          "data-align": align,
          "data-fit": fit,
          "data-ratio": ratio,
          "data-full-width": String(fullWidth),
          "data-object-position": objectPosition,
          "data-name": name || undefined,
          "data-size": size ? String(size) : undefined,
          style: figureStyle,
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      [
        "img",
        {
          src,
          srcset: srcset || undefined,
          sizes: srcset ? `${fullWidth ? 100 : width}vw` : undefined,
          alt,
          title,
          style: imgStyle,
        },
      ],
      ["figcaption", {}, figcaption || ""],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },

  addCommands() {
    return {
      insertImageBlock:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: attrs ?? {} }),
    }
  },
})
