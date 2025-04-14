import { AppBreadcrumb } from '@/components/common/app-breadcrumb';

import SERVICES_CIRCLES from '@/resources/svg/SERVICES_CIRCLES.svg';
import SERVICES_VECTOR from '@/resources/svg/SERVICES_VECTOR.svg';
import React from 'react';

export function Hero() {
  return (
    <>
      <h1 className='sr-only'> Desarrollo Web </h1>
      <section className='relative overflow-clip border-b'>
        <div className='container-screen-2xl relative z-10 py-5 sm:py-15'>
          <AppBreadcrumb className='mb-4 bg-transparent px-0 py-0' />

          <h2 className='mb-6 max-w-3xl text-2xl font-medium sm:text-6xl'>
            Servicio de Diseños UI/UX
          </h2>
          <p className='max-w-2xl'>
            En Neenbyss, creamos experiencias visuales que no solo se ven bien, sino que también
            funcionan de forma intuitiva. Nuestro servicio de diseño UI/UX está enfocado en entender
            a tus usuarios y transmitir la esencia de tu marca a través de interfaces limpias,
            modernas y centradas en la experiencia. Desde wireframes hasta prototipos funcionales,
            diseñamos con estrategia y creatividad para maximizar la usabilidad y la conversión.
          </p>
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
    </>
  );
}
