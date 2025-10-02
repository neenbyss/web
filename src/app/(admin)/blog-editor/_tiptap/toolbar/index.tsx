import { Separator } from '@/components/ui/separator';
import { Bold } from './bold';
import { Italic } from './italic';
import { Underline } from './underline';
import { Headings } from './headings';
import { StrikeThrough } from './strikethrough';
import { UndoRendo } from './undo-rendo';
import { Clear } from './clear';
import { Code } from './code';
import { Separator as HorizontalRule } from './separator';
import { Blockquote } from './blockquote';
import { Align } from './align';
import { Link } from './link';
import { InsertImage } from './image';
import { List } from './list';

export function Toolbar() {
  return (
    <div className='flex flex-wrap items-center gap-1.5'>
      <UndoRendo />
      <Separator orientation='vertical' className='h-6' />

      <Headings />
      <List />

      <Separator orientation='vertical' className='h-6' />

      <Bold />
      <Italic />
      <Underline />
      <StrikeThrough />
      <Align />

      <Separator orientation='vertical' className='h-6' />

      <Blockquote />
      <Code />
      <HorizontalRule />

      <Separator orientation='vertical' className='h-6' />
      <Link />
      <InsertImage />

      <div className='ml-auto' />
      <Separator orientation='vertical' className='h-6' />

      <Clear />
    </div>
  );
}
