'use client';
import { useRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';

import { EmailIcon } from '@/icons/email';

import { Socials } from '@/utils/data/socials';
import { NeenbyssIcon } from '@/icons/neenbyss';
import { CheckTaskIcon } from '@/icons/check-task';

import CIRCLES_FOOTER from '@/resources/svg/CIRCLES_FOOTER.svg';
import FOOTER_VECTOR from '@/resources/svg/FOOTER_VECTOR.svg';

const Navigation = [
  {
    title: 'Compañía',
    links: [
      { href: '/', label: 'Inicio' },
      { href: '/services', label: 'Servicios' },
      { href: '/projects', label: 'Proyectos De Neenbyss' },
      { href: '/contact', label: 'Contáctanos', external: false },
    ],
  },
  {
    title: 'Políticas',
    links: [
      { href: '/terms', label: 'Términos y Condiciones' },
      { href: '/privacy', label: 'Políticas de Privacidad' },
      { href: '/terms-software', label: 'Uso de Software y Servicios' },
      { href: '/terms-fivem', label: 'Términos Y Condiciones De FiveM' },
    ],
  },
];

export function Footer() {
  const route = useRouter();
  const input_email = useRef<HTMLInputElement>(null);

  return (
    <footer className='bg-content relative z-10 border-t pt-20 pb-8'>
      <div className='container-screen-2xl'>
        <div className='relative flex flex-col items-center gap-8 overflow-clip rounded-2xl border p-8 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-xl'>
            <span className='text-foreground mb-4 block text-center text-xl font-medium sm:text-4xl md:text-start'>
              {' '}
              ¿Listo para impulsar tu negocio al siguiente nivel?{' '}
            </span>
            <p className='text-center md:text-start'>
              Agenda una consulta gratuita hoy mismo y descubre cómo podemos ayudarte a alcanzar tus
              objetivos digitales. Nuestro equipo de expertos está listo para crear una solución
              personalizada para tu negocio.
            </p>
          </div>

          <div className='flex flex-col items-center gap-6 md:items-end'>
            <ul className='[&_*]:!text-foreground flex flex-wrap items-center justify-center gap-4 md:justify-end'>
              <li className='flex items-center gap-2 text-nowrap'>
                <CheckTaskIcon /> Respuesta en 24h
              </li>
              <li className='flex items-center gap-2 text-nowrap'>
                <CheckTaskIcon />
                Proyectos atractivos
              </li>
              <li className='flex items-center gap-2 text-nowrap'>
                <CheckTaskIcon /> Sin Compromiso
              </li>
            </ul>
            <Button asChild>
              <Link href={'/contact'}>Consulta Sin Compromiso</Link>
            </Button>
          </div>

          <img
            alt='circles_footer'
            src={CIRCLES_FOOTER.src}
            className='pointer-events-none absolute -bottom-40 left-1/2 -translate-x-[calc((1/2*100%))] scale-200 md:-bottom-60 md:scale-125'
          />
          <img
            alt='vector_footer'
            src={FOOTER_VECTOR.src}
            className='pointer-events-none absolute left-1/2 scale-200 sm:-translate-x-[calc((1/2*100%-20rem))] md:-top-30 md:scale-100'
          />
        </div>

        <div className='mt-10 flex w-full flex-col justify-center gap-4 py-8 lg:flex-row lg:justify-between'>
          <div className='flex w-full flex-col items-center text-center sm:max-w-[340px] sm:items-start sm:text-start'>
            <Link
              href='/'
              className='text-foreground mr-4 flex items-center gap-2 text-xl font-bold transition hover:opacity-80 md:text-2xl'
            >
              <NeenbyssIcon className='size-6 md:size-8' />
              NEENBYSS
            </Link>

            <p className='mt-4 text-sm'>
              Transformamos tu visión en experiencias digitales que inspiran y conectan con el
              futuro.
            </p>

            <span className='text-primary/80 pt-4 text-xs'>
              {' '}
              Web desarrollada por el equipo de desarrollo y diseño de neenbyss{' '}
            </span>
          </div>

          <div className='flex w-full flex-wrap justify-between gap-4 lg:flex-nowrap lg:justify-end xl:gap-10'>
            {Navigation.map(({ title, links }, i) => (
              <nav
                key={i}
                className='w-full space-y-2 text-center sm:max-w-[260px] sm:text-start [&_a]:block [&_a]:text-sm'
              >
                <span className='text-foreground mb-3 block font-medium'> {title} </span>

                {links.map(({ href, label, external }, y) => (
                  <Link
                    key={`${i}-${y}`}
                    href={href}
                    className='hover:text-primary focus:text-secondary text-foreground-2 font-light transition focus:underline'
                    {...(external && { target: '_blank' })}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            ))}

            <div className='w-full space-y-4 sm:max-w-xs'>
              <div>
                <span className='text-foreground mb-4 block text-center font-bold sm:text-start'>
                  {' '}
                  Redes Sociales{' '}
                </span>

                <nav className='flex flex-wrap justify-center gap-2 sm:justify-start [&_svg]:size-5'>
                  {Socials.map(({ href, icon }, i) => (
                    <Button
                      key={i}
                      asChild
                      size='sm'
                      variant='flat'
                      className='size-8 hover:scale-105'
                    >
                      <a href={href} target='_blank'>
                        {icon}
                      </a>
                    </Button>
                  ))}
                </nav>
              </div>
              <div className='space-y-2'>
                <span className='text-foreground mb-4 block text-center font-bold sm:text-start'>
                  {' '}
                  Contáctanos{' '}
                </span>

                <div className='flex w-full gap-2 md:w-auto'>
                  <Input
                    type='email'
                    ref={input_email}
                    endContent={<EmailIcon />}
                    placeholder='tucorreo@gmail.com'
                    className='h-10'
                  />
                  <Button
                    onClick={() => {
                      route.push(`/contact?email=${input_email.current?.value}`);
                    }}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <span className='mt-8 block text-center text-sm opacity-80 dark:opacity-50'>
          {' '}
          © Neenbyss 2024 - {new Date().getFullYear()} | Todos los derechos reservados.{' '}
        </span>
      </div>
    </footer>
  );
}
