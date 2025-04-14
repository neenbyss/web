'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@/icons/chevron-down';
import { ChevronUpIcon } from '@/icons/chevron-up';
import { CheckIcon } from '@/icons/check';
import { AlertIcon } from '@/icons/alert';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger>;

const SelectTrigger: React.FC<
  SelectTriggerProps & {
    label?: string;
    errorMessage?: string;
    wrapperClassName?: string;
    required?: boolean;
    startContent?: React.JSX.Element;
  }
> = ({
  className,
  wrapperClassName,
  label,
  errorMessage,
  startContent,
  required,
  children,
  ...props
}) => (
  <div className={cn('w-full', wrapperClassName)}>
    {label && (
      <label className='mb-1.5 block w-full max-w-full overflow-hidden'>
        {' '}
        <span className='text-foreground truncate'>{label}</span>
        {required && <span className='text-danger'> * </span>}
      </label>
    )}
    <SelectPrimitive.Trigger
      className={cn(
        '[&_span]:text-foreground rounded-md transition-all duration-150 disabled:opacity-50 [&_span]:block [&_span]:w-full [&_span]:text-start [&>span]:line-clamp-1',
        'bg-default hover:bg-default/80 data-[placeholder]:[&_span]:text-foreground/50 w-full max-w-full p-3',
        'flex items-center gap-2',
        'outline-ring outline-1',
        'focus:bg-default focus:ring-primary/50 focus:ring-2 focus:outline-none',
        'data-[error=true]:!outline-danger/20 data-[error=true]:data-[focus=true]:!outline-danger [&_*]:data-[error=true]:!text-danger',
        className,
      )}
      data-error={Boolean(errorMessage)}
      {...props}
    >
      {startContent}
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className='size-4 opacity-60' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    {errorMessage && (
      <span className='text-danger mt-1.5 flex items-center gap-1.5 text-xs font-normal'>
        {' '}
        <AlertIcon className='size-3.5' /> {errorMessage}{' '}
      </span>
    )}
  </div>
);

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUpIcon className='h-4 w-4' />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDownIcon className='h-4 w-4' />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-content menu-animation relative z-30 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border shadow-md duration-0',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('text-primary px-2 py-1.5 font-medium opacity-50', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-primary/20 relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('bg-border -mx-1 my-1 h-px', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
