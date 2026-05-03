'use client';
import * as m from 'motion/react-m';
import { Fade } from '@/components/ui/fade';
import GradientText from '@/components/common/gradient-text';

export function Hero() {
  return (
    <section className='border-ring relative overflow-hidden border-b'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(93,69,253,0.12),transparent)]' />
      <div className='bg-primary/5 pointer-events-none absolute -top-40 -right-40 size-96 rounded-full blur-3xl' />
      <div className='bg-secondary/5 pointer-events-none absolute bottom-0 -left-40 size-80 rounded-full blur-3xl' />

      <div className='container-screen-lg relative py-20 sm:py-28'>
        <div className='mx-auto max-w-3xl text-center'>
          <Fade scroll={false} className='flex justify-center'>
            <GradientText
              colors={['#9747FF', '#5D45FD', '#9747FF']}
              animationSpeed={12}
              showBorder
              className='z-10 mb-6 w-fit px-4 py-1.5 text-xs sm:text-sm'
            >
              Bitácora de Desarrollo
            </GradientText>
          </Fade>

          <Fade
            as='h1'
            delay={0.15}
            scroll={false}
            className='mb-5 text-4xl leading-tight font-medium text-balance sm:text-6xl'
          >
            Análisis, guías y{' '}
            <span className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent'>
              reflexiones
            </span>{' '}
            sobre código
          </Fade>

          <Fade as='p' delay={0.3} scroll={false} className='mx-auto max-w-xl'>
            Escritura técnica sobre el ecosistema FiveM, optimización de scripts, arquitectura web y
            las decisiones de diseño detrás de cada proyecto.
          </Fade>

          <Fade
            delay={0.5}
            scroll={false}
            className='text-foreground-2/60 mt-8 flex items-center justify-center gap-6 text-xs'
          >
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className='flex items-center gap-2'
            >
              <span className='bg-primary flex size-1.5 rounded-full' />
              Tutoriales
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className='flex items-center gap-2'
            >
              <span className='bg-secondary flex size-1.5 rounded-full' />
              Guías técnicas
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className='flex items-center gap-2'
            >
              <span className='bg-content-2/40 flex size-1.5 rounded-full' />
              Análisis
            </m.div>
          </Fade>
        </div>
      </div>

      <div className='via-ring pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent' />
    </section>
  );
}
