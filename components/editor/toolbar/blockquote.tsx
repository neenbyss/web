import { IconBlockquote } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Blockquote() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Cita"
            shortCut="Ctrl + Shift + b"
            active={editor.isBlockquote}
            disabled={!editor.canBlockquote}
            onClick={editor.runBlockquote}
        >
            <IconBlockquote />
        </ToolbarButton>
    )
}
