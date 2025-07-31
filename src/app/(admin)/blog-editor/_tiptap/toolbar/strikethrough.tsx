import { StrikeThroughIcon } from '../icons/strikethroungh';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function StrikeThrough() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleStrike().run();
      }}
      content='Tachado'
      disabled={!editor?.can().chain().focus().toggleStrike().run()}
      isActive={editor?.isActive('strike')}
    >
      <StrikeThroughIcon />
    </TooltipBtn>
  );
}
