import { IconArrowBackUp } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Undo() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Deshacer"
            shortCut="Ctrl + z"
            disabled={!editor.canUndo}
            onClick={editor.runUndo}
        >
            <IconArrowBackUp />
        </ToolbarButton>
    )
}
