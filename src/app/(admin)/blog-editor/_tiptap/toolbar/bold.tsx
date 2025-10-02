import { BoldIcon } from '../icons/bold';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Bold() {
  const { editor, isBold, canBold } = useEditor();

  return (
    <TooltipBtn
      onClick={() => editor?.chain().focus().toggleBold().run()}
      content='Negrita'
      disabled={canBold}
      isActive={isBold}
    >
      <BoldIcon />
    </TooltipBtn>
  );
}
