import * as React from 'react';

import { cn } from '@/lib/utils';

type CardProps = React.ComponentProps<'div'>;
const Card: React.FC<CardProps> = ({ className, ref, ...props }) => (
  <div ref={ref} className={cn('bg-content rounded-lg border', className)} {...props} />
);

type CardHeaderProps = React.ComponentProps<'div'>;
const CardHeader: React.FC<CardHeaderProps> = ({ className, ref, ...props }) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

type CardTitleProps = React.ComponentProps<'div'>;
const CardTitle: React.FC<CardTitleProps> = ({ className, ref, ...props }) => (
  <div
    ref={ref}
    className={cn('heading-3 leading-none font-semibold tracking-tight', className)}
    {...props}
  />
);

type CardDescriptionProps = React.ComponentProps<'div'>;
const CardDescription: React.FC<CardDescriptionProps> = ({ className, ref, ...props }) => (
  <p ref={ref} className={cn('text-sm', className)} {...props} />
);

type CardContentProps = React.ComponentProps<'div'>;
const CardContent: React.FC<CardContentProps> = ({ className, ref, ...props }) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);

type CardFooterProps = React.ComponentProps<'div'>;
const CardFooter: React.FC<CardFooterProps> = ({ className, ref, ...props }) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
