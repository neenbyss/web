"use client"

import "./styles/content.css"
import "./styles/editor.css"

import { Tiptap, TiptapContent, useEditor } from "@tiptap/react"
import { extensions } from "./core"
import { EditorStateProvider } from "./core/useEditor"
import { Toolbar } from "./toolbar"
import { EditorDragHandle } from "./components/drag-handle"
import { TableControls } from "./components/table-controls"
import { EditorBubbleMenu } from "./bubbles/bubble-menu"

export function RichEditor() {
  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
  })

  if (!editor) {
    return <div> cargando editor </div>
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Tiptap editor={editor}>
        <EditorStateProvider>
          <Toolbar className="sticky top-0 z-10 border-b bg-card p-0.5" />
          <EditorBubbleMenu />
          <TableControls />
          <div className="relative max-h-full flex flex-col grow overflow-y-auto">
            {/* `[&>.tiptap]:grow` + `min-h-full`: el editable llena el alto disponible
                para que el SELECCIONADOR (marquee) se pueda iniciar en toda esa área
                (no solo sobre el contenido). */}
            <TiptapContent className="relative grow flex h-full flex-col [&>.tiptap]:w-full [&>.tiptap]:grow [&>.tiptap]:py-3" />
            <EditorDragHandle />
          </div>
        </EditorStateProvider>
      </Tiptap>
    </div>
  )
}
