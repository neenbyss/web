"use client"

import { createContext, useContext, type ReactNode } from "react"
import { Editor, useEditorState, useTiptap } from "@tiptap/react"
import { getMarkRange } from "@tiptap/core"
import { Level, Align } from "."

/** Datos para crear/editar un enlace desde el toolbar o el bubble. */
export type LinkInput = { href: string; text: string; newTab: boolean }

// Selector a nivel de módulo (referencia estable). Se computa UNA sola vez por
// transacción desde el provider; antes cada botón del toolbar/bubble ejecutaba
// este selector completo (con ~13 `editor.can()` que hacen dry-run de comandos),
// multiplicando el coste por el nº de componentes → escritura lentísima.
function editorSelector({ editor }: { editor: Editor }) {
  return {
    isBold: editor.isActive("bold"),
    runBold: () => editor.chain().focus().toggleBold().run(),
    isItalic: editor.isActive("italic"),
    runItalic: () => editor.chain().focus().toggleItalic().run(),
    isStrike: editor.isActive("strike"),
    runStrike: () => editor.chain().focus().toggleStrike().run(),
    isCode: editor.isActive("code"),
    runCode: () => editor.chain().focus().toggleCode().run(),
    isUnderline: editor.isActive("underline"),
    runUnderline: () => editor.chain().focus().toggleUnderline().run(),
    isLink: editor.isActive("link"),
    getLinkHref: () => (editor.getAttributes("link").href as string) || "",
    getLinkText: () => {
      const { state } = editor
      const { from, to, empty } = state.selection
      if (!empty) return state.doc.textBetween(from, to, "")
      const range = getMarkRange(state.doc.resolve(from), state.schema.marks.link)
      return range ? state.doc.textBetween(range.from, range.to, "") : ""
    },
    getLinkNewTab: () => {
      const t = editor.getAttributes("link").target
      return t === undefined ? true : t === "_blank"
    },
    runApplyLink: ({ href, text, newTab }: LinkInput) => {
      const attrs = {
        href,
        target: newTab ? "_blank" : "_self",
        rel: newTab ? "noopener noreferrer nofollow" : null,
      }
      const { state } = editor
      const { from, to, empty } = state.selection
      const chain = editor.chain().focus()
      const linkNode = { type: "text", text: text || href, marks: [{ type: "link", attrs }] }

      // Editando un enlace existente (cursor dentro): trabajamos sobre su rango.
      if (editor.isActive("link")) {
        const range = getMarkRange(state.doc.resolve(from), state.schema.marks.link)
        if (range) {
          const current = state.doc.textBetween(range.from, range.to, "")
          if (text && text !== current) {
            return chain.setTextSelection(range).insertContent(linkNode).run()
          }
          return chain.setTextSelection(range).extendMarkRange("link").setLink(attrs).run()
        }
      }
      // Sin selección → insertamos el texto como enlace.
      if (empty) return chain.insertContent(linkNode).run()
      // Con selección: si cambió el texto lo reemplazamos, si no, enlazamos.
      const selected = state.doc.textBetween(from, to, "")
      if (text && text !== selected) return chain.insertContent(linkNode).run()
      return chain.extendMarkRange("link").setLink(attrs).run()
    },
    runUnsetLink: () => editor.chain().focus().extendMarkRange("link").unsetLink().run(),
    isTextBackground: editor.isActive("textBackground"),
    getTextBackgroundColor: () => editor.getAttributes("textBackground").color || "",
    runSetTextBackground: (color: string) => editor.chain().focus().setTextBackground(color).run(),
    runUnsetTextBackground: () => editor.chain().focus().unsetTextBackground().run(),
    isSuperscript: editor.isActive("superscript"),
    runSuperscript: () => editor.chain().focus().toggleSuperscript().run(),
    isSubscript: editor.isActive("subscript"),
    runSubscript: () => editor.chain().focus().toggleSubscript().run(),
    isBlockquote: editor.isActive("blockquote"),
    runBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
    isBulletList: editor.isActive("bulletList"),
    runBulletList: () => editor.chain().focus().toggleBulletList().run(),
    isOrderedList: editor.isActive("orderedList"),
    runOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    isTaskList: editor.isActive("taskList"),
    runTaskList: () => editor.chain().focus().toggleTaskList().run(),
    isAlign: (align: Align) => editor.isActive({ textAlign: align }),
    runAlign: (align: Align) => editor.chain().focus().setTextAlign(align).run(),
    runUndo: () => editor.chain().focus().undo().run(),
    runRedo: () => editor.chain().focus().redo().run(),
    isHeadingPerLevel: (level: Level) => editor.isActive("heading", { level }),
    isHeading: editor.isActive("heading"),
    runHeading: (level: Level) => editor.chain().focus().toggleHeading({ level }).run(),
    runParagraph: () => editor.chain().focus().setParagraph().run(),
    getTextColor: () => editor.getAttributes("textColor").color || "",
    runSetTextColor: (color: string) => editor.chain().focus().setTextColor(color).run(),
    runUnsetTextColor: () => editor.chain().focus().unsetTextColor().run(),
    getFontSize: () => editor.getAttributes("fontSize").fontSize || "",
    runSetFontSize: (size: string) => editor.chain().focus().setFontSize(size).run(),
    runUnsetFontSize: () => editor.chain().focus().unsetFontSize().run(),
    getTextTransform: () => editor.getAttributes("textTransform").textTransform || "",
    runSetTextTransform: (transform: string) => editor.chain().focus().setTextTransform(transform).run(),
    runUnsetTextTransform: () => editor.chain().focus().unsetTextTransform().run(),
    runInsertImage: () => editor.chain().focus().insertImageBlock().run(),
    runInsertImageData: (d: {
      inline: boolean
      uploadId?: string | null
      src: string
      srcset?: string | null
      alt?: string
      name?: string | null
      size?: number | null
    }) => {
      if (d.inline) {
        return editor
          .chain()
          .focus()
          .insertInlineImage({
            uploadId: d.uploadId ?? null,
            src: d.src,
            srcset: d.srcset ?? null,
            alt: d.alt || null,
          })
          .run()
      }
      return editor
        .chain()
        .focus()
        .insertImageBlock({
          uploadId: d.uploadId ?? undefined,
          src: d.src,
          srcset: d.srcset ?? null,
          alt: d.alt || undefined,
          name: d.name ?? undefined,
          size: d.size ?? undefined,
        })
        .run()
    },
    runInsertEmbed: () => editor.chain().focus().insertEmbed().run(),
    runInsertFile: () => editor.chain().focus().insertFileBlock().run(),
    // Validación (¿el comando aplica en el contexto actual?)
    canBold: editor.can().toggleBold(),
    canItalic: editor.can().toggleItalic(),
    canStrike: editor.can().toggleStrike(),
    canUnderline: editor.can().toggleUnderline(),
    canSuperscript: editor.can().toggleSuperscript(),
    canSubscript: editor.can().toggleSubscript(),
    canBlockquote: editor.can().toggleBlockquote(),
    canCode: editor.can().toggleCode(),
    canBulletList: editor.can().toggleBulletList(),
    canOrderedList: editor.can().toggleOrderedList(),
    canTaskList: editor.can().toggleTaskList(),
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  }
}

type EditorStateValue = ReturnType<typeof editorSelector>

const EditorStateContext = createContext<EditorStateValue | null>(null)

/** Computa el estado del editor UNA vez y lo comparte con todos los controles. */
export function EditorStateProvider({ children }: { children: ReactNode }) {
  const { editor } = useTiptap()
  const editorState = useEditorState({ editor, selector: editorSelector })
  return (
    <EditorStateContext.Provider value={editorState}>{children}</EditorStateContext.Provider>
  )
}

export function useEditor() {
  const state = useContext(EditorStateContext)
  if (!state) {
    throw new Error("useEditor debe usarse dentro de <EditorStateProvider>.")
  }
  return { editor: state }
}
