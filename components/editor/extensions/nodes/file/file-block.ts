import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { FileNodeView } from "./file-node-view"

export interface FileBlockOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fileBlock: {
      insertFileBlock: (attrs?: {
        uploadId?: string
        href?: string
        name?: string
        size?: number | null
        mime?: string | null
      }) => ReturnType
    }
  }
}

/** Nodo archivo: tarjeta de descarga. Vacío abre el MediaPicker (no-imagen). */
export const FileBlock = Node.create<FileBlockOptions>({
  name: "fileBlock",
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
      href: { default: null },
      name: { default: null },
      size: { default: null },
      mime: { default: null },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="file-block"]',
        getAttrs: (el) => ({
          uploadId: (el as HTMLElement).getAttribute("data-upload-id"),
          href: (el as HTMLElement).getAttribute("href"),
          name: (el as HTMLElement).getAttribute("data-name"),
          size: Number((el as HTMLElement).getAttribute("data-size")) || null,
          mime: (el as HTMLElement).getAttribute("data-mime"),
        }),
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const { uploadId, href, name, size, mime } = node.attrs
    return [
      "a",
      mergeAttributes(
        {
          "data-type": "file-block",
          "data-upload-id": uploadId ?? undefined,
          href,
          "data-name": name,
          "data-size": size ?? undefined,
          "data-mime": mime ?? undefined,
          download: name || "",
          class: "file-block",
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      name || href || "archivo",
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileNodeView)
  },

  addCommands() {
    return {
      insertFileBlock:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: attrs ?? {} }),
    }
  },
})
