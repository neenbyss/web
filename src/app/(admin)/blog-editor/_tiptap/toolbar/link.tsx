import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LinkIcon } from '../icons/link';
import { TooltipBtn } from './_tooltip';
import { LinkBlock } from '../forms/link-block';
import React, { ComponentProps, ReactNode, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function Link({
  children,
  content,
  container,
}: {
  children?: ReactNode;
  content?: string;
  container?: ComponentProps<typeof DropdownMenuContent>['container'];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipBtn asChild content={content ?? 'Crear Link'}>
        <PopoverTrigger>{children ?? <LinkIcon />}</PopoverTrigger>
      </TooltipBtn>
      <PopoverContent onlyStartMenu>
        <LinkBlock
          onSave={() => {
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
