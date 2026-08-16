import { IconMovie } from "@tabler/icons-react"
import { ToolbarButton } from "../components/ui/btn"
import { useEditor } from "../core/useEditor"

export function EmbedButton() {
  const { editor } = useEditor()

  return (
    <ToolbarButton tooltip="Embed / iframe" onClick={editor.runInsertEmbed}>
      <IconMovie />
    </ToolbarButton>
  )
}
