import { ArrowBackIcon } from '../icons/arrow-back';
import { BoldIcon } from '../icons/bold';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function UndoRendo() {
  const { editor, canRedo, canUndo } = useEditor();
  return (
    <>
      <TooltipBtn
        onClick={() => {
          editor?.chain().focus().undo().run();
        }}
        content={'Deshacer'}
        kbd='Ctrl + Z'
        disabled={canUndo}
      >
        <ArrowBackIcon />
      </TooltipBtn>
      <TooltipBtn
        onClick={() => {
          editor?.chain().focus().redo().run();
        }}
        content={'Rehacer'}
        kbd='Ctrl + Y'
        disabled={canRedo}
      >
        <ArrowBackIcon className='scale-x-[-1]' />
      </TooltipBtn>
    </>
  );
}
