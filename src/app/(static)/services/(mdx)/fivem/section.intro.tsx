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
        ¿Qué Ofrecemos para tu Servidor FiveM?
      </h2>
      <p className='max-w-2xl'>
        Servicios integrales para servidores FiveM: scripts en Lua a medida, packs de ropa y EUP,
        MLO e interiores, vehículos custom, interfaces NUI, migración ESX ↔ QBCore, optimización y
        soporte técnico continuo para tu comunidad.
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
    title: 'Scripts & Mecánicas a Medida',
    description:
      'Desarrollamos scripts FiveM personalizados en Lua para ESX y QBCore: economía, inventario, trabajos, vehículos, policial, EMS, MDT y cualquier mecánica única. Código propio, optimizado y con NUI integrada cuando la mecánica lo requiere.',
  },
  {
    icon: DesignIcon,
    title: 'Packs de Ropa, MLO y Vehículos Custom',
    description:
      'Contenido visual que hace único a tu servidor: packs de ropa y EUP stream-ready, MLO e interiores con Codewalker, vehículos custom con handling y liveries, e interfaces NUI a medida (pause menu, HUD, phone, inventario).',
  },
  {
    icon: WrenchIcon,
    title: 'Configuración, Migración y Soporte',
    description:
      'Configuramos tu servidor FiveM desde cero, migramos entre ESX y QBCore con bridge propio, optimizamos rendimiento y antidetect, y ofrecemos planes mensuales de soporte con horas garantizadas y tiempos de respuesta definidos.',
  },
];
