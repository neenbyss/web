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
import { OrderedList } from './ordered-list';
import { BulletList } from './bullet-list';
import { InsertImage } from './image';

export function Toolbar() {
  return (
    <div className='flex flex-wrap items-center gap-1'>
      <UndoRendo />
      <Separator orientation='vertical' className='mx-2 h-6' />

      <Headings />

      <Separator orientation='vertical' className='mx-2 h-6' />

      <Bold />
      <Italic />
      <Underline />
      <StrikeThrough />
      <Align />

      <Separator orientation='vertical' className='mx-2 h-6' />

      <Link />
      <InsertImage />
      <Blockquote />
      <Code />
      <HorizontalRule />

      <Separator orientation='vertical' className='mx-2 h-6' />

      <BulletList />
      <OrderedList />

      <Separator orientation='vertical' className='mx-2 h-6' />

      <div className='ml-auto' />
      <Clear />
    </div>
  );
}
