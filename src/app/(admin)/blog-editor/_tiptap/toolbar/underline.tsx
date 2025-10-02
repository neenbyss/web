import { UnderlineIcon } from '../icons/underline';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Underline() {
  const { editor, isUnderline, canUnderline } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleUnderline().run();
      }}
      content='Subrayado'
      disabled={canUnderline}
      isActive={isUnderline}
    >
      <UnderlineIcon />
    </TooltipBtn>
  );
}
