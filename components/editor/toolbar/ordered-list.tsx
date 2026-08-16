import { IconListNumbers } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function OrderedList() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Lista numerada"
            shortCut="Ctrl + Shift + 7"
            active={editor.isOrderedList}
            disabled={!editor.canOrderedList}
            onClick={editor.runOrderedList}
        >
            <IconListNumbers />
        </ToolbarButton>
    )
}
