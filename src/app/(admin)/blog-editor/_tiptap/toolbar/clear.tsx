import { BoldIcon } from '../icons/bold';
import { ClearIcon } from '../icons/clear';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Clear() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().clearNodes().unsetAllMarks().run();
      }}
      content='Limpiar formato'
      disabled={!editor?.can().chain().focus().clearNodes().unsetAllMarks().run()}
    >
      <ClearIcon />
    </TooltipBtn>
  );
}
