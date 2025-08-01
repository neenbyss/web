import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SpotlightCard from '@/components/ui/spotlightcard';
import { AlertIcon } from '@/icons/alert';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PricingPlans() {
  // Planes de precios

  return (
    <section id='plans' className='bg-content py-20'>
      <div className='container-screen-xl'>
        <h2 className='text-foreground mb-4 block text-xl font-medium sm:text-4xl'>
          ¿Qué Ofrecemos?
        </h2>
        <p className='max-w-2xl'>
          Comprendiendo la diferencia entre interfaz de usuario (UI) y experiencia de usuario (UX)
        </p>
        <div className='mt-12 grid gap-4 md:grid-cols-3'>
          {pricingPlans.map((pricing, i) => {
            return (
              <SpotlightCard
                key={i}
                className={cn(
                  pricing.recommended
                    ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
                    : 'bg-background',
                  pricing.custom && 'bg-foreground/[.05]',

                  'relative flex flex-col p-6',
                )}
                spotlightColor={`rgba(${pricing.color}, .2)`}
              >
                {pricing.recommended && (
                  <span className='bg-primary absolute top-0 right-0 rounded-bl-xl px-4 py-1.5 text-xs sm:text-sm'>
                    {' '}
                    Popular{' '}
                  </span>
                )}
                <h3 className='mb-1 text-base font-medium sm:text-2xl'> Plan {pricing.name} </h3>
                <p className='mb-4'> {pricing.description} </p>
                <span className={cn('text-foreground my-2 block text-3xl font-medium')}>
                  {' '}
                  {pricing.price}{' '}
                  {!pricing.custom && <span className='text-sm font-light opacity-40'> /mes </span>}
                </span>

                <div className='my-4 flex flex-col gap-2'>
                  <span className='text-xs opacity-50'>{pricing.discount3}</span>
                  <span className='text-xs opacity-50'>{pricing.discount6}</span>
                </div>

                <Button
                  asChild
                  variant={
                    !pricing.custom
                      ? ['Bronce', 'Plata'].includes(pricing.name)
                        ? 'outline'
                        : 'primary'
                      : 'default'
                  }
                  className='w-full'
                >
                  <Link href={`/contact?service=${pricing.uid}`}>
                    {pricing.custom ? 'Contáctanos' : 'Contratar Plan'}
                    <ArrowRightIcon />
                  </Link>
                </Button>

                <Separator className='my-4' />

                <ul className='flex grow flex-col gap-4'>
                  {pricing.features?.map((x, j) => {
                    return (
                      <li key={`${i}-${j}`} className='flex items-center gap-2'>
                        <CheckTaskIcon className='text-primary' /> {x}
                      </li>
                    );
                  })}
                </ul>
                <Separator className='my-4' />
                <p className='text-xs opacity-40'>
                  <AlertIcon className='mr-2 inline-flex size-3' />
                  {pricing.note}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
        <div className='mt-8'></div>
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    uid: 'fivem_configuration_plan_bronce',
    name: 'Bronce',
    price: '$40.50',
    period: 'mes',
    discount3: '$108 por 3 meses (Ahorra 10%)',
    discount6: '$202 por 6 meses (Ahorra 15%)',
    features: [
      'Disponibilidad semanal: hasta 12 horas',
      'Máximo de 3 tareas diarias',
      'Tiempo de respuesta: 48 a 72 horas',
      'Mantenimiento básico y corrección de bugs menores',
      'Ajustes de configuración simples',
      'Optimización ligera si es necesario',
    ],
    note: 'Este plan es ideal para mantenimientos básicos y ajustes menores.',
    recommended: false,
    color: [183, 129, 64], // Ámbar oscuro
    description:
      'Servicio básico de mantenimiento para servidores con baja demanda de cambios o correcciones.',
  },
  {
    uid: 'fivem_configuration_plan_plata',
    name: 'Plata',
    price: '$67',
    period: 'mes',
    discount3: '$175 por 3 meses (Ahorra 13%)',
    discount6: '$324 por 6 meses (Ahorra 20%)',
    features: [
      'Disponibilidad semanal: hasta 18 horas',
      'Máximo de 4 tareas diarias',
      'Tiempo de respuesta: hasta 48 horas',
      'Corrección de bugs menores y medios',
      'Mantenimiento general y ajustes de configuración',
      'Revisión de logs básica',
    ],
    note: 'Las correcciones y agregados deben ser de complejidad media-baja.',
    recommended: false,
    color: [156, 163, 175], // Gris plata
    description:
      'Ideal para servidores activos que requieren correcciones periódicas y contenido adicional básico.',
  },
  {
    uid: 'fivem_configuration_plan_oro',
    name: 'Oro',
    price: '$108',
    period: 'mes',
    discount3: '$283 por 3 meses (Ahorra 12%)',
    discount6: '$513 por 6 meses (Ahorra 21%)',
    features: [
      'Disponibilidad semanal: hasta 24 horas',
      'Máximo de 5 tareas diarias',
      'Tiempo de respuesta: 24 a 48 horas',
      'Corrección de bugs medios',
      'Integración de recursos open-source simples',
      'Revisión semanal de estabilidad',
      'Optimización avanzada del servidor',
    ],
    note: 'La reparación ilimitada se basa en horas disponibles dentro del plan.',
    recommended: true,
    color: [253, 224, 71], // Amarillo dorado
    description:
      'Para servidores con alta actividad que necesitan soporte constante, mejoras de rendimiento y contenido frecuente.',
  },
  {
    uid: 'fivem_configuration_plan_platino',
    name: 'Platino',
    price: '$162',
    period: 'mes',
    discount3: '$432 por 3 meses (Ahorra 11%)',
    discount6: '$783 por 6 meses (Ahorra 19%)',
    features: [
      'Disponibilidad semanal: hasta 30 horas',
      'Máximo de 6 tareas diarias',
      'Tiempo de respuesta: hasta 24 horas',
      'Corrección de bugs medios y complejos menore',
      'Integración de recursos open-source',
      'Incluye hasta 1 script sencillo',
      'Revisión completa semanal',
    ],
    note: 'El mantenimiento del servidor es continuo, pero el desarrollo de nuevas funciones sigue los tiempos del plan.',
    recommended: false,
    color: [71, 85, 105], // Slate oscuro
    description:
      'Pensado para proyectos avanzados que necesitan un servidor completamente funcional y atención técnica prioritaria.',
  },
  {
    uid: 'fivem_configuration_plan_diamante',
    name: 'Diamante',
    price: '$270',
    period: 'mes',
    discount3: '$675 por 3 meses (Ahorra 17%)',
    discount6: '$1215 por 6 meses (Ahorra 25%)',
    features: [
      'Disponibilidad semanal: hasta 36 horas',
      'Máximo de 8 tareas diarias',
      'Tiempo de respuesta: hasta 24 horas',
      'Corrección de bugs medios y complejos',
      'Integración de recursos avanzados',
      'Incluye hasta 2 scripts pequeños',
      'Asesoría en compatibilidad y estabilidad',
    ],
    note: 'La gestión integral incluye supervisión y ajustes constantes, pero no desarrollo de nuevas funcionalidades fuera del plan.',
    recommended: false,
    color: [59, 130, 246], // Azul brillante
    description:
      'Solución integral para servidores de alto tráfico con soporte intensivo, personalización avanzada y atención total.',
  },
  {
    uid: 'fivem_configuration_plan_personalizado',
    name: 'Personalizado',
    price: 'Personalizado',
    custom: true,
    discount3: 'Diseñado para proyectos con requerimientos fuera de los planes tradicionales.',
    discount6: 'Escalable y ajustado a tus prioridades y presupuesto disponible.',
    note: 'Contáctanos para construir un plan completamente adaptado a las necesidades específicas de tu servidor.',
    color: [99, 102, 241], // Indigo brillante
    description:
      '¿Tienes requisitos únicos? Este plan está diseñado para adaptarse completamente a lo que tu proyecto necesita.',
    features: [
      'Definición de horas de trabajo ajustadas a tu proyecto',
      'Soporte en horarios y canales preferenciales',
      'Actualizaciones según cronograma personalizado',
      'Integración de funcionalidades específicas solicitadas',
      'Mantenimiento, desarrollo u optimización total según tus requerimientos',
      'Revisión técnica y asesoría mensual incluida',
    ],
  },
];
