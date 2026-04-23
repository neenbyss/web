'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';

import { CheckTaskIcon } from '@/icons/check-task';

import HERO_CIRCLES_GROUP from '@/resources/svg/HERO_CIRCLES_GROUP.svg';
import HERO_VECTOR_BG from '@/resources/svg/HERO_VECTOR_BG.svg';
import { ArrowRightIcon } from '@/icons/arrow-right';
import Link from 'next/link';
import GradientText from '@/components/common/gradient-text';

import * as m from 'motion/react-m';
import { Fade } from '@/components/ui/fade';
import { TextAnimate } from '@/components/ui/text-animated';

export function Hero() {
  return (
    <section className='relative overflow-hidden border-b'>
      <m.img
        alt='CIRCLES'
        src={HERO_CIRCLES_GROUP.src}
        className='pointer-events-none absolute -top-20 -right-50 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
      />
      <m.img
        alt='VECTOR'
        src={HERO_VECTOR_BG.src}
        className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
        initial={{
          opacity: 0,
          y: -100,
          x: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
      />

      <div className='container-screen-2xl relative z-10 flex pt-10 pb-24 sm:pt-24 sm:pb-48'>
        <div className='max-w-5xl'>
          <Fade scroll={false} className='relative'>
            <GradientText
              colors={['#fff', '#9747FF', '#fff', '#9747FF', '#fff', '#5D45FD']}
              animationSpeed={20}
              showBorder
              className='z-10 mb-4 w-fit px-4 py-2 text-xs sm:text-sm'
            >
              Arquitectos Digitales
            </GradientText>
            <div
              className='animate-gradient absolute top-2 left-2 z-2 inline-block bg-cover px-4 py-2 text-xs text-transparent opacity-30 blur-md sm:text-sm'
              style={{
                backgroundImage: `linear-gradient(to right, ${['#fff', '#9747FF', '#fff', '#9747FF', '#fff', '#5D45FD'].join(', ')})`,
                backgroundSize: '300% 100%',
              }}
            >
              Arquitectos Digitales
            </div>
          </Fade>

          <Fade
            as='h1'
            delay={0.2}
            scroll={false}
            className='mb-6 text-4xl font-medium text-pretty capitalize sm:text-7xl'
          >
            Desarrollo de <span className='text-primary'>Software</span>,{' '}
            <span className='text-secondary'>Scripts FiveM</span> y UI/UX a Tu Medida
          </Fade>

          <Fade as='p' delay={0.4} scroll={false} className='max-w-xl'>
            <strong>Programadores FiveM</strong>, desarrolladores web y diseñadores UI/UX.
            <br />
            Creamos <strong>scripts personalizados</strong> para servidores FiveM (ESX y QBCore),
            packs de ropa, interfaces NUI y software a medida que{' '}
            <strong>evoluciona contigo</strong>.
          </Fade>

          <div className='[&_span]:text-foreground mt-4 grid max-w-lg grid-cols-2 gap-2 [&_span]:text-xs [&_span]:font-medium sm:[&_span]:text-sm'>
            <Fade as='span' delay={0.4} scroll={false} className='flex items-center gap-2'>
              {' '}
              <CheckTaskIcon /> Soporte 24/7{' '}
            </Fade>
            <Fade as='span' delay={0.8} scroll={false} className='flex items-center gap-2'>
              {' '}
              <CheckTaskIcon /> Proyectos atractivos{' '}
            </Fade>
            <Fade as='span' delay={0.6} scroll={false} className='flex items-center gap-2'>
              {' '}
              <CheckTaskIcon /> Resultados Garantizado{' '}
            </Fade>
            <Fade as='span' delay={1} scroll={false} className='flex items-center gap-2'>
              {' '}
              <CheckTaskIcon /> Desarrollo personalizado{' '}
            </Fade>
          </div>

          <Fade delay={0.4} scroll={false} className='mt-8 flex items-center gap-2 sm:mt-4'>
            <Button
              asChild
              size='xl'
              variant='none'
              className='from-primary to-secondary group h-10 rounded-lg bg-gradient-to-r px-4 text-sm shadow-[0_0_30px_rgb(93,69,253,.5)] hover:opacity-80 sm:h-12 sm:px-8 sm:text-base'
            >
              <Link href='/contact'>
                Consulta Gratis
                <ArrowRightIcon className='size-6 duration-300 group-hover:pl-2' />
              </Link>
            </Button>
            <Button
              asChild
              size='xl'
              variant='outline'
              className='h-10 rounded-lg px-3.5 text-sm opacity-70 sm:h-12 sm:px-5 sm:text-base'
            >
              <Link href='/projects'>Nuestros Proyectos</Link>
            </Button>
          </Fade>

          <div className='mt-4 flex items-center gap-4'>
            <Fade
              as={'span'}
              delay={0.4}
              scroll={false}
              direction='up'
              className='flex items-center gap-2.5'
            >
              <div className='bg-success flex size-1.5 shrink-0 items-center justify-center rounded-full'>
                <div className='bg-success/50 size-2 shrink-0 animate-ping rounded-full' />
              </div>
              Respuesta en menos de 24h
            </Fade>

            <Fade
              as={'span'}
              direction='up'
              delay={0.4}
              scroll={false}
              className='bg-foreground size-1 rounded-full'
            />

            <Fade as={'span'} scroll={false} delay={0.6} direction='up'>
              {' '}
              Sin compromiso{' '}
            </Fade>
          </div>
        </div>

        <div></div>
      </div>
    </section>
  );
}
