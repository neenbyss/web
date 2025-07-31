import { useEditor } from '../provider';
import { BubbleMenu as Menu } from '@tiptap/react';
import { Bold } from '../toolbar/bold';
import { Italic } from '../toolbar/italic';
import { Underline } from '../toolbar/underline';
import { StrikeThrough } from '../toolbar/strikethrough';
import { Code } from '../toolbar/code';
import { Align } from '../toolbar/align';
import { Separator } from '@/components/ui/separator';
import { useRef } from 'react';
export function BubbleMenu() {
  const { editor } = useEditor();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Menu editor={editor} tippyOptions={{ duration: 100, appendTo: 'parent' }}>
      <div ref={ref} className='bg-content flex items-center gap-1 rounded-lg border p-1.5 shadow'>
        <Bold />
        <Italic />
        <Underline />
        <StrikeThrough />
        <Code />
        <Separator orientation='vertical' className='mx-1 h-6' />
        <Align container={ref.current} />
      </div>
    </Menu>
  );
}
