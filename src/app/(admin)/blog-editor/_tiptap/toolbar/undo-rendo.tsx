import { ArrowBackIcon } from '../icons/arrow-back';
import { BoldIcon } from '../icons/bold';
import { useEditor } from '../provider';
import { TooltipBtn } from './_tooltip';

export function UndoRendo() {
  const { editor } = useEditor();
  return (
    <>
      <TooltipBtn
        onClick={() => {
          editor?.chain().focus().undo().run();
        }}
        content={'Deshacer'}
        kbd='Ctrl + Z'
        disabled={!editor?.can().chain().focus().undo().run()}
        isActive={editor?.isActive('undo')}
      >
        <ArrowBackIcon />
      </TooltipBtn>
      <TooltipBtn
        onClick={() => {
          editor?.chain().focus().redo().run();
        }}
        content={'Rehacer'}
        kbd='Ctrl + Y'
        disabled={!editor?.can().chain().focus().redo().run()}
        isActive={editor?.isActive('redo')}
      >
        <ArrowBackIcon className='scale-x-[-1]' />
      </TooltipBtn>
    </>
  );
}
