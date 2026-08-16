import { IconList } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function BulletList() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Lista"
            shortCut="Ctrl + Shift + 8"
            active={editor.isBulletList}
            disabled={!editor.canBulletList}
            onClick={editor.runBulletList}
        >
            <IconList />
        </ToolbarButton>
    )
}
