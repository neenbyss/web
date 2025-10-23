import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DesignIcon } from '@/icons/design';
import { FileZipIcon } from '@/icons/file-zip';
import { WrenchIcon } from '@/icons/wrench';
import { serviceCategories } from '@/utils/data/services';

export function Intro() {
  const color = serviceCategories.find((x) => x.uid === 'fivem')!.color;

  return (
    <section className='container-screen-2xl py-20'>
      <h2 className='text-foreground mb-4 block text-xl font-medium sm:text-4xl'>
        ¿Qué Ofrecemos?
      </h2>
      <p className='max-w-2xl'>
        Comprendiendo la diferencia entre interfaz de usuario (UI) y experiencia de usuario (UX)
      </p>

      <div className='mt-12 grid gap-6 lg:grid-cols-3'>
        {introServiceCards.map(({ icon: Icon, title, description }, index) => (
          <Card
            key={index}
            className='border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
          >
            <CardHeader>
              <div
                className='mb-4 flex size-8 items-center justify-center rounded-lg md:size-12'
                style={{
                  backgroundColor: `rgba(${color.join(',')}, 0.15)`,
                  color: `rgb(${color.join(',')})`,
                }}
              >
                <Icon className='size-5' />
              </div>
              <CardTitle className='text-base sm:text-xl'>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-4'>{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

const introServiceCards = [
  {
    icon: FileZipIcon,
    title: 'Desarrollo y Configuración Integral',
    description:
      'Creamos y personalizamos scripts desde cero, adaptamos sistemas existentes (ESX, QBcore y más) y garantizamos la compatibilidad y rendimiento óptimo del servidor.',
  },
  {
    icon: DesignIcon,
    title: 'Rediseño Exclusivo de Interfaces',
    description:
      'Renovamos completamente la apariencia de tu servidor con diseños únicos, funcionales y atractivos que mejoran la experiencia de usuario y mantienen a los jugadores comprometidos.',
  },
  {
    icon: WrenchIcon,
    title: 'Soporte Continuo y Personalizado',
    description:
      'Ofrecemos soporte técnico especializado adaptado a tus objetivos específicos, con optimización del rendimiento y mantenimiento constante para tu servidor.',
  },
];
