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
        <div className='mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
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

                <div className='my-4'></div>

                <Button
                  asChild
                  variant={
                    pricing.custom
                      ? 'default'
                      : pricing.name === 'Mantenimiento'
                        ? 'outline'
                        : 'primary'
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
    uid: 'fivem_configuration_plan_mantenimiento',
    name: 'Mantenimiento',
    price: '$199',
    period: 'mes',
    features: [
      'Disponibilidad semanal: 10-12 horas',
      'Tiempo de respuesta: 24-48 horas',
      'Revisión semanal de estabilidad y logs',
      'Resolución de bugs menores y medios',
      'Hasta 2 scripts open-source añadidos al mes',
      'Mapeado ligero y ajustes de items, jobs y economía',
      'Gestión de tareas en Trello con prioridades',
    ],
    note: 'Retainer pensado para servidores ya en producción. No cubre configuración desde cero, migraciones completas, MLO grandes ni packs de ropa custom.',
    recommended: false,
    color: [156, 163, 175], // Gris
    description:
      'Programador de cabecera para servidores FiveM ya abiertos que necesitan mantenimiento continuo, bugfixes y ajustes puntuales.',
  },
  {
    uid: 'fivem_configuration_plan_desarrollo',
    name: 'Desarrollo',
    price: '$349',
    period: 'mes',
    features: [
      'Disponibilidad semanal: 18-22 horas',
      'Tiempo de respuesta: hasta 24 horas',
      'Hasta 2 scripts medios personalizados al mes',
      'Integración de NUI (HUD, menús simples)',
      'Compatibilidad entre scripts (bridge ESX ↔ QBCore)',
      'Mapeado mediano y balanceado activo de economía',
      'Revisión completa semanal con changelog',
    ],
    note: 'Ideal para servidores con roadmap activo. MLOs grandes y packs de ropa / EUP custom se cotizan aparte.',
    recommended: true,
    color: [93, 69, 253], // Primary
    description:
      'Mantenimiento más desarrollo continuo de nuevas mecánicas para servidores que están creciendo y sumando funcionalidades mes a mes.',
  },
  {
    uid: 'fivem_configuration_plan_integral',
    name: 'Integral',
    price: '$599',
    period: 'mes',
    features: [
      'Disponibilidad semanal: 28-36 horas',
      'Tiempo de respuesta: <12h crítico, <24h normal',
      'Desarrollo de scripts complejos con NUI propia',
      'Configuración de VPS, hardening y anticheat',
      'Integración de packs de ropa y vehículos',
      'Ajuste de interfaces y branding (logos, colores)',
      'Reunión semanal de alineación',
    ],
    note: 'Para servidores de alto tráfico o proyectos armando el servidor por fases a lo largo de varios meses. El armado completo a plazo fijo va como Plan Personalizado.',
    recommended: false,
    color: [253, 224, 71], // Dorado
    description:
      'Soporte intensivo y armado por fases para servidores grandes o proyectos que están construyendo su servidor a lo largo de varios meses.',
  },
  {
    uid: 'fivem_configuration_plan_personalizado',
    name: 'Personalizado',
    price: 'Personalizado',
    custom: true,
    note: 'Contáctanos para construir un plan completamente adaptado a las necesidades específicas de tu servidor.',
    color: [99, 102, 241], // Indigo
    description:
      '¿Tienes requisitos únicos? Armado desde cero a plazo fijo, SLAs especiales o combinaciones fuera de los planes estándar.',
    features: [
      'Definición de horas ajustadas a tu proyecto',
      'Soporte en horarios y canales preferenciales',
      'Cronograma y presupuesto a medida',
      'Integración de funcionalidades específicas solicitadas',
      'Mantenimiento, desarrollo u optimización total según requerimientos',
      'Revisión técnica y asesoría mensual incluida',
      'Escalable según evolucione tu proyecto',
    ],
  },
];
