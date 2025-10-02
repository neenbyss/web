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
import HeadingIcon from '../icons/heading';
import { cn } from '@/lib/utils';
import Heading1Icon from '../icons/heading1';
import Heading2Icon from '../icons/heading2';
import Heading3Icon from '../icons/heading3';
import { JSX } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
const headings: { lvl: Level; icon: JSX.Element }[] = [
  {
    lvl: 1,
    icon: <Heading1Icon />,
  },
  {
    lvl: 2,
    icon: <Heading2Icon />,
  },
  {
    lvl: 3,
    icon: <Heading3Icon />,
  },
];

export function Headings() {
  const { editor, isHeadingActive, canHeading, activeHeading } = useEditor();

  return (
    <Popover>
      <TooltipBtn
        asChild
        size='xs'
        className={cn('h-7 gap-px pr-0.5 pl-1.5', activeHeading && 'bg-primary/20')}
        content='Encabezados'
      >
        <PopoverTrigger>
          {activeHeading ? headings[activeHeading - 1].icon : <HeadingIcon />}
          <ChevronDownIcon className='!size-3' />
        </PopoverTrigger>
      </TooltipBtn>
      <PopoverContent onlyStartMenu className='flex flex-col gap-0.5'>
        {headings.map(({ lvl: level }, i) => {
          return (
            <Button
              key={i}
              disabled={canHeading(level)}
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: level }).run();
              }}
              size='sm'
              variant={isHeadingActive(level) ? 'primary' : 'light'}
              className='h-7 justify-start rounded-sm px-2 font-light'
            >
              Encabezado {level}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
