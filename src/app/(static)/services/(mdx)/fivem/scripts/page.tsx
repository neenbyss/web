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

const scriptsStructuredData = generateStructuredData('Service', {
  name: 'Desarrollo de Scripts Personalizados para FiveM',
  description:
    'Desarrollo de scripts FiveM a medida en Lua, compatibles con ESX Legacy y QBCore. Economía, inventario, trabajos, vehículos, policial, EMS y mecánicas únicas. Código propio, optimizado y con NUI incluida.',
  serviceType: 'Desarrollo de Scripts para FiveM',
  priceRange: '50 - 2000 USD',
  offers: [
    {
      '@type': 'Offer',
      name: 'Scripts de Economía',
      description:
        'Bancos, ATMs, nóminas, impuestos y sistemas financieros integrados al framework.',
    },
    {
      '@type': 'Offer',
      name: 'Scripts de Inventario',
      description:
        'Inventarios por peso o por slots con hotbar, crafting y compatibilidad con ox_inventory, qs-inventory o sistema propio.',
    },
    {
      '@type': 'Offer',
      name: 'Scripts de Trabajos y Negocios',
      description:
        'Jobs completos (mecánico, taxi, trucker, repartidor), negocios gestionables por jugadores y cadenas de producción.',
    },
    {
      '@type': 'Offer',
      name: 'Scripts de Vehículos',
      description:
        'Llaves, parking, impound, tuning, fuel, handling y packs de addon-cars integrados.',
    },
    {
      '@type': 'Offer',
      name: 'Scripts Policial / EMS',
      description:
        'MDT, sistema 911, cárcel, boosting, revivir, checkups médicos y rutinas de servicio para cuerpos de emergencia.',
    },
    {
      '@type': 'Offer',
      name: 'Scripts Custom / Mecánicas Únicas',
      description:
        'Minijuegos, eventos, heists, battle pass, sistemas de prestigio y cualquier mecánica única que imagines para tu servidor.',
    },
  ],
});

const FAQs = [
  {
    question: '¿Desarrollan scripts FiveM desde cero en Lua?',
    answer:
      'Sí. Programamos en Lua 5.4 siguiendo las mejores prácticas del ecosistema FiveM: uso de ox_lib y oxmysql cuando aplica, event-driven con validación server-side obligatoria, NUI con HTML/CSS/JS, React o Vue, y documentación inline. Nada de código copiado ni reventa.',
  },
  {
    question: '¿Los scripts funcionan en ESX y QBCore?',
    answer:
      'Sí. Usamos un bridge propio (nb-bridge) que abstrae las diferencias entre ESX Legacy y QBCore, por lo que un mismo script corre en ambos frameworks sin duplicar código. Si tu servidor usa otro framework (QBox, ND, Ox Core, Qbus, vRP, etc.), evaluamos la integración caso por caso.',
  },
  {
    question: '¿Me entregan el código fuente del script?',
    answer:
      'Depende del plan que elijas. Por defecto entregamos el script listo para producción con escrow (código protegido). Si necesitas el código fuente abierto para modificarlo internamente, hay un costo adicional y se cobra por el traspaso de derechos, no por el desarrollo.',
  },
  {
    question: '¿Cuánto cuesta un script FiveM personalizado?',
    answer:
      'Scripts sencillos desde 50 USD (un comando, una mecánica mínima, sin NUI). Scripts medios con NUI, base de datos e integración framework completa desde 200 USD. Scripts complejos con múltiples módulos, mecánicas únicas o diseño a medida suelen estar entre 500 y 2000 USD. Cotizamos sin compromiso tras revisar el brief.',
  },
  {
    question: '¿Cuánto tarda el desarrollo de un script custom?',
    answer:
      'Un script pequeño tarda 2-5 días hábiles. Scripts medios 1-2 semanas. Proyectos grandes (inventario completo, MDT, sistemas económicos) pueden ir de 3 semanas a 2 meses. Gestionamos las tareas en Trello con changelog semanal para que veas el avance en tiempo real.',
  },
  {
    question: '¿Pueden editar o reparar scripts que ya tengo?',
    answer:
      'Sí, trabajamos sobre scripts abiertos: corrección de bugs, nuevas funcionalidades, conversiones ESX ↔ QBCore, optimización y refactor. No modificamos código encriptado u ofuscado (escrow) ni archivos compilados sin código fuente — los términos de CFX y de los autores originales lo prohíben.',
  },
  {
    question: '¿Los scripts incluyen interfaces NUI?',
    answer:
      'Sí cuando la mecánica lo requiere (HUD, pause menu, phone, inventory, MDT, admin panel, tiendas). Diseñamos la NUI con HTML/CSS/JS vanilla, React o Vue según el proyecto. Tenemos experiencia documentada con rediseños como el Pause Menu de CodeIQ, disponible en nuestra sección de proyectos.',
  },
  {
    question: '¿Los scripts afectan al rendimiento del servidor?',
    answer:
      'Nuestros scripts apuntan a estar por debajo de 0.05ms en idle y bajo 1ms en peaks de actividad. Usamos threading controlado, caché de consultas SQL, delegación de lógica pesada al server y cancelación de ticks innecesarios. Probamos cada script en un staging antes de subirlo a producción.',
  },
  {
    question: '¿Qué tipo de scripts no desarrollan?',
    answer:
      'No desarrollamos ni adaptamos nada que viole los términos de CFX/FiveM: cheats, bypasses, herramientas para duplicar o robar servidores, ni modificaciones a scripts encriptados de terceros sin autorización del autor. Si una idea no es viable técnica o legalmente, te lo explicamos antes de empezar.',
  },
];

const scriptTypes = [
  {
    title: 'Scripts de Economía',
    description:
      'Bancos, ATMs, nóminas, sistemas de impuestos, lavado de dinero, casas de cambio y toda la infraestructura financiera del servidor, integrada al framework.',
  },
  {
    title: 'Scripts de Inventario',
    description:
      'Inventarios por peso o por slots con hotbar, crafting, quick-use, stash compartidos y compatibilidad con ox_inventory, qs-inventory o implementaciones propias.',
  },
  {
    title: 'Scripts de Trabajos y Negocios',
    description:
      'Jobs completos (mecánico, taxi, trucker, repartidor, minero, leñador), negocios gestionables por jugadores, cadenas de producción y sistemas de empleados.',
  },
  {
    title: 'Scripts de Vehículos',
    description:
      'Sistemas de llaves, parking, impound, tuning, fuel, GPS, handling ajustado y packs de addon-cars integrados con spawn, categorías y precios configurables.',
  },
  {
    title: 'Scripts Policial, EMS y Bomberos',
    description:
      'MDT completo, sistema 911/311, cárcel, boosting/robos, breathalizer, revivir, checkups médicos, stabilizer y rutinas de servicio para cuerpos de emergencia.',
  },
  {
    title: 'Scripts Custom y Mecánicas Únicas',
    description:
      'Minijuegos, heists, battle pass, sistemas de prestigio, eventos temporales, drogas, propiedades, phones y cualquier idea original que imagines para tu servidor.',
  },
];

const included = [
  'Código propio en Lua 5.4, sin reventa',
  'Compatible con ESX Legacy y QBCore (bridge propio)',
  'Validación server-side obligatoria (anti-cheat)',
  'NUI con HTML/CSS/JS, React o Vue según el caso',
  'Optimización por debajo de 0.05ms en idle',
  'Testeado en staging antes de producción',
  'Documentación inline y changelog por entrega',
  'Soporte post-entrega y correcciones incluidas',
];

export const metadata = createMetadata({
  title: 'Scripts FiveM Personalizados | Desarrollo a Medida en Lua, ESX y QBCore',
  description:
    'Desarrollo de scripts FiveM a medida: economía, inventario, trabajos, vehículos, policial, EMS y mecánicas únicas. Código propio en Lua, compatible con ESX y QBCore, optimizado y con NUI incluida. Cotiza sin compromiso.',
  canonical: 'https://neenbyss.com/services/fivem/scripts',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem/scripts',
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'scripts fivem',
    'scripts fivem personalizados',
    'scripts fivem custom',
    'scripts fivem a medida',
    'desarrollo de scripts fivem',
    'desarrollo scripts fivem',
    'programador scripts fivem',
    'programador de scripts fivem',
    'crear script fivem',
    'crear scripts fivem',
    'script fivem custom',
    'scripts qbcore',
    'scripts qbcore personalizados',
    'scripts qb fivem',
    'scripts esx',
    'scripts esx personalizados',
    'scripts esx legacy',
    'scripts qbox',
    'scripts fivem lua',
    'scripts fivem ox_lib',
    'scripts economia fivem',
    'scripts inventario fivem',
    'scripts trabajos fivem',
    'scripts vehiculos fivem',
    'scripts policia fivem',
    'scripts ems fivem',
    'scripts mdt fivem',
    'scripts negocios fivem',
    'scripts roleplay fivem',
    'scripts rp fivem',
    'script hud fivem',
    'script phone fivem',
    'scripts fivem mexico',
    'scripts fivem españa',
    'scripts fivem argentina',
    'scripts fivem chile',
    'scripts fivem colombia',
    'scripts fivem latinoamerica',
  ],
});

export const dynamic = 'error';

export default function FiveMScriptsPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptsStructuredData) }}
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
              Scripts FiveM Personalizados: Desarrollo a Medida en Lua, ESX y QBCore
            </h1>
            <p className='max-w-2xl'>
              Desarrollamos <strong>scripts FiveM a medida</strong> en Lua para servidores de rol:
              economía, inventario, trabajos, vehículos, policial, EMS y mecánicas únicas.{' '}
              <strong>Código propio</strong>, compatible con <strong>ESX Legacy y QBCore</strong>{' '}
              gracias a nuestro bridge, optimizado por debajo de 0.05ms en idle y con{' '}
              <strong>NUI incluida</strong> cuando la mecánica lo requiere.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href='/contact?service=fivem_scripts'>
                  Cotizar Script a Medida
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
            Tipos de Scripts FiveM que Desarrollamos
          </h2>
          <p className='max-w-2xl'>
            Desde mecánicas básicas hasta sistemas complejos multi-módulo. Cada script se desarrolla
            a medida según las necesidades y temática de tu servidor.
          </p>

          <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {scriptTypes.map(({ title, description }) => (
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
              Qué Incluye Cada Script que Entregamos
            </h2>
            <p className='max-w-2xl'>
              Cada entrega está pensada para quedar operativa desde el primer día en tu servidor,
              con validación server-side y soporte post-entrega.
            </p>

            <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
              {included.map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className='border-primary/60 bg-primary/5 mt-10 border-l-4 p-4 text-sm'>
              <p>
                ¿Buscas ver un ejemplo real de nuestro trabajo con NUI? Revisa el{' '}
                <Link href='/projects/code_iq_pausemenu' className='text-primary hover:underline'>
                  rediseño del Pause Menu FiveM para CodeIQ
                </Link>{' '}
                en nuestra sección de proyectos.
              </p>
            </div>
          </div>
        </section>

        <section className='container-screen-lg py-25'>
          <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
            Preguntas Frecuentes sobre Desarrollo de Scripts FiveM
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
              ¿Necesitas un script FiveM único para tu servidor?
            </h2>
            <p className='mx-auto max-w-xl'>
              Cuéntanos la mecánica que tienes en mente y te pasamos una cotización sin compromiso
              en menos de 24 horas.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-2'>
              <Button asChild size='xl'>
                <Link href='/contact?service=fivem_scripts'>
                  Cotizar mi Script
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
