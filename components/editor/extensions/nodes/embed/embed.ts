import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { EmbedNodeView } from "./embed-node-view"

export interface EmbedOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embed: {
      insertEmbed: (attrs?: { src?: string }) => ReturnType
    }
  }
}

/** Normaliza URLs de YouTube/Vimeo a su forma embebible. */
export function normalizeEmbedUrl(url: string): string {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, "")

    if (host === "youtu.be") return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v")
      if (id) return `https://www.youtube.com/embed/${id}`
      if (u.pathname.startsWith("/embed/")) return u.href
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0]
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    return u.href
  } catch {
    return url
  }
}

/** Nodo embed (iframe responsivo 16:9). Vacío muestra un input de URL. */
export const Embed = Node.create<EmbedOptions>({
  name: "embed",
  group: "block",
  atom: true,
  draggable: true,
  isolating: true,

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      src: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="embed"]', getAttrs: (el) => ({ src: (el as HTMLElement).querySelector("iframe")?.getAttribute("src") ?? null }) }]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-type": "embed", class: "embed-wrapper" }, this.options.HTMLAttributes, HTMLAttributes),
      [
        "iframe",
        {
          src: node.attrs.src,
          frameborder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "true",
        },
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedNodeView)
  },

  addCommands() {
    return {
      insertEmbed:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: attrs ?? {} }),
    }
  },
})
