import { useEditor } from "../core/useEditor"
import {
  IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustified,
} from "@tabler/icons-react"
import { ToolbarButton } from "../components/ui/btn"
import type { Align } from "../core"

const alignButtons: { align: Align; icon: React.ReactNode; tooltip: string; shortcut?: string }[] = [
  { align: "left", icon: <IconAlignLeft />, tooltip: "Alinear izquierda", shortcut: "Ctrl + Shift + l" },
  { align: "center", icon: <IconAlignCenter />, tooltip: "Centrar", shortcut: "Ctrl + Shift + e" },
  { align: "right", icon: <IconAlignRight />, tooltip: "Alinear derecha", shortcut: "Ctrl + Shift + r" },
  { align: "justify", icon: <IconAlignJustified />, tooltip: "Justificar", shortcut: "Ctrl + Shift + j" },
]

export function Align() {
  const { editor } = useEditor()

  return (
    <>
      {alignButtons.map(({ align, icon, tooltip, shortcut }) => (
        <ToolbarButton
          key={align}
          tooltip={tooltip}
          shortCut={shortcut}
          active={editor.isAlign(align)}
          onClick={() => editor.runAlign(align)}
        >
          {icon}
        </ToolbarButton>
      ))}
    </>
  )
}
