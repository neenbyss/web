"use client"

import { IconSeparatorHorizontal } from "@tabler/icons-react"
import { useTiptap } from "@tiptap/react"

import { ToolbarButton } from "../components/ui/btn"

export function SeparatorButton() {
  const { editor } = useTiptap()

  if (!editor) return null

  return (
    <ToolbarButton
      tooltip="Separador"
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
    >
      <IconSeparatorHorizontal />
    </ToolbarButton>
  )
}
