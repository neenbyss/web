import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LinkIcon } from '../icons/link';
import { TooltipBtn } from './_tooltip';
import { LinkBlock } from '../forms/link-block';
import React, { ComponentProps, ReactNode, useState } from 'react';

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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <TooltipBtn asChild content={content ?? 'Crear Link'}>
        <DropdownMenuTrigger>{children ?? <LinkIcon />}</DropdownMenuTrigger>
      </TooltipBtn>
      <DropdownMenuContent {...{ container }}>
        <LinkBlock
          onSave={() => {
            setOpen(false);
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
