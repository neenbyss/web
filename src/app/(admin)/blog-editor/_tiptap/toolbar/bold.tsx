import { BoldIcon } from '../icons/bold';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Bold() {
  const { editor } = useEditor();

  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleBold().run();
      }}
      content='Negrita'
      disabled={!editor?.can().chain().focus().toggleBold().run()}
      isActive={editor?.isActive('bold')}
    >
      <BoldIcon />
    </TooltipBtn>
  );
}
