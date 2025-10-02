'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

const TooltipContent: React.FC<TooltipContentProps & { preventAnimations?: boolean }> = ({
  className,
  sideOffset = 8,
  preventAnimations = true,
  ...props
}) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(
      'bg-content z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md',
      !preventAnimations &&
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 animate-in fade-in-0 [animation-duration:.4s!important]',
      className,
    )}
    {...props}
  />
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
