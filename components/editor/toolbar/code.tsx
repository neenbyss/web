import { IconCode } from "@tabler/icons-react"
import { ToolbarButton } from "../components/ui/btn"
import { useEditor } from "../core/useEditor"

export function Code() {
  const { editor } = useEditor()

  return (
    <ToolbarButton
      tooltip="Código en línea"
      shortCut="Ctrl + e"
      active={editor.isCode}
      disabled={!editor.canCode}
      onClick={editor.runCode}
    >
      <IconCode />
    </ToolbarButton>
  )
}
