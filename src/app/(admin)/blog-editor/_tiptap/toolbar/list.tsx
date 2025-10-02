import { TooltipBtn } from './_tooltip';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditor } from '../provider';
import { ChevronDownIcon } from '@/icons/chevron-down';

import { cn } from '@/lib/utils';
import { BulletListIcon } from '../icons/bullet-list';
import { OrderedListIcon } from '../icons/ordered-list';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const list = {
  bulletList: <BulletListIcon />,
  orderedList: <OrderedListIcon />,
};

export function List() {
  const { editor, isBulletList, isOrderedList, canBulletList, canOrderedList, activeList } =
    useEditor();

  return (
    <Popover>
      <TooltipBtn
        asChild
        size='xs'
        className={cn('h-7 gap-px pr-0.5 pl-1.5', activeList && 'bg-primary/20')}
        content='Listas'
      >
        <PopoverTrigger>
          {activeList ? list[activeList] : <BulletListIcon />}
          <ChevronDownIcon className='!size-3' />
        </PopoverTrigger>
      </TooltipBtn>
      <PopoverContent className='flex flex-col gap-0.5' onlyStartMenu>
        <Button
          onClick={() => {
            editor?.chain().focus().toggleBulletList().run();
          }}
          disabled={canBulletList}
          size='sm'
          variant={isBulletList ? 'primary' : 'light'}
          className='h-7 justify-start rounded-sm px-2 font-light'
        >
          <BulletListIcon /> Lista de viñetas
        </Button>
        <Button
          onClick={() => {
            editor?.chain().focus().toggleOrderedList().run();
          }}
          disabled={canOrderedList}
          size='sm'
          variant={isOrderedList ? 'primary' : 'light'}
          className='h-7 justify-start rounded-sm px-2 font-light'
        >
          <OrderedListIcon /> Lista numérica
        </Button>
      </PopoverContent>
    </Popover>
  );
}
