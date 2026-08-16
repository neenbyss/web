import { IconUnderline } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Underline() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Subrayado"
            shortCut="Ctrl + u"
            active={editor.isUnderline}
            disabled={!editor.canUnderline}
            onClick={editor.runUnderline}
        >
            <IconUnderline />
        </ToolbarButton>
    )
}
