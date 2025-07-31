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

const AlignText = [
  {
    label: 'Izquierda',
    type: 'left',
    icon: AlignLeftIcon,
  },
  {
    label: 'Centro',
    type: 'center',
    icon: AlignCenterIcon,
  },
  {
    label: 'Derecha',
    type: 'right',
    icon: AlignRightIcon,
  },
  {
    label: 'Justificar',
    type: 'justify',
    icon: AlignJustifyIcon,
  },
];

export function Align({
  container,
}: {
  container?: Element | DocumentFragment | null | undefined;
}) {
  const { editor } = useEditor();

  return (
    <DropdownMenu>
      <TooltipBtn
        onClick={(e) => e.stopPropagation()}
        asChild
        size='xs'
        className='bg-foreground/5 border'
        content='Alinear'
      >
        <DropdownMenuTrigger>
          <AlignJustifyIcon />
          <ChevronDownIcon className='ml-0.5 size-3' />
        </DropdownMenuTrigger>
      </TooltipBtn>
      <TooltipProvider>
        <DropdownMenuContent container={container} className='flex items-center gap-1'>
          {AlignText.map(({ label, type, icon: Icon }) => (
            <TooltipBtn
              key={type}
              onClick={() => {
                editor?.chain().focus().setTextAlign(type).run();
              }}
              disabled={!editor?.can().chain().focus().setTextAlign(type).run()}
              isActive={editor?.isActive({ textAlign: type })}
              content={label}
            >
              <Icon />
            </TooltipBtn>
          ))}
        </DropdownMenuContent>
      </TooltipProvider>
    </DropdownMenu>
  );
}
