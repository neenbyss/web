import { Button } from '@/components/ui/button';
import { Fade } from '@/components/ui/fade';
import { PuzzleHeartIcon } from '@/components/ui/puzzle-heart';
import SpotlightCard from '@/components/ui/spotlightcard';
import { CompassIcon } from '@/icons/compass';
import { CpuIcon } from '@/icons/cpu';
import { HandHeartIcon } from '@/icons/hand-heart';
import { ReceiptIcon } from '@/icons/receipt';
import { ShieldCheckIcon } from '@/icons/shield-check';

export function Valores() {
  return (
    <div>
      <div className='container-screen-2xl py-56'>
        <Fade
          as='h2'
          direction='down'
          delay={0.15}
          className='mx-auto mb-4 max-w-3xl text-center text-3xl font-medium text-balance capitalize sm:text-6xl'
        >
          Nuestros Valores como desarrolladores
        </Fade>
        <Fade as='p' direction='down' delay={0.2} className='text-center'>
          Más allá de la tecnología, lo que nos distingue son nuestros valores y el compromiso con
          la excelencia en cada proyecto que emprendemos.
        </Fade>

        <div className='mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {valoresNeenbyss.map(({ title, description, icon, color }, i) => {
            const colored = color.join(', ');
            return (
              <Fade key={i} direction='down' delay={i === 0 ? 0.4 : 0.4 + i * 0.06}>
                <SpotlightCard
                  className='h-full border p-5'
                  spotlightColor={`rgba(${colored}, .4)`}
                  style={{
                    borderColor: `rgba(${colored})`,
                    backgroundColor: `rgba(${colored}, .1)`,
                  }}
                >
                  <div
                    className='mb-3 flex size-10 flex-col items-center justify-center rounded-lg border'
                    style={{
                      borderColor: `rgba(${colored})`,
                      backgroundColor: `rgba(${colored}, .4)`,
                    }}
                  >
                    {icon}
                  </div>
                  <h3 className='mb-1.5 text-base font-medium capitalize'>{title}</h3>
                  <p>{description}</p>
                </SpotlightCard>
              </Fade>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const valoresNeenbyss = [
  {
    title: 'Compromiso Profesional',
    description:
      'Asumimos cada proyecto con seriedad y responsabilidad, cumpliendo con los plazos acordados y manteniendo siempre altos estándares técnicos y éticos.',
    icon: <ShieldCheckIcon />,
    color: [93, 69, 253],
  },
  {
    title: 'Soluciones a Medida',
    description:
      'Cada cliente es único. Nos tomamos el tiempo de entender tu visión para desarrollar soluciones adaptadas a tus necesidades reales y no paquetes genéricos.',
    icon: <PuzzleHeartIcon />,
    color: [151, 71, 255],
  },
  {
    title: 'Acompañamiento Continuo',
    description:
      'No solo desarrollamos, también te guiamos. Desde la idea hasta el producto final, estamos contigo en cada paso para que nunca te sientas perdido en el proceso.',
    icon: <CompassIcon />,
    color: [242, 78, 30],
  },
  {
    title: 'Transparencia Comercial',
    description:
      'Claridad en precios, procesos y entregables. Evitamos sorpresas innecesarias, manteniéndote siempre informado y en control.',
    icon: <ReceiptIcon />,
    color: [245, 116, 133],
  },
  {
    title: 'Orientación al Cliente',
    description:
      'Nos enfocamos en construir relaciones a largo plazo, entendiendo tus metas como si fueran nuestras y aportando valor en cada paso del camino.',
    icon: <HandHeartIcon />,
    color: [62, 232, 109],
  },
  {
    title: 'Adaptabilidad Tecnológica',
    description:
      'El mundo cambia rápido. Nos adaptamos a nuevas tecnologías y desafíos para ofrecerte siempre soluciones actuales, eficientes y sostenibles.',
    icon: <CpuIcon />,
    color: [109, 123, 183],
  },
];
