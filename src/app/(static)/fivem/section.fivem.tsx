import SpotlightCard from '@/components/ui/spotlightcard';
import { DesignIcon } from '@/icons/design';
import { GraphIcon } from '@/icons/graph';
import { SettingsIcon } from '@/icons/settings';
import { SupportIcon } from '@/icons/support';
import { cn } from '@/lib/utils';

const info = [
  {
    icon: <SettingsIcon />,
    title: 'Configuración de servidores ESX y QBCore',
    description:
      'Instalamos y personalizamos frameworks completos, dejando tu servidor listo para recibir jugadores. Ajustamos permisos, economías, HUDs y scripts esenciales para que funcione sin errores desde el primer día.',
  },
  {
    icon: <SupportIcon />,
    title: 'Mantenimiento y soporte continuo',
    description:
      'Detectamos y resolvemos fallos antes de que afecten a tus jugadores. Actualizamos frameworks, limpiamos scripts obsoletos y optimizamos recursos para garantizar estabilidad y uptime constante.',
  },
  {
    icon: <DesignIcon />,
    title: 'Rediseño visual y funcional de scripts',
    description:
      'Mejoramos la apariencia y la usabilidad de tus menús, HUDs y notificaciones. Transformamos scripts básicos en sistemas visualmente coherentes y modernos sin alterar su lógica interna.',
  },
  {
    icon: <GraphIcon />,
    title: 'Optimización y escalabilidad',
    description:
      'Reducimos el consumo de CPU, RAM y red sin sacrificar rendimiento. Preparar tu servidor para crecer, alojar más jugadores y mantener tiempos de carga mínimos.',
  },
];

export default function FiveM() {
  return (
    <section className='grid grid-cols-2 justify-between'>
      <div
        className={cn(
          'overflow-hidden bg-cover bg-center',
          "bg-[url('https://blog.fivemods.io/storage/2024/01/cover-1-1300x650.webp')]",
        )}
      />
      <div className='max-w-5xl px-10 py-20'>
        <h2 className='mb-8 text-4xl font-medium text-balance'> ¿Que Podemos Hacer por tí? </h2>
        <div className='grid grid-cols-1 gap-3 xl:grid-cols-2'>
          {info.map(({ title, description, icon }, i) => {
            return (
              <SpotlightCard
                key={i}
                spotlightColor={`color-mix(in oklab, var(--color-orange-500) 30%, transparent)`}
                className='rounded-lg border-none bg-orange-500/10 p-5'
              >
                <span className='text-foreground mb-2 flex items-center gap-2 text-base font-medium'>
                  <div className='flex size-7 items-center justify-center rounded bg-orange-500/30 text-orange-500'>
                    {icon}
                  </div>
                  {title}
                </span>
                <p>{description}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
