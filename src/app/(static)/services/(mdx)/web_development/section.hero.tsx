import { AppBreadcrumb } from '@/components/common/app-breadcrumb';

import SERVICES_CIRCLES from '@/resources/svg/SERVICES_CIRCLES.svg';
import SERVICES_VECTOR from '@/resources/svg/SERVICES_VECTOR.svg';
import React from 'react';

export function Hero() {
  return (
    <>
      <section className='relative overflow-clip border-b'>
        <div className='container-screen-2xl relative z-10 py-5 sm:py-15'>
          <AppBreadcrumb className='mb-4 bg-transparent px-0 py-0' />

          <h1 className='mb-6 max-w-3xl text-2xl font-medium sm:text-6xl'>
            Servicio de Desarrollo Web Personalizado: Diseño y Funcionalidad a tu Medida
          </h1>
          <p className='max-w-2xl'>
            En Neenbyss, entendemos que cada negocio es único y requiere una presencia en línea que
            refleje su identidad y objetivos. Por ello, ofrecemos servicios integrales de desarrollo
            web, abarcando desde el diseño visual hasta la funcionalidad técnica, adaptándonos a tus
            necesidades específicas.
          </p>
        </div>

        <img
          alt=''
          aria-hidden='true'
          src={SERVICES_CIRCLES.src}
          className='pointer-events-none absolute -top-20 -right-50 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
        />
        <img
          alt=''
          aria-hidden='true'
          src={SERVICES_VECTOR.src}
          className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
        />
      </section>
    </>
  );
}
