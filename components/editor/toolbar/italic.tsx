import { IconItalic } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Italic() {

    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Cursiva"
            shortCut="Ctrl + i"
            active={editor.isItalic}
            disabled={!editor.canItalic}
            onClick={editor.runItalic}
        >
            <IconItalic />
        </ToolbarButton>
    )
}