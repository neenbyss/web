import { IconBold } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function Bold() {

    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Negrita"
            shortCut="Ctrl + b"
            active={editor.isBold}
            disabled={!editor.canBold}
            onClick={editor.runBold}
        >
            <IconBold />
        </ToolbarButton>
    )
}