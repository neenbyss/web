import { cn } from '@/lib/utils';
import * as React from 'react';

export type BadgeProps = {} & React.ComponentProps<'div'>;
export function Badge({ className, ...rest }: BadgeProps) {
  return (
    <span className={cn('bg-ring text-foreground rounded-sm px-3 py-1', className)} {...rest} />
  );
}
