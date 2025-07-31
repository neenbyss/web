import { BoldIcon } from '../icons/bold';
import { CodeIcon } from '../icons/code';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Code() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleCode().run();
      }}
      content='Marcar como código'
      disabled={!editor?.can().chain().focus().toggleCode().run()}
      isActive={editor?.isActive('code')}
    >
      <CodeIcon />
    </TooltipBtn>
  );
}
