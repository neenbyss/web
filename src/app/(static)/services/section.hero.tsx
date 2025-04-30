import Link from 'next/link';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import { Button } from '@/components/ui/button';

import { ArrowRightIcon } from '@/icons/arrow-right';

import SERVICES_CIRCLES from '@/resources/svg/SERVICES_CIRCLES.svg';
import SERVICES_VECTOR from '@/resources/svg/SERVICES_VECTOR.svg';

export function Hero() {
  return (
    <section className='relative overflow-clip border-b'>
      <div className='container-screen-2xl relative z-10 py-5 sm:py-10'>
        <AppBreadcrumb className='mb-4 bg-transparent px-0 py-0' />

        <h2 className='mb-4 max-w-2xl text-3xl font-medium sm:text-6xl'>
          {' '}
          Soluciones Tecnológicas <span className='text-primary'>Integrales</span>{' '}
        </h2>
        <p className='max-w-2xl'>
          En <strong>Neenbyss</strong> ofrecemos un ecosistema completo de{' '}
          <strong>servicios digitales</strong>
          diseñados para transformar tu visión en realidad. Nuestro enfoque holístico combina
          tecnología de vanguardia con estrategia empresarial para crear soluciones que no solo
          resuelven problemas actuales, sino que preparan tu negocio para el futuro.
          <br />
          <br />
          Cada servicio está respaldado por un equipo de expertos <strong>apasionados</strong> que
          aportan conocimientos especializados y una mentalidad innovadora a cada proyecto,
          garantizando resultados excepcionales que superan expectativas.
        </p>

        <Button asChild className='bg-background mt-6' variant='outline'>
          <Link href='/projects'>
            Ver Proyectos Realizados <ArrowRightIcon />
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
