import { BulletListIcon } from '../icons/bullet-list';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function BulletList() {
  const { editor } = useEditor();

  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleBulletList().run();
      }}
      content='Lista Con Viñetas'
      disabled={!editor?.can().chain().focus().toggleBulletList().run()}
      isActive={editor?.isActive('bulletList')}
    >
      <BulletListIcon />
    </TooltipBtn>
  );
}
