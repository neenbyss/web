'use client';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import PROJECTS_BACKGROUND from '@/resources/svg/PROJECTS_BACKGROUND.svg';

export function Hero() {
  return (
    <section className='relative overflow-clip border-b'>
      <div className='container-screen-2xl relative z-10 py-5 sm:py-15'>
        <AppBreadcrumb className='mb-4 bg-transparent px-0 py-0' />

        <h2 className='mb-4 text-3xl font-medium sm:text-6xl'> Nuestros Proyectos </h2>
        <p className='max-w-2xl'>
          Explorá nuestra colección de proyectos destacados que demuestran nuestra experiencia y
          capacidad para crear soluciones digitales innovadoras. Cada proyecto refleja nuestro
          compromiso con la excelencia y la satisfacción del cliente.
        </p>
      </div>

      <img
        src={PROJECTS_BACKGROUND.src}
        alt='projects_bg'
        className='pointer-events-none absolute -top-40 left-1/2 min-w-[1000px] -translate-x-[calc((1/2*100%)-20rem)] sm:-top-20 sm:-translate-x-[calc((1/2*100%))] lg:-top-38 lg:min-w-[2000px]'
      />
    </section>
  );
}
