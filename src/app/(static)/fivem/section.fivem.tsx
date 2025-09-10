import SpotlightCard from '@/components/ui/spotlightcard';
import { DesignIcon } from '@/icons/design';
import { GraphIcon } from '@/icons/graph';
import { SettingsIcon } from '@/icons/settings';
import { SupportIcon } from '@/icons/support';
import { cn } from '@/lib/utils';
import Image from 'next/image';
export default function FiveM() {
  return (
    <section className='grid grid-cols-2 justify-between'>
      <div
        className={cn(
          'overflow-hidden bg-cover bg-center',
          "bg-[url('https://blog.fivemods.io/storage/2024/01/cover-1-1300x650.webp')]",
        )}
      />
      <div className='max-w-5xl px-10 py-10'>
        <h2 className='mb-5 text-4xl font-medium text-balance'> ¿Que Podemos Hacer por tí? </h2>
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <SpotlightCard color='rbga()' className='rounded-lg border-none bg-orange-500/10 p-5'>
            <span className='text-foreground mb-2 flex items-center gap-2 text-base font-medium'>
              <div className='flex size-6 items-center justify-center rounded bg-orange-500/30 text-orange-500'>
                <SettingsIcon />
              </div>
              Configuración de servidores ESX & QBCORE
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quod suscipit
              assumenda quisquam sunt id itaque nisi, magni rerum, recusandae dolorum quas
              consectetur saepe soluta at doloremque non quos dolores!
            </p>
          </SpotlightCard>
          <SpotlightCard className='rounded-lg border-none bg-orange-500/10 p-5'>
            <span className='text-foreground mb-2 flex items-center gap-2 text-base font-medium'>
              <div className='flex size-6 items-center justify-center rounded bg-orange-500/30 text-orange-500'>
                <SupportIcon />
              </div>
              Mantenimiento y Soporte Continuo
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quod suscipit
              assumenda quisquam sunt id itaque nisi, magni rerum, recusandae dolorum quas
              consectetur saepe soluta at doloremque non quos dolores!
            </p>
          </SpotlightCard>
          <SpotlightCard className='rounded-lg border-none bg-orange-500/10 p-5'>
            <span className='text-foreground mb-2 flex items-center gap-2 text-base font-medium'>
              <div className='flex size-6 items-center justify-center rounded bg-orange-500/30 text-orange-500'>
                <DesignIcon />
              </div>
              Rediseño de interfaces de scripts
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quod suscipit
              assumenda quisquam sunt id itaque nisi, magni rerum, recusandae dolorum quas
              consectetur saepe soluta at doloremque non quos dolores!
            </p>
          </SpotlightCard>
          <SpotlightCard className='rounded-lg border-none bg-orange-500/10 p-5'>
            <span className='text-foreground mb-2 flex items-center gap-2 text-base font-medium'>
              <div className='flex size-6 items-center justify-center rounded bg-orange-500/30 text-orange-500'>
                <GraphIcon />
              </div>
              Optmización y Escalabilidad
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quod suscipit
              assumenda quisquam sunt id itaque nisi, magni rerum, recusandae dolorum quas
              consectetur saepe soluta at doloremque non quos dolores!
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
