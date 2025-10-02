import { ItalicIcon } from '../icons/italic';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function Italic() {
  const { editor, canItalic, isItalic } = useEditor();
  return (
    <TooltipBtn
      onClick={() => {
        editor?.chain().focus().toggleItalic().run();
      }}
      content='Cursiva'
      disabled={canItalic}
      isActive={isItalic}
    >
      <ItalicIcon />
    </TooltipBtn>
  );
}
