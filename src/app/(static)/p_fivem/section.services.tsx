'use client';
import SpotlightCard from '@/components/ui/spotlightcard';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const services = [
  {
    title: 'Servidores FiveM desde Cero',
    descripcion:
      'Montamos tu servidor FiveM con instalación completa, base de datos, scripts personalizados y configuración profesional para cualquier tipo de rol.',
    frase: 'Inicia tu servidor FiveM con una base sólida y lista para crecer.',
    color: '--primary',
    className: 'bg-primary/10 border-primary',
  },
  {
    title: 'Servidores FiveM en Producción',
    descripcion:
      'Optimizamos y actualizamos servidores FiveM activos, mejorando rendimiento, estabilidad y compatibilidad con ESX o QBCore.',
    frase: 'Lleva tu servidor FiveM al siguiente nivel de rendimiento.',
    color: '--secondary',
    className: 'bg-secondary/10 border-secondary',
  },
  {
    title: 'Programación y Scripts FiveM',
    descripcion:
      'Creamos y personalizamos scripts únicos para servidores FiveM basados en ESX o QBCore, adaptados a tus necesidades y estilo de juego.',
    frase: 'Haz que tu servidor FiveM tenga sistemas únicos y funcionales.',
    color: '--color-cyan-700',
    className: 'bg-cyan-700/10 border-cyan-700',
  },
];
export function Services() {
  return (
    <section className='relative border-b'>
      <div className='container-screen-2xl relative z-[3] py-20'>
        <h2 className='mb-1 max-w-xl text-xl text-balance sm:mb-6 sm:text-5xl'>
          Servicios de Programación de FiveM
        </h2>
        <p>Soluciones completas para tu servidor: desde instalación hasta rescate técnico</p>

        <div className='mt-12 mb-8 grid grid-cols-1 gap-2.5 lg:grid-cols-3'>
          {services.map(({ title, descripcion, frase, className, color }, i) => {
            return (
              <SpotlightCard
                key={i}
                spotlightColor={`color-mix(in oklab, var(${color}) 30%, transparent)`}
                className={cn('flex flex-col p-6 backdrop-blur-3xl', className)}
              >
                <h3 className='text-lg sm:text-2xl'> {title} </h3>
                <p className='grow'>{descripcion}</p>

                <span className='text-foreground block py-1.5'>{frase}</span>
              </SpotlightCard>
            );
          })}
        </div>

        <p>
          {' '}
          ¿No es lo que buscas?{' '}
          <Link href='/contact' className='text-primary hover:underline'>
            {' '}
            Comunícate con nosotros{' '}
          </Link>{' '}
        </p>
      </div>
      <div className='to-background from-background/80 absolute top-0 left-0 z-[1] size-full bg-gradient-to-l' />
      <div className="absolute top-0 left-0 size-full bg-[url('https://www.gta-multiplayer.cz/screenshots/original/155224.jpg')] bg-cover bg-center" />
    </section>
  );
}
