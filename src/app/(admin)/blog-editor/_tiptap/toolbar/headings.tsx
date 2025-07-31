import { TooltipBtn } from './_tooltip';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditor } from '../provider';
import { ChevronDownIcon } from '@/icons/chevron-down';
import { cn } from '@/lib/utils';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
const headings: { kbd?: string; level: Level; cn?: string }[] = [
  {
    level: 1,
    cn: 'text-xl font-medium',
  },
  {
    level: 2,
    cn: 'text-lg font-medium',
  },
  {
    level: 3,
    cn: 'text-base font-medium',
  },
  {
    level: 4,
  },
  {
    level: 5,
  },
  {
    level: 6,
  },
];

export function Headings() {
  const { editor } = useEditor();

  return (
    <DropdownMenu>
      <TooltipBtn
        asChild
        size='xs'
        className='bg-foreground/5 max-w-34 min-w-34 justify-start border px-3 text-sm'
        content='Encabezados'
      >
        <DropdownMenuTrigger>
          {(() => {
            if (editor.isActive('paragraph')) return 'Párrafo';
            const activeHeading = headings.find(({ level }) =>
              editor.isActive('heading', { level }),
            );
            if (activeHeading) return `Encabezado ${activeHeading.level}`;
            return 'Texto';
          })()}
          <ChevronDownIcon className='ml-auto !size-3' />
        </DropdownMenuTrigger>
      </TooltipBtn>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          disabled={!editor?.can().chain().focus().setParagraph().run()}
          checked={editor.isActive('paragraph')}
          onCheckedChange={() => {
            editor?.chain().focus().setParagraph().run();
          }}
        >
          Párrafo
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {headings.map(({ level, cn: className }, i) => {
          return (
            <DropdownMenuCheckboxItem
              key={i}
              disabled={!editor?.can().chain().focus().toggleHeading({ level: level }).run()}
              checked={editor.isActive('heading', { level })}
              onCheckedChange={() => {
                editor?.chain().focus().toggleHeading({ level: level }).run();
              }}
              className={cn(className)}
            >
              Encabezado {level}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
