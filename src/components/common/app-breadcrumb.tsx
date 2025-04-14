'use client';
import * as React from 'react';

import { useRouter, usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NeenbyssIcon } from '@/icons/neenbyss';
import { cn } from '@/lib/utils';
import { serviceCategories } from '@/utils/data/services';

const ServicesNameMap = serviceCategories.reduce(
  (acc, x) => {
    acc[x.uid] = x.title;
    return acc;
  },
  {} as Record<string, string>,
);
const breadcrumbNameMap: Record<string, string> = {
  projects: 'Proyectos',
  contact: 'Contáctanos',
  services: 'Servicios',
  ...ServicesNameMap,
};

export function AppBreadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((x) => x);

  const maxBreadcrumbs = 3; // Límite de breadcrumbs a mostrar
  const shouldTruncate = pathnames.length > maxBreadcrumbs;

  const breadcrumbs = pathnames.map((path, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    const name = breadcrumbNameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);

    return {
      name,
      routeTo,
      isLast,
    };
  });

  const visibleBreadcrumbs = shouldTruncate ? breadcrumbs.slice(-maxBreadcrumbs) : breadcrumbs;

  const hiddenBreadcrumbs = shouldTruncate ? breadcrumbs.slice(0, -maxBreadcrumbs) : [];

  return (
    <Breadcrumb className={cn('bg-primary/20 rounded-lg px-3 py-2', className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/' className='flex items-center gap-2'>
            {' '}
            <NeenbyssIcon className='size-4' /> Neenbyss{' '}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {shouldTruncate && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-1'>
                <BreadcrumbEllipsis className='h-4 w-4' />
                <span className='sr-only'>Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                {hiddenBreadcrumbs.map((breadcrumb, index) => (
                  <DropdownMenuItem key={index}>
                    <BreadcrumbLink href={breadcrumb.routeTo}>{breadcrumb.name}</BreadcrumbLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}

        {visibleBreadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {breadcrumb.isLast ? (
                <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.routeTo}>{breadcrumb.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {!breadcrumb.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
