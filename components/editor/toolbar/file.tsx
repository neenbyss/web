import { IconPaperclip } from "@tabler/icons-react"
import { ToolbarButton } from "../components/ui/btn"
import { useEditor } from "../core/useEditor"

export function FileButton() {
  const { editor } = useEditor()

  return (
    <ToolbarButton tooltip="Archivo" onClick={editor.runInsertFile}>
      <IconPaperclip />
    </ToolbarButton>
  )
}
