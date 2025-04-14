'use client';

import { Button } from '@/components/ui/button';
import { Fade } from '@/components/ui/fade';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ArrowRightIcon } from '@/icons/arrow-right';

import { cn } from '@/lib/utils';

const serviceCategories = [
  {
    id: 'equipo-dedicado',
    title: 'Equipo dedicado',
    slug: 'equipo-dedicado',
  },
  {
    id: 'desarrollo-custom',
    title: 'Desarrollo de custom software',
    slug: 'desarrollo-custom',
  },
  {
    id: 'consultoria',
    title: 'Consultoría y asistencia informática',
    slug: 'consultoria',
  },
  {
    id: 'transformacion',
    title: 'Transformación digital',
    slug: 'transformacion-digital',
  },
  {
    id: 'fivem',
    title: 'Scripts & FiveM',
    slug: 'scripts-fivem',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    slug: 'ecommerce',
  },
];

const serviceDetails = {
  'equipo-dedicado': [
    {
      title: 'Desarrolladores de front-end',
      description:
        'Amplíe su equipo de IT con nuestros cualificados desarrolladores front-end, que se mantienen al día de las últimas tendencias tecnológicas.',
      slug: 'desarrolladores-frontend',
    },
    {
      title: 'Desarrolladores de back-end',
      description:
        'Reunimos a expertos en back-end de primera categoría con profundos conocimientos del proceso de desarrollo del lado del servidor.',
      slug: 'desarrolladores-backend',
    },
    {
      title: 'Desarrolladores full-stack',
      description:
        'Los desarrolladores que lo hacen todo: desde establecer un servidor sólido hasta crear interfaces de usuario intuitivas.',
      slug: 'desarrolladores-fullstack',
    },
    {
      title: 'Desarrolladores Mobile',
      description:
        'Equipo de desarrollo de alto nivel con amplia experiencia en aplicaciones móviles nativas y multiplataforma en alquiler.',
      slug: 'desarrolladores-mobile',
    },
    {
      title: 'Diseñadores 3D',
      description:
        'Visualice y anime sus ideas en 3D con la ayuda de nuestro equipo creativo especializado en modelado y animación.',
      slug: 'disenadores-3d',
    },
    {
      title: 'Diseñadores UI/UX',
      description:
        'Nuestro equipo de diseño UI/UX inspira el compromiso y la interacción a través de interfaces intuitivas y experiencias memorables.',
      slug: 'disenadores-ui-ux',
    },
  ],
  'desarrollo-custom': [
    {
      title: 'Aplicaciones Web',
      description:
        'Desarrollamos aplicaciones web personalizadas que se adaptan perfectamente a las necesidades específicas de su negocio.',
      slug: 'aplicaciones-web',
    },
    {
      title: 'Aplicaciones Móviles',
      description:
        'Creamos aplicaciones móviles nativas e híbridas con experiencias de usuario excepcionales.',
      slug: 'aplicaciones-moviles',
    },
    {
      title: 'Software Empresarial',
      description:
        'Soluciones de software a medida para optimizar procesos y aumentar la eficiencia operativa.',
      slug: 'software-empresarial',
    },
    {
      title: 'Integraciones API',
      description:
        'Conectamos sus sistemas existentes con nuevas soluciones mediante integraciones API robustas y seguras.',
      slug: 'integraciones-api',
    },
  ],
  consultoria: [
    {
      title: 'Auditoría Tecnológica',
      description:
        'Evaluamos su infraestructura actual para identificar oportunidades de mejora y optimización.',
      slug: 'auditoria-tecnologica',
    },
    {
      title: 'Consultoría Estratégica',
      description:
        'Asesoramiento experto para alinear su tecnología con los objetivos de negocio a largo plazo.',
      slug: 'consultoria-estrategica',
    },
    {
      title: 'Soporte Técnico',
      description:
        'Asistencia continua para resolver problemas y mantener sus sistemas funcionando sin interrupciones.',
      slug: 'soporte-tecnico',
    },
  ],
  transformacion: [
    {
      title: 'Digitalización de Procesos',
      description:
        'Transformamos procesos analógicos en flujos de trabajo digitales eficientes y automatizados.',
      slug: 'digitalizacion-procesos',
    },
    {
      title: 'Implementación Cloud',
      description:
        'Migración e implementación de soluciones en la nube para mayor escalabilidad y flexibilidad.',
      slug: 'implementacion-cloud',
    },
    {
      title: 'Análisis de Datos',
      description:
        'Convertimos datos en insights accionables para impulsar decisiones estratégicas.',
      slug: 'analisis-datos',
    },
  ],
  fivem: [
    {
      title: 'Desarrollo de Scripts',
      description:
        'Creamos scripts personalizados para mejorar la experiencia en servidores FiveM.',
      slug: 'desarrollo-scripts',
    },
    {
      title: 'Configuración de Servidores',
      description: 'Implementación y configuración completa de servidores FiveM optimizados.',
      slug: 'configuracion-servidores',
    },
    {
      title: 'Sistemas de Economía',
      description: 'Desarrollo de sistemas económicos avanzados para comunidades FiveM.',
      slug: 'sistemas-economia',
    },
    {
      title: 'Interfaces Personalizadas',
      description: 'Diseño de interfaces de usuario únicas y funcionales para servidores FiveM.',
      slug: 'interfaces-personalizadas',
    },
  ],
  ecommerce: [
    {
      title: 'Tiendas Online',
      description:
        'Desarrollo de plataformas de comercio electrónico personalizadas y optimizadas para conversión.',
      slug: 'tiendas-online',
    },
    {
      title: 'Integración de Pagos',
      description: 'Implementación de pasarelas de pago seguras y múltiples métodos de pago.',
      slug: 'integracion-pagos',
    },
    {
      title: 'Gestión de Inventario',
      description: 'Sistemas automatizados para control y gestión eficiente de inventario.',
      slug: 'gestion-inventario',
    },
    {
      title: 'Experiencia de Compra',
      description:
        'Diseño de experiencias de usuario optimizadas para maximizar ventas y fidelización.',
      slug: 'experiencia-compra',
    },
  ],
};
export function Services() {
  return (
    <section className='bg-content-1 min-h-280 border-b'>
      <div className='container-screen-2xl py-50'>
        <Fade as='h2' delay={0.2} className='mb-4 text-3xl font-medium capitalize sm:text-6xl'>
          {' '}
          Nuestros Servicios{' '}
        </Fade>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end'>
          <Fade as='p' delay={0.4} className='max-w-2xl text-pretty'>
            {' '}
            Nuestro enfoque está en transformar ideas en realidades tangibles, adaptándonos a las
            necesidades de cada proyecto para impulsar el éxito de nuestros clientes.{' '}
          </Fade>
          <Fade as='p' direction='right' delay={0.6}>
            <Button variant='outline' className='w-fit'>
              Explorar más Servicios
            </Button>
          </Fade>
        </div>

        <div className='mt-12'>
          <Tabs
            defaultValue={serviceCategories[0].id}
            className='flex-col lg:flex-row'
            orientation={'vertical'}
          >
            <ScrollArea className='min-w-80'>
              <TabsList className='flex-row border-b border-l-0 lg:flex-col lg:border-b-0 lg:border-l'>
                {serviceCategories.map((category, i) => (
                  <TabsTrigger
                    key={i}
                    value={category.id}
                    className='justify-center px-2 py-6 whitespace-nowrap lg:justify-start lg:px-6 lg:py-2 lg:text-start lg:whitespace-normal'
                    lineClassName='left-0 h-1 bottom-0 w-full lg:left-0 lg:h-full lg:w-1'
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            {Object.entries(serviceDetails).map(([key, details], i) => {
              return (
                <TabsContent key={i} value={key}>
                  <Fade as='h3' className='text-secondary text-2xl capitalize'>
                    {' '}
                    {serviceCategories.find((cat) => cat.id === key)?.title}
                  </Fade>

                  <div className='mt-8 grid gap-3 sm:grid-cols-2'>
                    {details.map(({ title, description }, i) => (
                      <Fade
                        key={i}
                        className={cn(
                          'bg-background ease-soft-spring flex transform flex-col rounded-lg border p-5',
                        )}
                        direction='up'
                        delay={i === 0 ? 0.2 : 0.2 + i * 0.05}
                      >
                        <h4 className='mb-1 text-lg font-medium capitalize'>{title}</h4>
                        <p className='h-full text-pretty'>{description}</p>
                      </Fade>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
