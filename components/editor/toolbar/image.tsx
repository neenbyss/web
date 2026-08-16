import { IconPhoto } from "@tabler/icons-react"
import { ToolbarButton } from "../components/ui/btn"
import { useEditor } from "../core/useEditor"

export function ImageButton() {
  const { editor } = useEditor()

  return (
    <ToolbarButton tooltip="Imagen" onClick={editor.runInsertImage}>
      <IconPhoto />
    </ToolbarButton>
  )
}
