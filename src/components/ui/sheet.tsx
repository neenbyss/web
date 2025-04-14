'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { XIcon } from '@/icons/x';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>;

const SheetOverlay: React.FC<SheetOverlayProps> = ({ className, ...props }) => (
  <SheetPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
      className,
    )}
    {...props}
  />
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent: React.FC<SheetContentProps> = ({
  side = 'right',
  className,
  children,
  ...props
}) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetHeader className='hidden'>
        {' '}
        <SheetTitle> </SheetTitle>{' '}
      </SheetHeader>
      {children}
      <SheetPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'>
        <XIcon className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const SheetHeader: React.FC<SheetHeaderProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

const SheetFooter: React.FC<SheetFooterProps> = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

const SheetTitle: React.FC<SheetTitleProps> = ({ className, ...props }) => (
  <SheetPrimitive.Title
    className={cn('text-foreground text-lg font-semibold', className)}
    {...props}
  />
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>;

const SheetDescription: React.FC<SheetDescriptionProps> = ({ className, ...props }) => (
  <SheetPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
