import { BoldIcon } from '../icons/bold';
import { SeparatorIcon } from '../icons/separator';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Separator() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().setHorizontalRule().run();
      }}
      content='Separador'
      disabled={!editor?.can().chain().focus().setHorizontalRule().run()}
    >
      <SeparatorIcon />
    </TooltipBtn>
  );
}
