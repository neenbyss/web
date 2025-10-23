import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
//import { LoaderCircleIcon } from '@/icons/loader-circle-icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer text-sm font-medium transition disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[.98] acitve:duration-[.05s] outline-none',
  {
    variants: {
      variant: {
        none: 'text-foreground',
        default: 'bg-default hover:bg-default/80 text-default-foreground',
        primary: 'bg-primary hover:bg-primary/80 text-primary-foreground',
        secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
        danger: 'bg-danger text-danger-foreground hover:bg-danger/80',
        outline: 'border hover:bg-primary/20 text-primary-foreground bg-background',
        link: 'text-primary underline-offset-4 hover:underline',
        light: 'hover:bg-primary/20',
        flat: 'bg-primary/20 hover:bg-primary/10 text-primary',
      },
      size: {
        xs: 'h-8 px-2.5 py-1.5 rounded-sm text-xs',
        default: 'h-10 rounded-lg px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-10.5 rounded-lg px-8',
        xl: 'h-12 rounded-lg px-8 text-base',
        icon: 'size-10 rounded-lg',
        icon_sm: 'size-8 rounded-lg',
        icon_xs: 'size-6 rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  ref,
  className,
  variant,
  size,
  asChild = false,
  type,
  loading,
  disabled,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      type={type ?? 'button'}
      className={cn(buttonVariants({ variant, size, className }))}
      data-loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          {' '}
          {/**<LoaderCircleIcon className='!size-4 flex-shrink-0 animate-spin' /> */}
          Cargando...{' '}
        </>
      ) : (
        children
      )}
    </Comp>
  );
};

export { Button, buttonVariants };
