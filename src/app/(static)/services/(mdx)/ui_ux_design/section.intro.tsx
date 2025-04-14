import { Badge } from '@/components/common/badge';
import { CheckTaskIcon } from '@/icons/check-task';
import { FigmaIcon } from '@/icons/figma';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface IntroProps {
  color: number[];
}

export default function Intro({ color }: IntroProps) {
  return (
    <section className='container-screen-2xl py-20'>
      <h2 className='bg-primary text-primary-foreground mb-2 w-fit px-2 py-0.5 text-sm sm:text-lg'>
        {' '}
        Fundamentos{' '}
      </h2>
      <span className='text-foreground mb-4 block text-xl font-medium sm:text-4xl'>
        ¿Qué es el Diseño UI/UX?
      </span>
      <p className='max-w-2xl'>
        Comprendiendo la diferencia entre interfaz de usuario (UI) y experiencia de usuario (UX)
      </p>

      <div className='mt-8 grid items-center gap-12 lg:grid-cols-2'>
        <div className='relative md:mb-12 lg:mb-0'>
          <div>
            <Image
              src='/images/design-color.svg'
              alt='UI vs UX'
              width={600}
              height={400}
              className='h-auto w-full object-contain'
            />
          </div>

          <div
            className='bg-background -bottom-10 left-1/2 mt-5 w-full max-w-3xl rounded-lg border-2 p-4 shadow-lg md:absolute md:mt-0 md:max-w-xs md:-translate-x-1/2'
            style={{ borderColor: `rgba(${color.join(',')}, 0.5)` }}
          >
            <div className='mb-2 flex items-center gap-2'>
              <FigmaIcon className='h-5 w-5' />
              <span className='text-sm font-medium'>Diseños en Figma</span>
            </div>
            <p className='text-muted-foreground text-xs'>
              Utilizamos Figma para todo nuestro proceso de diseño UI/UX
            </p>
          </div>
        </div>

        <div>
          <div className='mb-8'>
            <h3 className='mb-3 text-xl font-medium'>Diseño UI (Interfaz de Usuario)</h3>
            <p className='mb-4 text-balance'>
              El diseño UI se enfoca en la apariencia visual de un producto digital. Incluye todos
              los elementos con los que el usuario interactúa directamente:
            </p>
            <ul className='space-y-2'>
              {[
                'Botones, formularios y controles',
                'Tipografía y esquemas de color',
                'Espaciado y composición',
                'Iconografía e imágenes',
                'Animaciones y transiciones',
              ].map((item, i) => (
                <li key={i} className='flex items-start gap-3'>
                  <CheckTaskIcon
                    className='mt-1 shrink-0'
                    style={{ color: `rgb(${color.join(',')})` }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-3 text-xl font-medium'>Diseño UX (Experiencia de Usuario)</h3>
            <p className='mb-4 text-balance'>
              El diseño UX abarca toda la experiencia que tiene un usuario al interactuar con un
              producto digital, incluyendo:
            </p>
            <ul className='space-y-2'>
              {[
                'Investigación de usuarios y sus necesidades',
                'Arquitectura de información',
                'Flujos de navegación y user journeys',
                'Wireframes y prototipos',
                'Pruebas de usabilidad',
              ].map((item, i) => (
                <li key={i} className='flex items-start gap-3'>
                  <CheckTaskIcon
                    className='mt-1 shrink-0'
                    style={{ color: `rgb(${color.join(',')})` }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
