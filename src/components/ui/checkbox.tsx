'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import { CheckIcon } from '@/icons/check';

const Checkbox: React.FC<React.ComponentProps<typeof CheckboxPrimitive.Root>> = ({
  className,
  ...props
}) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer hover:bg-primary/20 group border-primary data-[state=checked]:text-primary-foreground focus:ring-primary/20 relative size-5 shrink-0 cursor-pointer overflow-clip rounded-sm border focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('bg-primary flex size-full items-center justify-center text-current')}
    >
      <CheckIcon className='size-3' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
