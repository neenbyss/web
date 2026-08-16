import { IconCheckbox } from "@tabler/icons-react";
import { ToolbarButton } from "../components/ui/btn";
import { useEditor } from "../core/useEditor";

export function TaskList() {
    const { editor } = useEditor();

    return (
        <ToolbarButton
            tooltip="Lista de tareas"
            shortCut="Ctrl + Shift + 9"
            active={editor.isTaskList}
            disabled={!editor.canTaskList}
            onClick={editor.runTaskList}
        >
            <IconCheckbox />
        </ToolbarButton>
    )
}
