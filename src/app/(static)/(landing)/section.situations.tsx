import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fade } from '@/components/ui/fade';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';

const situations = [
  {
    title: 'Quiero crear mi servidor',
    description:
      'Te ayudamos a pasar de la idea a un servidor jugable: base, configuración inicial, sistemas esenciales y pruebas antes de abrir a tu comunidad.',
    cta: 'Cotizar armado',
    href: '/services/fivem/crear-servidor',
  },
  {
    title: 'Mi servidor tiene errores o lag',
    description:
      'Diagnosticamos crashes, errores de scripts e incompatibilidades, y optimizamos el rendimiento sin improvisar sobre tu servidor en producción.',
    cta: 'Pedir diagnóstico',
    href: '/services/fivem/reparar-optimizar',
  },
  {
    title: 'Quiero una mecánica, sistema o diseño propio',
    description:
      'Desarrollamos scripts a medida, economías, trabajos e interfaces NUI con la identidad de tu servidor para que no parezca una plantilla más.',
    cta: 'Cotizar script o diseño',
    href: '/contact?service=fivem_scripts',
  },
];

export function Situations() {
  return (
    <section className='container-screen-2xl py-20 sm:py-28'>
      <Fade as='h2' delay={0.2} className='mb-4 text-3xl font-medium text-pretty sm:text-5xl'>
        ¿En qué situación estás?
      </Fade>
      <Fade as='p' delay={0.4} className='max-w-2xl text-pretty'>
        Trabajamos primero sobre tu problema y después sobre la tecnología. Elige tu caso y te
        orientamos sobre alcance, plazo y siguiente paso.
      </Fade>

      <div className='mt-12 grid gap-6 md:grid-cols-3'>
        {situations.map(({ title, description, cta, href }) => (
          <Link key={title} href={href} className='group block h-full'>
            <Card className='flex h-full flex-col border-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
              <CardHeader>
                <div className='bg-primary/15 text-primary mb-4 flex size-8 items-center justify-center rounded-lg md:size-12'>
                  <CheckTaskIcon className='size-5' />
                </div>
                <CardTitle className='group-hover:text-primary text-base transition-colors duration-300 sm:text-xl'>
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex grow flex-col'>
                <p className='text-muted-foreground grow text-pretty'>{description}</p>
                <span className='text-primary/70 group-hover:text-primary mt-6 flex items-center gap-2 text-sm transition-colors'>
                  {cta} <ArrowRightIcon className='size-4' />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
