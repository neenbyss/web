import { BlockquoteIcon } from '../icons/blockquote';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Blockquote() {
  const { editor, canBlockquote, isBlockquote } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleBlockquote().run();
      }}
      content='Citar en Bloque'
      disabled={canBlockquote}
      isActive={isBlockquote}
    >
      <BlockquoteIcon />
    </TooltipBtn>
  );
}
