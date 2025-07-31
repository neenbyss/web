import { BlockquoteIcon } from '../icons/blockquote';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Blockquote() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleBlockquote().run();
      }}
      content='Negrita'
      disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
      isActive={editor?.isActive('blockquote')}
    >
      <BlockquoteIcon />
    </TooltipBtn>
  );
}
