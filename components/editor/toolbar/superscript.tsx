import { IconSuperscript } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Superscript() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Superíndice"
            shortCut="Ctrl + ."
            active={editor.isSuperscript}
            disabled={!editor.canSuperscript}
            onClick={editor.runSuperscript}
        >
            <IconSuperscript />
        </ToolbarButton>
    )
}
