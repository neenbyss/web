import { OrderedListIcon } from '../icons/ordered-list';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function OrderedList() {
  const { editor } = useEditor();

  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleOrderedList().run();
      }}
      content='Lista Numérica'
      disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
      isActive={editor?.isActive('orderedList')}
    >
      <OrderedListIcon />
    </TooltipBtn>
  );
}
