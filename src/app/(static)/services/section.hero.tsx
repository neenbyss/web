import Link from 'next/link';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import { Button } from '@/components/ui/button';

import { ArrowRightIcon } from '@/icons/arrow-right';

import SERVICES_CIRCLES from '@/resources/svg/SERVICES_CIRCLES.svg';
import SERVICES_VECTOR from '@/resources/svg/SERVICES_VECTOR.svg';
import { CheckIcon } from '@/icons/check';
import { CheckTaskIcon } from '@/icons/check-task';

export function Hero() {
  return (
    <section className='relative overflow-clip border-b'>
      <div className='container-screen-2xl relative z-10 py-5 sm:py-10'>
        <AppBreadcrumb className='mb-4 bg-transparent px-0 py-0' />

        <h2 className='mb-8 max-w-4xl text-3xl font-medium capitalize sm:text-6xl'>
          Servicios de <span className='text-primary'>tecnología</span> y programación avanzada
        </h2>
        <p className='max-w-lg text-balance'>
          Desarrollamos sistemas y aplicaciones diseñados para optimizar procesos, reducir costos y
          potenciar tus resultados.
        </p>

        <div className='mt-8 mb-6 flex items-center gap-2'>
          <span className='flex items-center gap-2'>
            <CheckTaskIcon className='text-primary' />
            Entrega Garantizada
          </span>
          <span className='flex items-center gap-2'>
            <CheckTaskIcon className='text-primary' />
            Soporte 24/7
          </span>
        </div>

        <Button asChild className='bg-background' variant='outline'>
          <Link href='/projects'>
            Nuestros Proyectos <ArrowRightIcon />
          </Link>
        </Button>
      </div>

      <img
        alt='SERVICES_CIRCLES'
        src={SERVICES_CIRCLES.src}
        className='pointer-events-none absolute -top-20 -right-50 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
      />
      <img
        alt='SERVICES_VECTOR'
        src={SERVICES_VECTOR.src}
        className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
      />
    </section>
  );
}
