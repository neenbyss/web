import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SpotlightCard from '@/components/ui/spotlightcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertIcon } from '@/icons/alert';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckIcon } from '@/icons/check';
import { CheckTaskIcon } from '@/icons/check-task';
import { DesignIcon } from '@/icons/design';
import { DiscordIcon } from '@/icons/discord';
import { FiveMIcon } from '@/icons/fivem';
import { WebsiteIcon } from '@/icons/website';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PlansPrices() {
  return (
    <section className='border-y'>
      <Tabs defaultValue='production'>
        <TabsList className='bg-content w-full justify-center'>
          <TabsTrigger value='production'>
            <h2 className='text-foreground text-lg font-medium'>Planes En Producción</h2>
          </TabsTrigger>
          <TabsTrigger value='dev'>
            <h2 className='text-foreground text-lg font-medium'>Pack Para Desarrollo & Kits</h2>
          </TabsTrigger>
          <TabsTrigger value='packs'>
            <h2 className='text-foreground text-lg font-medium'>Paquetes Completos</h2>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='production'>
          <PlansProduction />
        </TabsContent>
        <TabsContent value='dev'>
          <PlansDev />
        </TabsContent>
        <TabsContent value='packs'>
          <Packs />
        </TabsContent>
      </Tabs>
    </section>
  );
}

const plans = {
  monthly: [
    {
      uid: 'basico',
      name: 'Básico',
      description: 'Mantenimiento ligero para servidores estables',
      price: 37,
      hours: '28h/mes',
      recommended: false,
      custom: false,
      discount3: 'Ahorra 5% contratando 3 meses',
      discount6: 'Ahorra 10% contratando 6 meses',
      note: 'Incluye soporte L-V y urgencias fin de semana',
      features: [
        '7 horas semanales de soporte',
        'Corrección de bugs simples',
        'Instalación de scripts básicos',
        'Revisión de logs y consola',
        'Soporte L-V + urgencias weekend',
      ],
    },
    {
      uid: 'plus',
      name: 'Plus',
      description: 'Soporte activo con cambios regulares',
      price: 75,
      hours: '56h/mes',
      recommended: true,
      custom: false,
      discount3: 'Ahorra 7% contratando 3 meses',
      discount6: 'Ahorra 12% contratando 6 meses',
      note: 'Recomendado para servidores con actualizaciones frecuentes',
      features: [
        '14 horas semanales de soporte',
        'Instalación de scripts avanzados',
        'Prioridad en el soporte',
        'Revisión proactiva del servidor',
        'Soporte L-V + urgencias weekend',
      ],
    },
  ],

  advanced: [
    {
      uid: 'reparacion',
      name: 'Reparación',
      description: 'Solución de errores y problemas técnicos',
      price: 115,
      hours: '84h/mes',
      recommended: false,
      custom: false,
      note: 'Especializado en problemas críticos y rendimiento',
      features: [
        '21 horas semanales de trabajo',
        'Corrección de errores críticos',
        'Integración entre sistemas',
        'Optimización de rendimiento',
        'Soporte técnico especializado',
      ],
    },
    {
      uid: 'completo',
      name: 'Completo',
      description: 'Desarrollo integral para expansión',
      price: 165,
      hours: '112h/mes',
      recommended: true,
      custom: false,
      note: 'Ideal para proyectos en crecimiento continuo',
      features: [
        '28 horas semanales de desarrollo',
        'Configuración masiva de contenido',
        'Integración completa de sistemas',
        'Revisiones semanales de progreso',
        'Optimización continua',
      ],
    },
    {
      uid: 'maxima',
      name: 'Máxima',
      description: 'Aceleración total en tiempo récord',
      price: 250,
      hours: '160h/mes',
      recommended: false,
      custom: false,
      note: 'Incluye soporte premium 24/7 y entregas rápidas',
      features: [
        '40 horas semanales dedicadas',
        'Montaje completo en 30 días',
        'Prioridad absoluta en tareas',
        'Adaptaciones personalizadas',
        'Soporte premium 24/7',
      ],
    },
  ],

  kits: [
    {
      icon: DiscordIcon,
      name: 'Complemento de Discord',
      description:
        'Servidor Discord completo con bot personalizado, canales organizados y sistema de tickets',
      price: 37,
    },
    {
      icon: WebsiteIcon,
      name: 'Complemento Web',
      description: 'Página web informativa con diseño personalizado + 1 mes de hosting gratuito',
      price: 27,
    },
    {
      icon: FiveMIcon,
      name: 'Base FiveM',
      description: 'Servidor preconfigurado con scripts esenciales y contenido base',
      price: 77,
    },
    {
      icon: DesignIcon,
      name: 'Diseño Propio',
      description: 'Ropa y vehículos personalizados con branding del servidor',
      price: 27,
    },
  ],

  bundles: [
    {
      uid: 'lanzamiento',
      name: 'Pack Lanzamiento',
      description: 'Discord + Web + Hosting perfectamente integrados para el lanzamiento',
      price: 95,
      original: 101,
      save: 6,
      custom: false,
      features: [
        'Discord completo',
        'Kit Web + hosting',
        'Integración visual',
        'Listo para lanzar',
      ],
    },
    {
      uid: 'esx-full',
      name: 'Pack ESX Full',
      description: 'Servidor ESX + Identidad + Discord para una experiencia completa',
      price: 157,
      original: 177,
      save: 20,
      recommended: true,
      custom: false,
      features: ['ESX Ready completo', 'Kit Identidad', 'Kit Discord', 'Configuración integrada'],
    },
    {
      uid: 'todo-en-uno',
      name: 'Pack Todo en Uno',
      description: 'La solución más completa: Discord + Web + ESX + Identidad',
      price: 287,
      original: 318,
      save: 31,
      custom: false,
      features: [
        'Todos los kits incluidos',
        'Configuración completa',
        'Soporte de lanzamiento',
        'Máximo ahorro',
      ],
    },
  ],
};

const PlansProduction = () => {
  return (
    <div>
      <div className='container-screen-2xl py-10'>
        <h3 className='mb-1.5 text-center text-4xl'> Planes en Producción </h3>
        <p className='text-center'> Para servidores estables en funcionamiento </p>
      </div>
      <div className='flex items-stretch gap-4'>
        <div
          className={cn(
            'w-full overflow-hidden rounded-tr-4xl bg-cover bg-center',
            "bg-[url('https://blog.fivemods.io/storage/2024/01/cover-1-1300x650.webp')]",
          )}
        />
        <div className='grid w-full max-w-3xl shrink-0 grid-cols-2 gap-4 px-4 py-10'>
          {plans.monthly.map((pricing, i) => {
            return (
              <SpotlightCard
                key={i}
                spotlightColor={pricing.recommended ? 'rgba(93,68,253,.4)' : undefined}
                className={cn(
                  pricing.recommended
                    ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
                    : 'bg-background',
                  pricing.custom && 'bg-foreground/[.05]',

                  'relative flex w-full flex-col p-6',
                )}
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
                  ${pricing.price}{' '}
                  {!pricing.custom && <span className='text-sm font-light opacity-40'> /mes </span>}
                </span>

                <div className='my-4 flex flex-col gap-2'>
                  <span className='text-xs opacity-50'>{pricing.discount3}</span>
                  <span className='text-xs opacity-50'>{pricing.discount6}</span>
                </div>

                <Button
                  asChild
                  variant={!pricing.recommended ? 'outline' : 'primary'}
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
        <div
          className={cn(
            'w-full overflow-hidden rounded-tl-4xl bg-cover bg-center',
            "bg-[url('https://blog.fivemods.io/storage/2024/01/cover-1-1300x650.webp')]",
          )}
        />
      </div>
    </div>
  );
};

const PlansDev = () => {
  return (
    <div className='container-screen-2xl py-10'>
      <div>
        <h3 className='mb-1.5 text-center text-4xl'> Planes para Desarrollo </h3>
        <p className='text-center'> Para servidores nuevos o con problemas técnicos </p>

        <div className='mt-6 flex flex-wrap justify-center gap-4'>
          {plans.advanced.map((pricing, i) => {
            return (
              <SpotlightCard
                key={i}
                spotlightColor={pricing.recommended ? 'rgba(93,68,253,.4)' : undefined}
                className={cn(
                  pricing.recommended
                    ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
                    : 'bg-background',
                  pricing.custom && 'bg-foreground/[.05]',

                  'relative flex w-full max-w-sm flex-col p-6',
                )}
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
                  ${pricing.price}{' '}
                  {!pricing.custom && <span className='text-sm font-light opacity-40'> /mes </span>}
                </span>

                <Button
                  asChild
                  variant={!pricing.recommended ? 'outline' : 'primary'}
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

        <div className='mt-4 grid grid-cols-4 gap-2'>
          {plans.kits.map(({ description, icon: Icon, name, price }, i) => {
            return (
              <SpotlightCard
                spotlightColor={'rgba(255, 137, 4, .4)'}
                key={i}
                className='border-none bg-transparent p-4'
              >
                <h4 className='flex items-center gap-2'>
                  <div className='flex size-8 shrink-0 flex-col items-center justify-center rounded-md border border-orange-600 bg-orange-600/20'>
                    <Icon className='size-5' />
                  </div>
                  <span className='block w-full text-lg font-medium text-orange-400'>{name}</span>
                  <span className='text-xl'>{price}$</span>
                </h4>
                <p className='mt-2 text-balance'>{description}</p>
              </SpotlightCard>
            );
          })}
        </div>
        <span className='block text-center text-sm opacity-40'> Complementos </span>
      </div>
    </div>
  );
};

const Packs = () => {
  return (
    <div className='container-screen-2xl py-10'>
      <h3 className='mb-1.5 text-center text-4xl'> Paquetes Completos </h3>
      <p className='text-center'> Soluciones completas con descuentos especiales</p>
      <div className='mt-6 grid grid-cols-2 gap-4'>
        {plans.bundles.map((pricing, i) => {
          return (
            <SpotlightCard
              key={i}
              className={cn(
                pricing.recommended
                  ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
                  : 'bg-background',
                pricing.custom && 'bg-foreground/[.05]',
                i === 2 && 'col-span-2',

                'relative flex w-full flex-col p-6',
              )}
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
                ${pricing.price}{' '}
                {!pricing.custom && <span className='text-sm font-light opacity-40'> /mes </span>}
              </span>

              <Button
                asChild
                variant={!pricing.recommended ? 'outline' : 'primary'}
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
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};
