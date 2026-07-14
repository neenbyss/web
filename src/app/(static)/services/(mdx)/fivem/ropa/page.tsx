import Link from 'next/link';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { createMetadata, generateStructuredData } from '@/lib/metadata';

import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';
import { serviceCategories } from '@/utils/data/services';

import SERVICES_CIRCLES from '@/resources/svg/SERVICES_CIRCLES.svg';
import SERVICES_VECTOR from '@/resources/svg/SERVICES_VECTOR.svg';

const clothingStructuredData = generateStructuredData('Service', {
  name: 'Packs de Ropa & EUP para FiveM',
  description:
    'Edición de ropa y creación de packs personalizados para servidores FiveM: civiles, trabajos y uniformes EUP (policía, EMS, bomberos). Stream-ready, sin marcas reales, compatibles con ESX y QBCore.',
  serviceType: 'Diseño de Ropa y EUP para FiveM',
  priceRange: '30 - 600 USD',
  offers: [
    {
      '@type': 'Offer',
      name: 'Pack de Ropa Civil',
      description:
        'Ropa casual, formal y urbana para ciudadanos, adaptada a la temática del servidor.',
    },
    {
      '@type': 'Offer',
      name: 'Pack EUP Policía / EMS / Bomberos',
      description:
        'Uniformes oficiales para cuerpos de emergencia con insignias y jerarquía configurable.',
    },
    {
      '@type': 'Offer',
      name: 'Ropa de Trabajos',
      description:
        'Uniformes para mecánico, gasolinero, taxi, repartidor y demás profesiones del servidor.',
    },
    {
      '@type': 'Offer',
      name: 'Ropa Custom a Medida',
      description:
        'Diseño de prendas únicas sobre MP male/female siguiendo tu brief o referencias.',
    },
  ],
});

const FAQs = [
  {
    question: '¿Qué es un pack EUP para FiveM?',
    answer:
      'EUP (Emergency Uniforms Pack) es un conjunto de uniformes oficiales para cuerpos de emergencia en FiveM: policía, EMS, bomberos y ejército. Se integra al servidor para que los jugadores con los permisos correctos puedan vestir el uniforme correspondiente dentro del rol.',
  },
  {
    question: '¿La ropa es stream-ready y sin marcas reales?',
    answer:
      'Sí. Todos los packs se entregan como recursos stream (streaming-ready) y sin logos ni marcas comerciales reales, para evitar problemas de copyright y cumplir los términos de CFX/FiveM. Esto protege a tu servidor frente a reportes y takedowns.',
  },
  {
    question: '¿Los packs de ropa funcionan en ESX y QBCore?',
    answer:
      'Sí, todos los packs son compatibles con ESX y QBCore. La ropa se aplica sobre los modelos MP male y MP female, por lo que cualquier script de vestuario estándar (qb-clothing, esx_skin, illenium-appearance, fivem-appearance, etc.) la reconoce sin modificaciones.',
  },
  {
    question: '¿Cuánto cuesta un pack de ropa personalizada para FiveM?',
    answer:
      'Depende del volumen y nivel de personalización. Un pack civil estándar parte desde 30 USD; un EUP completo de policía o EMS desde 80 USD; un pack custom a medida se cotiza según referencias y cantidad de prendas. Cotizamos sin compromiso tras revisar tu brief.',
  },
  {
    question: '¿Cuánto tarda la entrega?',
    answer:
      'Un pack estándar tarda entre 3 y 7 días hábiles. Packs custom o EUP grandes pueden tardar entre 1 y 3 semanas, dependiendo del detalle, la cantidad de prendas y las revisiones solicitadas.',
  },
  {
    question: '¿La ropa afecta al rendimiento del servidor?',
    answer:
      'No, si está bien optimizada. Usamos texturas en resoluciones adecuadas y comprimimos los YDD/YTD para que el streaming no sature la conexión de los jugadores. Un pack mal optimizado sí puede causar lag o crashes, por eso revisamos cada entrega antes de pasarla a producción.',
  },
  {
    question: '¿Pueden editar prendas existentes o solo crear nuevas?',
    answer:
      'Ambas cosas. Hacemos edición de ropa sobre prendas ya existentes (cambios de color, texturas, insignias, logos custom del servidor) y también creamos prendas nuevas desde cero sobre MP male/female.',
  },
  {
    question: '¿Qué incluye la entrega?',
    answer:
      'Recibes el recurso listo para drag & drop en tu carpeta resources, probado en ESX y QBCore, con instrucciones de instalación y un periodo de revisión y ajustes post-entrega para dejar todo funcionando sin errores.',
  },
];

const clothingTypes = [
  {
    title: 'Ropa Civil',
    description:
      'Casual, formal, urbana y deportiva para ciudadanos. Ideal para dar variedad visual al servidor y que cada jugador tenga un look único dentro del rol.',
  },
  {
    title: 'EUP Policía',
    description:
      'Uniformes oficiales con insignias, rangos y jerarquía. Compatible con los principales scripts de policía y totalmente stream-ready, sin marcas reales.',
  },
  {
    title: 'EUP EMS y Bomberos',
    description:
      'Uniformes para paramédicos, doctores, bomberos y rescatistas. Diferenciación clara por rango y unidad operativa para roles de emergencia creíbles.',
  },
  {
    title: 'Uniformes de Trabajos',
    description:
      'Ropa profesional para mecánicos, gasolineros, taxistas, repartidores, camareros y cualquier job del servidor. Personalizada con el branding de tu empresa in-game.',
  },
  {
    title: 'Ropa de Mafias y Pandillas',
    description:
      'Outfits temáticos para organizaciones criminales con detalles específicos, colores distintivos y accesorios coherentes con la estética del grupo.',
  },
  {
    title: 'Ropa Custom a Medida',
    description:
      'Diseño de prendas únicas sobre MP male/female siguiendo tus referencias o brief. Perfecto para rewards, eventos, merchandising in-game o branding propio.',
  },
];

const included = [
  'Compatibilidad con MP male y MP female',
  'Stream-ready y sin marcas reales',
  'Probado en ESX Legacy y QBCore',
  'Texturas optimizadas (YDD / YTD comprimidos)',
  'Compatible con scripts de vestuario estándar',
  'Instrucciones de instalación paso a paso',
  'Revisión y ajustes post-entrega',
  'Asesoría para integración con scripts existentes',
];

export const metadata = createMetadata({
  title: 'Packs de Ropa & EUP para FiveM | Edición de Ropa Personalizada',
  description:
    'Creamos packs de ropa para servidores FiveM: civiles, trabajos y uniformes EUP (policía, EMS, bomberos). Stream-ready, sin marcas reales, compatibles con ESX y QBCore. Edición de ropa profesional optimizada.',
  canonical: 'https://neenbyss.com/services/fivem/ropa',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem/ropa',
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'pack de ropa fivem',
    'packs de ropa fivem',
    'edición de ropa fivem',
    'editar ropa fivem',
    'ropa personalizada fivem',
    'ropa custom fivem',
    'ropa fivem esx',
    'ropa fivem qbcore',
    'ropa stream ready fivem',
    'pack eup fivem',
    'eup fivem',
    'eup policia fivem',
    'uniforme policia fivem',
    'uniformes policia fivem',
    'uniformes ems fivem',
    'uniformes bomberos fivem',
    'ropa civil fivem',
    'ropa trabajos fivem',
    'pack ropa policia fivem',
    'pack ropa civiles fivem',
    'ropa mp male fivem',
    'ropa mp female fivem',
    'programador fivem ropa',
    'desarrollador ropa fivem',
    'diseñador ropa fivem',
    'ropa sin marcas fivem',
    'pack ropa roleplay fivem',
    'vestuario fivem',
    'ropa fivem españa',
    'ropa fivem mexico',
    'ropa fivem latinoamerica',
  ],
});

export const dynamic = 'error';

export default function FiveMRopaPage() {
  const color = serviceCategories.find((x) => x.uid === 'fivem')!.color;

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clothingStructuredData) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main>
        <section className='relative overflow-clip border-b'>
          <div className='container-screen-2xl relative z-10 py-5 sm:py-15'>
            <AppBreadcrumb className='mb-4 bg-transparent px-0 py-0' />

            <h1 className='mb-6 max-w-3xl text-2xl font-medium sm:text-6xl'>
              Packs de Ropa & EUP para FiveM: Edición de Ropa Personalizada
            </h1>
            <p className='max-w-2xl'>
              Diseñamos y adaptamos <strong>packs de ropa para FiveM</strong> listos para tu
              servidor: <strong>civiles, trabajos y uniformes EUP</strong> (policía, EMS y
              bomberos). Todo <strong>stream-ready</strong>, sin marcas reales, compatible con{' '}
              <strong>ESX y QBCore</strong> y optimizado para no afectar al rendimiento del
              servidor.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href='/contact?service=fivem_clothing_packs'>
                  Solicitar Pack de Ropa
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/services/fivem'>Ver todos los servicios FiveM</Link>
              </Button>
            </div>
          </div>

          <img
            alt='SERVICES_CIRCLES'
            src={SERVICES_CIRCLES.src}
            className='pointer-events-none absolute -top-20 -right-50 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
          />
          <img
            alt='SERVICES_VECTOR'
            src={SERVICES_VECTOR.src}
            className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
          />
        </section>

        <section className='container-screen-2xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
            Tipos de Packs de Ropa que Diseñamos
          </h2>
          <p className='max-w-2xl'>
            Desde vestuario civil hasta uniformes especializados para cuerpos de emergencia,
            adaptamos cada pack al rol y temática de tu servidor FiveM.
          </p>

          <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {clothingTypes.map(({ title, description }) => (
              <Card
                key={title}
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
                    <CheckTaskIcon className='size-5' />
                  </div>
                  <CardTitle className='text-base sm:text-xl'>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className='bg-content border-y py-20'>
          <div className='container-screen-xl'>
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
              Qué Incluye Cada Pack de Ropa
            </h2>
            <p className='max-w-2xl'>
              Todos los packs se entregan probados, optimizados y con soporte para que queden
              operativos en tu servidor desde el primer día.
            </p>

            <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
              {included.map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='container-screen-lg py-25'>
          <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
            Preguntas Frecuentes sobre Packs de Ropa y EUP para FiveM
          </h2>

          <Accordion type='single' collapsible className='flex flex-col gap-4'>
            {FAQs.map(({ question, answer }, i) => (
              <AccordionItem
                className='bg-primary/20 data-[state=open]:bg-primary/60 rounded-lg border-b-0 duration-300'
                value={`item-${i}`}
                key={i}
              >
                <AccordionTrigger className='px-6 py-3 text-start text-base hover:cursor-pointer sm:text-center sm:text-xl'>
                  {question}
                </AccordionTrigger>
                <AccordionContent className='px-6 py-4 text-base'>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className='bg-content-1 border-t py-20'>
          <div className='container-screen-xl text-center'>
            <h2 className='mb-4 text-xl font-medium sm:text-4xl'>
              ¿Listo para renovar el vestuario de tu servidor FiveM?
            </h2>
            <p className='mx-auto max-w-xl'>
              Cuéntanos qué necesitas y te pasamos una cotización sin compromiso en menos de 24
              horas.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-2'>
              <Button asChild size='xl'>
                <Link href='/contact?service=fivem_clothing_packs'>
                  Pedir Cotización
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size='xl' variant='outline'>
                <Link href='/services/fivem'>Explorar otros servicios FiveM</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
