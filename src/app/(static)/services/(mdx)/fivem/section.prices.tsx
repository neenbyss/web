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
          Planes de Mantenimiento y Soporte para Servidores FiveM
        </h2>
        <p className='max-w-2xl'>
          Elige un plan mensual con horas de trabajo garantizadas, tiempos de respuesta definidos y
          mantenimiento continuo. Ideal para servidores en producción que necesitan un desarrollador
          FiveM dedicado sin contratar a tiempo completo.
        </p>
        <div className='mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {pricingPlans.map((pricing, i) => {
            return (
              <SpotlightCard
                key={i}
                className={cn(
                  pricing.recommended
                    ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
                    : 'bg-background',
                  pricing.custom &&
                    'from-primary/10 to-foreground/[.05] bg-gradient-to-br md:col-span-2 lg:col-span-3 lg:p-10',
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

                {pricing.custom ? (
                  <div className='flex flex-col lg:flex-row lg:items-stretch lg:gap-10'>
                    <div className='flex flex-col justify-center lg:w-[38%] lg:shrink-0'>
                      <span className='text-primary mb-2 text-xs font-medium tracking-widest uppercase'>
                        A medida
                      </span>
                      <h3 className='mb-3 text-2xl font-medium sm:text-3xl'>Plan {pricing.name}</h3>
                      <p className='text-foreground-2 mb-6'>{pricing.description}</p>
                      <span className='text-foreground mb-6 block text-2xl font-medium italic opacity-80 sm:text-3xl'>
                        {pricing.price}
                      </span>
                      <Button
                        asChild
                        variant='primary'
                        className='w-full sm:w-fit sm:px-8'
                        size='lg'
                      >
                        <Link href={`/contact?service=${pricing.uid}`}>
                          Cotizar mi Proyecto
                          <ArrowRightIcon />
                        </Link>
                      </Button>
                    </div>

                    <div className='border-border/30 mt-8 flex flex-col justify-center lg:mt-0 lg:flex-1 lg:border-l lg:pl-10'>
                      <ul className='grid gap-3 sm:grid-cols-2'>
                        {pricing.features?.map((x, j) => {
                          return (
                            <li key={`${i}-${j}`} className='flex items-start gap-2.5'>
                              <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                              <span>{x}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <p className='mt-6 text-xs opacity-50'>
                        <AlertIcon className='mr-2 inline-flex size-3' />
                        {pricing.note}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className='mb-1 text-base font-medium sm:text-2xl'>
                      {' '}
                      Plan {pricing.name}{' '}
                    </h3>
                    <p className='mb-4'> {pricing.description} </p>
                    <span className='text-foreground my-2 block text-3xl font-medium'>
                      {' '}
                      {pricing.price} <span className='text-sm font-light opacity-40'> /mes </span>
                    </span>

                    <div className='my-4'></div>

                    <Button
                      asChild
                      variant={pricing.name === 'Mantenimiento' ? 'outline' : 'primary'}
                      className='w-full'
                    >
                      <Link href={`/contact?service=${pricing.uid}`}>
                        Contratar Plan
                        <ArrowRightIcon />
                      </Link>
                    </Button>

                    <Separator className='my-4' />

                    <ul className='flex grow flex-col gap-4'>
                      {pricing.features?.map((x, j) => {
                        return (
                          <li key={`${i}-${j}`} className='flex items-center gap-2'>
                            <CheckTaskIcon className='text-primary shrink-0' /> {x}
                          </li>
                        );
                      })}
                    </ul>
                    <Separator className='my-4' />
                    <p className='text-xs opacity-40'>
                      <AlertIcon className='mr-2 inline-flex size-3' />
                      {pricing.note}
                    </p>
                  </>
                )}
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
    uid: 'fivem_configuration_plan_mantenimiento',
    name: 'Mantenimiento',
    price: '$199',
    period: 'mes',
    features: [
      'Disponibilidad semanal: 10-12 horas',
      'Tiempo de respuesta: 24-48 horas',
      'Revisión semanal de estabilidad y logs',
      'Resolución de bugs menores y medios',
      'Instalación y configuración de scripts open-source (hasta 2/mes)',
      'Ajustes de items, jobs, coordenadas y economía',
      'Gestión de tareas en Trello con prioridades',
    ],
    note: 'Retainer para servidores ya en producción. La creación de scripts desde cero, MLO grandes, packs de ropa custom, migraciones completas y armado desde cero se cotizan aparte como proyecto.',
    recommended: false,
    color: [156, 163, 175], // Gris
    description:
      'Programador de cabecera para servidores en producción que necesitan bugfixes, configuración y ajustes continuos.',
  },
  {
    uid: 'fivem_configuration_plan_desarrollo',
    name: 'Desarrollo',
    price: '$349',
    period: 'mes',
    features: [
      'Disponibilidad semanal: 18-22 horas',
      'Tiempo de respuesta: hasta 24 horas',
      'Revisión semanal y corrección de bugs medios',
      'Instalación y ajuste de scripts open-source complejos',
      'Compatibilidad entre scripts (bridge ESX ↔ QBCore)',
      'Personalización visual de interfaces ya instaladas',
      'Balanceado activo de economía, items y jobs',
    ],
    note: 'Enfocado en integración y ajuste continuo. La creación de scripts nuevos a medida, MLOs grandes y packs de ropa custom se cotizan aparte con presupuesto fijo por proyecto.',
    recommended: true,
    color: [93, 69, 253], // Primary
    description:
      'Mantenimiento ampliado con más horas para integraciones, personalización visual y balanceo continuo de servidores en crecimiento.',
  },
  {
    uid: 'fivem_configuration_plan_integral',
    name: 'Integral',
    price: '$599',
    period: 'mes',
    features: [
      'Disponibilidad semanal: 28-36 horas',
      'Tiempo de respuesta: <12h crítico, <24h normal',
      'Configuración de VPS, hardening y anticheat',
      'Instalación de packs de ropa y vehículos',
      'Ajuste de interfaces y branding (colores, logos, HUD existentes)',
      'Adaptación entre scripts y resolución de conflictos',
      'Asesoría continua de arquitectura y estabilidad',
    ],
    note: 'Soporte intensivo, infraestructura y armado por fases. El desarrollo de scripts nuevos a medida, MLO completos y proyectos llave en mano se cotizan como Plan Personalizado o proyecto aparte.',
    recommended: false,
    color: [253, 224, 71], // Dorado
    description:
      'Soporte intensivo, configuración de infraestructura y armado por fases para servidores grandes o en proceso de escalado.',
  },
  {
    uid: 'fivem_configuration_plan_personalizado',
    name: 'Personalizado',
    price: 'Personalizado',
    custom: true,
    note: 'Contáctanos para construir un plan completamente adaptado a las necesidades específicas de tu servidor.',
    color: [99, 102, 241], // Indigo
    description:
      'Armado desde cero a plazo fijo, desarrollo de scripts a medida, SLAs especiales o combinaciones fuera de los planes mensuales.',
    features: [
      'Definición de horas ajustadas a tu proyecto',
      'Desarrollo de scripts a medida con scope cerrado',
      'Soporte en horarios y canales preferenciales',
      'Cronograma y presupuesto a medida',
      'Integración de funcionalidades específicas solicitadas',
      'Mantenimiento, desarrollo u optimización total según requerimientos',
      'Escalable según evolucione el proyecto',
    ],
  },
];
