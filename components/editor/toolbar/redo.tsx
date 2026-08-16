import { IconArrowForwardUp } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Redo() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Rehacer"
            shortCut="Ctrl + Shift + z"
            disabled={!editor.canRedo}
            onClick={editor.runRedo}
        >
            <IconArrowForwardUp />
        </ToolbarButton>
    )
}
