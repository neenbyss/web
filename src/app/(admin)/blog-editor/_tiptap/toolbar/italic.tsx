import { ItalicIcon } from '../icons/italic';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Italic() {
  const { editor } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleItalic().run();
      }}
      content='Cursiva'
      disabled={!editor?.can().chain().focus().toggleItalic().run()}
      isActive={editor?.isActive('italic')}
    >
      <ItalicIcon />
    </TooltipBtn>
  );
}
