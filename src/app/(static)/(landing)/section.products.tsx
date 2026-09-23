'use client';

import Marquee from '@/components/common/marquee';
import { Fade } from '@/components/ui/fade';

export function Products() {
  const mitad = Math.ceil(customSoftwareCategories.length / 2);
  const primeraMitad = customSoftwareCategories.slice(0, mitad);
  const segundaMitad = customSoftwareCategories.slice(mitad);
  return (
    <>
      <style>
        {`
        .mask-gradient-marquee {
         mask-image:linear-gradient(to left, transparent 5%, rgba(0,0,0,1) 52%, rgba(0,0,0,1) 44%,transparent 95%)
        }
        `}
      </style>
      <Fade
        as='section'
        direction='up'
        duration={2}
        initTranslate={100}
        scroll
        className='mask-gradient-marquee relative py-20'
      >
        <h2 className='sr-only'> Servicios destacados </h2>
        <div className='container-screen-2xl relative flex flex-col items-center gap-2 overflow-clip backdrop-blur-3xl'>
          <Marquee>
            {primeraMitad.map(({ name, icon }, i) => (
              <span
                className='bg-primary/20 shrink-0 rounded-lg px-3 py-1.5 text-sm text-nowrap sm:text-xl'
                key={i}
              >
                {name}
              </span>
            ))}
          </Marquee>
          <Marquee reverse>
            {segundaMitad.map(({ name, icon }, i) => (
              <span
                className='bg-primary/20 shrink-0 rounded-lg px-3 py-1.5 text-sm text-nowrap sm:text-xl'
                key={i}
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </Fade>
    </>
  );
}

const customSoftwareCategories = [
  { name: 'Scripts para FiveM', icon: <></> },
  { name: 'Reparación de servidores FiveM', icon: <></> },
  { name: 'Optimización y rendimiento FiveM', icon: <></> },
  { name: 'Interfaces NUI y HUD', icon: <></> },
  { name: 'Packs de ropa y EUP', icon: <></> },
  { name: 'Migración ESX ↔ QBCore', icon: <></> },
  { name: 'Planes mensuales FiveM', icon: <></> },
  { name: 'Landing Pages', icon: <></> },
  { name: 'Diseño UI/UX', icon: <></> },
  { name: 'Automatización de procesos', icon: <></> },
  { name: 'Integraciones con APIs', icon: <></> },
  { name: 'Bots para Discord', icon: <></> },
];
// Catálogo completo (más de 50 especialidades) disponible en /services.
// Esta marquesina muestra solo una selección para no dominar el primer impacto.
