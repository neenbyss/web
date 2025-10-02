import { StrikeThroughIcon } from '../icons/strikethroungh';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function StrikeThrough() {
  const { editor, isStrike, canStrike } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleStrike().run();
      }}
      content='Tachado'
      disabled={canStrike}
      isActive={isStrike}
    >
      <StrikeThroughIcon />
    </TooltipBtn>
  );
}
