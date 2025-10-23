'use client';
import * as React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import HERO_CIRCLES_GROUP from '@/resources/svg/HERO_CIRCLES_GROUP.svg';
import HERO_VECTOR_BG from '@/resources/svg/HERO_VECTOR_BG.svg';
import { ArrowRightIcon } from '@/icons/arrow-right';
import Link from 'next/link';

export function Hero() {
  return (
    <section className='relative overflow-hidden border-b'>
      <Image
        alt='CIRCLES'
        src={HERO_CIRCLES_GROUP.src}
        className='pointer-events-none absolute -top-20 -right-50 z-20 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
        width={800}
        height={800}
      />
      <Image
        alt='VECTOR'
        src={HERO_VECTOR_BG.src}
        className='pointer-events-none absolute -top-5 left-0 z-20 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
        width={1200}
        height={1200}
      />

      <img
        src='https://image.api.playstation.com/vulcan/ap/rnd/202505/0616/94c96a312de5657d739fe05cdf66f971a8ff6825c986eda4.png'
        alt='PERSONAJE'
        className='pointer-events-none absolute top-10 -right-40 z-30 w-150 mask-b-from-0 object-contain opacity-40 sm:-right-30 sm:left-1/2 lg:-right-50 lg:-translate-x-[calc((1/2*100%)-30rem)] lg:opacity-100'
      />

      <div className='container-screen-2xl relative z-40 pt-10 pb-10 sm:pt-24 sm:pb-24'>
        <h2 className='sr-only'>Programadores Especializados en FiveM</h2>
        <div className='relative max-w-3xl'>
          <h3 className='mb-6 text-3xl font-medium text-balance capitalize sm:text-7xl'>
            Creamos tu <span className='text-secondary'>servidor</span> en menos de{' '}
            <span className='text-primary text-shadow-secondary/40'>72 Horas</span>
          </h3>
          <p className='mb-6 max-w-xl text-balance'>
            Instalación completa, scripts personalizados y soporte garantizado para tu servidor de
            roleplay.
          </p>

          <Button
            asChild
            className='from-primary to-secondary group h-10 rounded-lg bg-gradient-to-r px-4 text-sm shadow-[0_0_30px_rgb(93,69,253,.5)] hover:opacity-80 sm:h-12 sm:px-8 sm:text-base'
          >
            <Link href='/services/fivem'>
              Solicitar Servicios <ArrowRightIcon className='size-6' />{' '}
            </Link>
          </Button>

          <div className='mt-4 flex items-center gap-4'>
            <span className='flex items-center gap-2.5'>
              <div className='bg-success flex size-1.5 shrink-0 items-center justify-center rounded-full'>
                <div className='bg-success/50 size-2 shrink-0 animate-ping rounded-full' />
              </div>
              Soporte 24/7
            </span>

            <div className='bg-foreground size-1 rounded-full' />

            <span> Instalación Completa </span>
          </div>
        </div>
      </div>
      <img
        src='https://fivepdmod.com/wp-content/uploads/2024/12/2.webp'
        alt='Service'
        className='pointer-events-none absolute inset-0 size-full object-cover'
      />
      <div className='to-background from-background/90 pointer-events-none absolute inset-0 z-10 size-full bg-gradient-to-tr object-cover' />
    </section>
  );
}
