import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TooltipBtn } from './_tooltip';
import { AlignJustifyIcon } from '../icons/align-justify';
import { ChevronDownIcon } from '@/icons/chevron-down';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AlignLeftIcon } from '../icons/align-left';
import { AlignCenterIcon } from '../icons/align-center';
import { AlignRightIcon } from '../icons/align-right';
import { useEditor } from '../provider';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const AlignText: {
  label: string;
  icon: JSX.Element;
  type: 'left' | 'center' | 'right' | 'justify';
}[] = [
  {
    label: 'Izquierda',
    type: 'left',
    icon: <AlignLeftIcon />,
  },
  {
    label: 'Centro',
    type: 'center',
    icon: <AlignCenterIcon />,
  },
  {
    label: 'Derecha',
    type: 'right',
    icon: <AlignRightIcon />,
  },
  {
    label: 'Justificar',
    type: 'justify',
    icon: <AlignJustifyIcon />,
  },
];

export function Align() {
  const { editor, activeTextAlign, canTextAlign, isTextAlign } = useEditor();

  return (
    <Popover>
      <TooltipBtn
        onClick={(e) => e.stopPropagation()}
        asChild
        size='xs'
        className='h-7 gap-px pr-0.5 pl-1.5'
        content='Alinear Texto'
      >
        <PopoverTrigger>
          {activeTextAlign ? (
            AlignText.find((x) => x.type === activeTextAlign)?.icon
          ) : (
            <AlignLeftIcon />
          )}
          <ChevronDownIcon className='ml-0.5 size-3' />
        </PopoverTrigger>
      </TooltipBtn>
      <TooltipProvider>
        <PopoverContent className='flex items-center gap-1' onlyStartMenu>
          {AlignText.map(({ label, type, icon }) => (
            <TooltipBtn
              key={type}
              onClick={() => {
                editor?.chain().focus().setTextAlign(type).run();
              }}
              disabled={canTextAlign(type)}
              isActive={isTextAlign(type)}
              content={label}
            >
              {icon}
            </TooltipBtn>
          ))}
        </PopoverContent>
      </TooltipProvider>
    </Popover>
  );
}
