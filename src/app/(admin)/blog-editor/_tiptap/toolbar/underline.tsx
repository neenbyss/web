import { UnderlineIcon } from '../icons/underline';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Underline() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleUnderline().run();
      }}
      content='Subrayado'
      disabled={!editor?.can().chain().focus().toggleUnderline().run()}
      isActive={editor?.isActive('underline')}
    >
      <UnderlineIcon />
    </TooltipBtn>
  );
}
