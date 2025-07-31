'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@/icons/check';
import { ChevronRightIcon } from '@/icons/chevron-right';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const MenuItemVariants = cva(
  'flex items-center relative gap-2 whitespace-nowrap cursor-pointer text-sm transition-colors disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[.98] acitve:duration-[.05s] outline-none rounded-sm px-2 py-1.5',
  {
    variants: {
      variant: {
        none: 'text-foreground',
        active: 'bg-primary text-primary-foreground',
        active_secondary: 'bg-secondary text-secondary-foreground',
        active_danger: 'bg-danger text-danger-foreground',
        default: 'hover:bg-foreground/20 focus:bg-foreground/20',
        primary: 'hover:bg-primary/20 focus:bg-primary/20',
        secondary: 'hover:bg-secondary/20 focus:bg-secondary/20',
        danger: 'hover:bg-danger/20 focus:bg-danger/20',
        primary_flat: 'text-primary hover:bg-primary/80 hover:text-primary-foreground',
        secondary_flat: 'text-secondary hover:bg-seondary/80 hover:text-secondary-foreground',
        danger_flat: 'text-danger hover:bg-danger/80 hover:text-danger-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  } & VariantProps<typeof MenuItemVariants>
> = ({ className, inset, children, variant, ...props }) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(MenuItemVariants({ variant }), inset && 'pl-8', className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </DropdownMenuPrimitive.SubTrigger>
  );
};

const DropdownMenuSubContent: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>
> = ({ className, sideOffset = 12, ...props }) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      'bg-content menu-animation z-30 min-w-[8rem] overflow-hidden rounded-lg border p-1.5 shadow-md duration-0',
      className,
    )}
    sideOffset={sideOffset}
    {...props}
  />
);

const DropdownMenuContent: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
    container?: Element | DocumentFragment | null | undefined;
  }
> = ({ className, sideOffset = 4, container, ...props }) => (
  <DropdownMenuPrimitive.Portal container={container}>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'bg-content menu-animation z-30 min-w-[8rem] overflow-hidden rounded-lg border p-1.5 shadow-md duration-0',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

const DropdownMenuItem: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean } & VariantProps<
      typeof MenuItemVariants
    >
> = ({ className, inset, variant, ...props }) => (
  <DropdownMenuPrimitive.Item
    className={cn(MenuItemVariants({ variant }), inset && 'pl-8', className)}
    {...props}
  />
);

const DropdownMenuCheckboxItem: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> &
    VariantProps<typeof MenuItemVariants>
> = ({ className, children, checked, variant, ...props }) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(MenuItemVariants({ variant }), 'pr-2 pl-8', className)}
    checked={checked}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioItem: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> &
    VariantProps<typeof MenuItemVariants>
> = ({ className, children, variant, ...props }) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(MenuItemVariants({ variant }), 'pr-2 pl-8', className)}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <div className='h-2 w-2 bg-current' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
> = ({ className, inset, ...props }) => (
  <DropdownMenuPrimitive.Label
    className={cn('px-2 py-1.5 text-sm font-medium', inset && 'pl-8', className)}
    {...props}
  />
);

const DropdownMenuSeparator: React.FC<
  React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
> = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Separator
    className={cn('bg-border -mx-1.5 my-1 h-px', className)}
    {...props}
  />
);

const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
