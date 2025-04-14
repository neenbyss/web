'use client';
import * as React from 'react';
import Link, { useLinkStatus } from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Separator } from '../ui/separator';

import { NeenbyssIcon } from '@/icons/neenbyss';
import { UserIcon } from '@/icons/user';
import { DiscordIcon } from '@/icons/discord';
import { MenuIcon } from '@/icons/menu';
import { ChevronRightIcon } from '@/icons/chevron-right';
import { UsersIcon } from '@/icons/users';

import { cn } from '@/lib/utils';
import { globalLinks } from '@/utils/data/global-links';

const Navigation: { href: string; label: string; external?: boolean }[] = [
  {
    href: '/',
    label: 'Inicio',
  },
  {
    href: '/services',
    label: 'Servicios',
  },
  {
    href: '/projects',
    label: 'Proyectos',
  },

  {
    href: '/contact',
    label: 'Contáctanos',
  },
  {
    href: '/faqs',
    label: 'FAQ',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='bg-background sticky top-0 z-50 h-16 border-b md:h-18'>
      <div className='container-screen-2xl flex size-full items-center justify-between gap-2'>
        <motion.nav layout layoutRoot className='flex h-full items-center gap-4.5 overflow-clip'>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size='icon_sm' variant='outline' className='lg:hidden'>
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className='sr-only'>
                <DrawerTitle> Navigations </DrawerTitle>
              </DrawerHeader>
              <nav className='flex flex-col gap-1 p-4'>
                {Navigation.map(({ href, label, external }, i) => (
                  <Link
                    key={i}
                    href={href}
                    {...(external && { target: '_blank' })}
                    className={cn(
                      'ease-soft-spring group flex items-center gap-2 px-2 py-2 text-lg font-medium text-nowrap duration-500 focus:pl-4',
                    )}
                  >
                    {label}
                    <ChevronRightIcon className='ease-soft-spring -pl-2 opacity-0 duration-300 group-focus:pl-0 group-focus:opacity-100' />
                  </Link>
                ))}
                <Separator className='my-3' />
                <a
                  className='flex items-center gap-2 px-2 py-2 text-lg font-medium text-nowrap'
                  href={globalLinks.discord.link}
                  target='_blank'
                >
                  {' '}
                  <DiscordIcon className='size-6' /> Servidor de Discord
                </a>
                <a
                  target='_blank'
                  className='flex items-center gap-2 px-2 py-2 text-lg font-medium text-nowrap'
                  href={globalLinks.client_area.link}
                >
                  {' '}
                  <UsersIcon className='size-6' /> Área De Clientes
                </a>
              </nav>
            </DrawerContent>
          </Drawer>
          <Link
            href='/'
            className='text-foreground mr-1.5 flex items-center gap-2 text-xl font-bold transition hover:opacity-80 md:text-2xl'
          >
            <NeenbyssIcon className='size-6 md:size-8' />
            NEENBYSS
          </Link>
          {Navigation.map((props, i) => (
            <Link
              key={i}
              href={props.href}
              {...(props.external && { target: '_blank' })}
              className={cn(
                'relative hidden h-full items-center gap-2 py-3 font-medium text-nowrap transition-colors lg:flex',
                pathname === props.href
                  ? 'text-foreground'
                  : 'text-foreground/60 hover:text-foreground',
              )}
            >
              {props.label}
              {/**props.external && <ExternalLink className="size-3.5" />*/}
              {pathname === props.href && (
                <motion.div
                  className='bg-primary absolute bottom-0 h-1 w-full'
                  layout
                  layoutId='header-selected'
                  layoutScroll
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  style={{ y: 0 }}
                />
              )}
            </Link>
          ))}
        </motion.nav>

        <div className='flex items-center gap-2'>
          <Button asChild variant='outline' size='icon' className='hidden sm:inline-flex'>
            <a href={globalLinks.discord.link} target='_blank'>
              <DiscordIcon />
            </a>
          </Button>
          <Button asChild variant='none' className='hover:bg-ring hidden border sm:inline-flex'>
            <a href={globalLinks.client_area.link} target='_blank'>
              Área de Clientes
              <UserIcon />
            </a>
          </Button>
          <Button asChild className='h-9 px-3 sm:h-10'>
            <Link href='/contact'>Consulta Gratis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
