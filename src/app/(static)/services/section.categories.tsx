'use client';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/spotlightcard';

import { ArrowRightIcon } from '@/icons/arrow-right';

import { cn } from '@/lib/utils';

import { serviceDetails, serviceCategories } from '@/utils/data/services';
import Link from 'next/link';

export function Categories() {
  return (
    <section className='py-10 sm:py-30'>
      <h2 className='mb-4 max-w-xl text-start text-xl font-medium sm:mx-auto sm:text-center sm:text-6xl'>
        Servicios Principales
      </h2>
      <p className='mx-auto mb-12 max-w-3xl text-start text-sm sm:mb-24 sm:text-center sm:text-lg'>
        {' '}
        Ofrecemos una amplia gama de servicios tecnológicos personalizados para ayudarte a alcanzar
        tus objetivos de negocio. Cada solución está diseñada a medida para satisfacer tus
        necesidades específicas.{' '}
      </p>

      {serviceCategories.map(({ uid, title, icon, color, description, href, plans }, i) => {
        return (
          <SpotlightCard
            spotlightColor={`rgba(${color}, .05)`}
            key={i}
            className={cn('border-0 bg-transparent')}
          >
            <div className='container-screen-2xl border-t py-8 sm:py-20'>
              <div className='lg:container-screen-xl grid-cols-[.6fr_1fr] gap-20 md:grid'>
                <div className='flex flex-col'>
                  <h3
                    className={cn(
                      'group-hover:text-primary mb-4 flex items-center gap-3.5 text-xl sm:text-4xl',
                    )}
                  >
                    <div
                      className='flex size-9 shrink-0 flex-col items-center justify-center rounded-lg border'
                      style={{
                        backgroundColor: `rgba(${color}, .2)`,
                        borderColor: `rgba(${color}, .2)`,
                        color: `rgba(${color})`,
                      }}
                    >
                      {icon}
                    </div>
                    {title}
                  </h3>
                  <p className='mb-12 max-w-xl text-sm text-balance sm:text-lg'>{description}</p>
                </div>

                <div className='mb-8 grid grid-cols-2 gap-4 sm:gap-12 md:mb-0 lg:grid-cols-3'>
                  {serviceDetails[uid]?.map(({ label, uid, description, image }, i) => {
                    return (
                      <div key={i} className='group h-fit'>
                        <Link
                          href={`/contact?service=${uid}`}
                          className='text-sm font-light text-balance underline underline-offset-4 hover:underline sm:text-xl md:no-underline'
                          style={{
                            color: `rgba(${color})`,
                          }}
                        >
                          {' '}
                          {label}
                        </Link>
                        {/** 
                      <div className='bg-background pointer-events-none fixed bottom-10 left-10 z-30 w-full max-w-sm rounded-xl border p-2.5 opacity-0 duration-300 group-hover:opacity-100 group-hover:delay-500'>
                        <span className='text-foreground mb-1.5 block text-2xl'>{label}</span>
                        <p className='mb-3'>{description}</p>
                        <div className='aspect-video rounded-lg bg-white' />
                      </div>
                      */}
                      </div>
                    );
                  })}
                </div>
                <div className='flex items-center gap-4'>
                  {href && (
                    <Button variant='none' className='group relative w-fit px-1 py-4 sm:py-8'>
                      <span className='ease-soft-spring text-foreground flex items-center gap-2 text-sm font-light opacity-80 transition group-hover:opacity-100 sm:text-lg'>
                        Saber Más <ArrowRightIcon />
                      </span>
                      <div className='bg-primary ease-soft-spring absolute bottom-0 left-0 h-1 w-0 duration-400 group-hover:w-full' />
                    </Button>
                  )}
                  {plans && (
                    <span className='from-secondary bg-gradient-to-tr to-orange-400 bg-clip-text text-lg text-transparent'>
                      {' '}
                      ¡Algunos Servicios Incluye Planes!{' '}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SpotlightCard>
        );
      })}

      <div className='bg-content mx-auto mt-20 flex w-full max-w-6xl flex-col items-center justify-between overflow-clip rounded-3xl border p-8 md:flex-row md:gap-20'>
        <div>
          <h2 className='mb-3 text-xl sm:text-4xl'>¿Necesitas Algo Diferente?</h2>
          <p className='mb-8 text-sm sm:text-lg'>
            Cada negocio es único. Agenda una consulta gratuita y diseñaremos una solución
            personalizada para tus necesidades específicas.
          </p>
        </div>

        <div className='flex w-full flex-col items-start md:items-end'>
          <div className='mb-6 flex flex-wrap items-center gap-3'>
            <span className='flex items-center gap-2.5 whitespace-nowrap'>
              <div className='bg-success flex size-1.5 shrink-0 items-center justify-center rounded-full'>
                <div className='bg-success/50 size-2 shrink-0 animate-ping rounded-full' />
              </div>
              Respuesta en menos de 24h
            </span>

            <span className='bg-foreground size-1 shrink-0 rounded-full' />

            <span className='whitespace-nowrap'> Sin compromiso </span>
          </div>
          <Button size='sm' className='shadow-primary/50 relative shadow-2xl'>
            <div className='bg-primary/10 absolute top-0 left-0 h-full w-full animate-ping rounded-xl' />
            Consulta Gratuita <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
