import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ComponentProps, ReactElement, ReactNode } from 'react';

export const TooltipBtn = ({
  children,
  isActive = false,
  content,
  kbd,
  size = 'icon_xs',
  variant = 'light',
  asChild = false,
  className,
  ...rest
}: {
  children: React.ReactNode;
  isActive?: boolean;
  content: string;
  kbd?: string;
} & ComponentProps<typeof Button>) => {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          asChild={asChild}
          className={cn(isActive && 'bg-primary hover:bg-primary border', className)}
          size={size}
          variant='light'
          {...rest}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className='border px-2 py-1 text-xs' side='bottom'>
        <span className='text-foreground flex flex-col items-center gap-0.5 text-center'>
          {content}{' '}
          {kbd && (
            <kbd className='bg-foreground/5 rounded border px-1 py-0.5 text-[10px]'> {kbd} </kbd>
          )}{' '}
        </span>
      </TooltipContent>
    </Tooltip>
  );
};
