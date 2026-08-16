import { IconStrikethrough } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Strike() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Tachado"
            shortCut="Ctrl + Shift + s"
            active={editor.isStrike}
            disabled={!editor.canStrike}
            onClick={editor.runStrike}
        >
            <IconStrikethrough />
        </ToolbarButton>
    )
}
