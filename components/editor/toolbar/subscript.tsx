import { IconSubscript } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Subscript() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Subíndice"
            shortCut="Ctrl + ,"
            active={editor.isSubscript}
            disabled={!editor.canSubscript}
            onClick={editor.runSubscript}
        >
            <IconSubscript />
        </ToolbarButton>
    )
}
