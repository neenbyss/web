import { TaskIcon } from '../icons/task';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Task() {
  const { editor } = useEditor();

  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleBulletList().run();
      }}
      content='Lista'
      disabled={!editor?.can().chain().focus().toggleBulletList().run()}
      isActive={editor?.isActive('bulletList')}
    >
      <TaskIcon />
    </TooltipBtn>
  );
}
