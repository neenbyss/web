import Link from 'next/link';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TrackedAccordion } from '@/components/tracked-accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { createMetadata, generateStructuredData } from '@/lib/metadata';

import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';
import { serviceCategories } from '@/utils/data/services';

import SERVICES_CIRCLES from '@/resources/svg/SERVICES_CIRCLES.svg';
import SERVICES_VECTOR from '@/resources/svg/SERVICES_VECTOR.svg';

const CONTACT_HREF = '/contact?service=minecraft_plugin_consulting';

// TODO(propietario): validar con casos reales qué entornos se soportan
// (Paper, Spigot, Fabric, versiones). La redacción usa fórmulas condicionadas
// ("según versión, entorno y alcance") hasta esa confirmación.
const minecraftStructuredData = generateStructuredData('Service', {
  name: 'Plugins y Mods Minecraft a Medida',
  description:
    'Evaluación, configuración, extensión y desarrollo de plugins y mods Minecraft según versión, entorno y alcance del proyecto.',
  serviceType: 'Desarrollo y Consultoría Minecraft',
});

const FAQs = [
  {
    question: '¿Desarrollan plugins Minecraft desde cero?',
    answer:
      'Sí, cuando es la opción correcta. Pero no empezamos ahí: primero evaluamos si existe una solución madura que resuelva tu necesidad. Solo desarrollamos desde cero cuando la función es única o ninguna base existente encaja con tu versión y tu servidor.',
  },
  {
    question: '¿Trabajan con Paper y Spigot?',
    answer:
      'Según versión, entorno y alcance del proyecto. Antes de cotizar revisamos tu tipo de servidor, versión de Minecraft, Java y dependencias para confirmar compatibilidad con el entorno que usas.',
  },
  {
    question: '¿Trabajan con Fabric?',
    answer:
      'Según versión, entorno y alcance del proyecto. Los mods de Fabric dependen fuertemente de la versión y el loader, así que lo evaluamos caso por caso antes de comprometer una solución.',
  },
  {
    question: '¿Pueden extender un plugin existente?',
    answer:
      'Sí, cuando el código, la API y la licencia del plugin lo permiten. Extender aprovecha trabajo ya probado y suele ser más rápido que desarrollar desde cero. Si la licencia no lo permite, te proponemos alternativas compatibles.',
  },
  {
    question: '¿Cómo evalúan la compatibilidad entre versiones?',
    answer:
      'Revisamos tipo de servidor, versión de Minecraft, entorno (Paper, Spigot, Fabric u otro), Java, plugins o mods instalados, APIs disponibles y cambios entre versiones. Con eso definimos si la solución funciona en tus versiones concretas; no prometemos compatibilidad universal.',
  },
  {
    question: '¿Conviene comprar un plugin o desarrollarlo a medida?',
    answer:
      'Depende de tu caso. Comprar conviene cuando la función ya está resuelta por un plugin maduro; desarrollar conviene cuando necesitas una mecánica única, una integración específica o control total del alcance. Te damos la recomendación técnica antes de que gastes.',
  },
  {
    question: '¿Pueden integrar el plugin con Discord, una web o una base de datos?',
    answer:
      'Según alcance, APIs disponibles e integración acordada. Las integraciones con Discord, webs o bases de datos se definen en la propuesta: qué sistemas, qué datos y qué mantenimiento implican.',
  },
  {
    question: '¿Entregan documentación y código fuente?',
    answer:
      'Entregamos documentación, changelog e instrucciones de instalación de lo acordado. El código fuente de nuestro desarrollo se entrega según la propuesta aprobada; el de plugins de terceros sigue perteneciendo a sus autores y licencias.',
  },
  {
    question: '¿Cuánto cuesta un plugin o mod personalizado?',
    answer:
      'Depende del alcance, la versión, la licencia, las integraciones y la propiedad de los assets. No hay precio único: tras evaluar tu caso te pasamos una propuesta. Cuéntanos tu idea en el formulario y te orientamos sin compromiso.',
  },
  {
    question: '¿Ofrecen mantenimiento después de la entrega?',
    answer:
      'El mantenimiento depende del alcance acordado: actualizaciones de versión, ajustes y soporte se definen en la propuesta, no son indefinidos por defecto. Te indicamos qué mantenimiento conviene según tu servidor.',
  },
];

const situations = [
  {
    title: 'No existe el plugin que necesitas',
    description:
      'Buscaste y ninguna solución hace exactamente lo que tu servidor necesita. Evaluamos si se desarrolla a medida.',
  },
  {
    title: 'Un plugin necesita extensión',
    description:
      'La base sirve, pero falta una integración o función. Extendemos lo existente en vez de reinventarlo.',
  },
  {
    title: 'Conflictos entre plugins o sistemas',
    description:
      'Varios plugins chocan entre sí o con tu versión. Revisamos compatibilidad y resolvemos los conflictos.',
  },
  {
    title: 'Mecánica exclusiva de temporada',
    description:
      'Quieres una modalidad o evento único que ningún plugin prefabricado ofrece. La diseñamos para tu servidor.',
  },
  {
    title: 'Cambio de versión pendiente',
    description:
      'Vas a actualizar y debes revisar qué sigue funcionando. Auditamos compatibilidad antes de migrar.',
  },
  {
    title: 'Herramienta interna de administración',
    description:
      'Necesitas economía, permisos, comunidad o automatización a tu medida para operar el servidor.',
  },
];

const options = [
  {
    option: 'Configurar una solución existente',
    when: 'La función ya está resuelta',
    advantage: 'Menor tiempo y coste inicial',
    limit: 'Dependencia de la configuración y del mantenimiento del plugin',
  },
  {
    option: 'Extender un plugin existente',
    when: 'La base sirve, pero falta una integración o función',
    advantage: 'Aprovecha trabajo existente',
    limit: 'Depende del código, API y licencia',
  },
  {
    option: 'Desarrollar un plugin/mod a medida',
    when: 'La función es única o no existe una base adecuada',
    advantage: 'Control sobre la lógica y el alcance',
    limit: 'Mayor trabajo inicial y mantenimiento propio',
  },
];

const capabilities = [
  'Plugins para Paper o Spigot, según versión y alcance',
  'Mods para Fabric, según versión y entorno',
  'Sistemas de economía',
  'Integraciones con Discord, APIs o bases de datos',
  'Sistemas de permisos y roles',
  'Mecánicas de juego',
  'Minijuegos y eventos',
  'Sistemas de temporadas o progresión',
  'Herramientas administrativas',
  'Automatizaciones y comandos',
  'Extensiones de plugins existentes',
  'Compatibilidad entre versiones o componentes',
];

const compatChecklist = [
  'Tipo de servidor',
  'Versión de Minecraft',
  'Paper, Spigot, Fabric u otro entorno',
  'Java y dependencias relevantes',
  'Plugins o mods instalados',
  'APIs disponibles',
  'Base de datos o servicios externos',
  'Cambios entre versiones',
  'Necesidad de mantenimiento posterior',
];

const steps = [
  {
    title: 'Recibimos idea y entorno',
    description:
      'Nos cuentas la función que necesitas y tu entorno técnico: versión, loader y plugins actuales.',
  },
  {
    title: 'Revisamos soluciones maduras',
    description:
      'Buscamos si ya existe algo probado que resuelva tu caso antes de proponer desarrollo.',
  },
  {
    title: 'Definimos el camino',
    description: 'Decidimos juntos: configurar, extender o desarrollar, con sus implicaciones.',
  },
  {
    title: 'Implementamos el alcance',
    description: 'Configuramos, extendemos o desarrollamos lo aprobado en la propuesta.',
  },
  {
    title: 'Entregamos y documentamos',
    description:
      'Pruebas cuando es posible, documentación, cambios y recomendaciones de mantenimiento.',
  },
];

const deliverables = [
  'Diagnóstico de viabilidad',
  'Recomendación técnica',
  'Plugin o mod desarrollado o extensión acordada',
  'Integración con sistemas existentes',
  'Configuración documentada',
  'Compatibilidad indicada para versiones concretas',
  'Changelog',
  'Instrucciones de instalación',
  'Pruebas ejecutadas',
  'Recomendación de mantenimiento',
];

const notIncluded = [
  'Plugins de terceros y sus licencias.',
  'Hosting, VPS y servicios externos.',
  'Compatibilidad con versiones no indicadas.',
  'Integraciones no incluidas en el alcance.',
  'Funcionalidades nuevas fuera del brief.',
  'Mantenimiento indefinido.',
  'Assets o recursos con licencia externa.',
  'Migraciones completas no contempladas.',
];

const neededInfo = [
  'Versión de Minecraft',
  'Tipo de servidor o loader',
  'Lista de plugins o mods',
  'Descripción de la función',
  'Vídeo, capturas o referencias',
  'Integraciones necesarias',
  'Fecha o temporada objetivo',
  'Código o documentación disponible, si aplica',
  'Presupuesto orientativo, opcional',
];

const relatedLinks = [
  { href: '/services', label: 'Servicios' },
  { href: '/services/fivem', label: 'Servicios FiveM' },
  { href: '/services/web_development', label: 'Desarrollo web' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/faqs', label: 'Preguntas frecuentes' },
];

export const metadata = createMetadata({
  title: 'Plugins y mods Minecraft a medida: Paper, Spigot y Fabric',
  description:
    'Evaluamos si necesitas configurar, extender o desarrollar plugins y mods Minecraft. Compatibilidad, integraciones y funciones a medida según tu servidor.',
  canonical: 'https://neenbyss.com/services/minecraft',
  openGraph: {
    url: 'https://neenbyss.com/services/minecraft',
    // TODO(propietario): crear una OG específica de Minecraft.
    // Se usa la genérica de servicios, coherente con la línea no-FiveM.
    images: ['https://neenbyss.com/og_servicios.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'plugin minecraft a medida',
    'desarrollo plugin minecraft',
    'plugin paper minecraft',
    'plugin spigot minecraft',
    'mod fabric minecraft',
    'extender plugin minecraft',
    'compatibilidad plugins minecraft',
    'integrar plugin discord minecraft',
    'programador minecraft',
    'servidor minecraft personalizado',
  ],
});

export const dynamic = 'error';

export default function MinecraftPage() {
  const color = serviceCategories.find((x) => x.uid === 'minecraft')!.color;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(minecraftStructuredData) }}
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
              Plugins y mods Minecraft a medida: desarrolla solo lo que tu servidor necesita
            </h1>
            <p className='max-w-2xl'>
              Te ayudamos a decidir si conviene{' '}
              <strong>
                configurar una solución existente, extenderla o crear una función nueva
              </strong>{' '}
              para tu servidor Minecraft, cuidando la{' '}
              <strong>compatibilidad y el mantenimiento</strong>.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href={CONTACT_HREF}>
                  Pedir diagnóstico Minecraft
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/projects'>Ver proyectos</Link>
              </Button>
            </div>
            <p className='text-foreground-2/70 mt-4 text-sm'>
              Respuesta inicial en menos de 24 horas · Evaluamos la opción adecuada · Sin compromiso
            </p>
          </div>

          <img
            alt=''
            aria-hidden='true'
            src={SERVICES_CIRCLES.src}
            className='pointer-events-none absolute -top-20 -right-50 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
          />
          <img
            alt=''
            aria-hidden='true'
            src={SERVICES_VECTOR.src}
            className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
          />
        </section>

        <section className='container-screen-2xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
            Situaciones que resolvemos
          </h2>
          <p className='max-w-2xl'>
            Si tu servidor necesita algo que no encaja con una solución prefabricada, podemos
            ayudarte.
          </p>

          <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {situations.map(({ title, description }) => (
              <Link key={title} href={CONTACT_HREF} className='group block h-full'>
                <Card className='flex h-full flex-col border-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
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
                    <CardTitle className='group-hover:text-primary text-base transition-colors duration-300 sm:text-xl'>
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex grow flex-col'>
                    <p className='text-muted-foreground grow'>{description}</p>
                    <span className='text-primary/70 group-hover:text-primary mt-6 flex items-center gap-2 text-sm transition-colors'>
                      Pedir diagnóstico <ArrowRightIcon className='size-4' />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className='bg-content border-y py-20'>
          <div className='container-screen-xl'>
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
              Configurar, extender o desarrollar
            </h2>
            <p className='max-w-2xl'>
              Nuestra recomendación honesta antes de programar nada. Esta tabla orienta la decisión,
              no es una garantía de precio o plazo.
            </p>

            <div className='mt-10 overflow-x-auto'>
              <table className='bg-content-1 border-ring w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border text-left'>
                <thead>
                  <tr className='bg-content'>
                    <th scope='col' className='p-5 text-base font-medium'>
                      Opción
                    </th>
                    <th scope='col' className='p-5 text-base font-medium'>
                      Cuándo conviene
                    </th>
                    <th scope='col' className='p-5 text-base font-medium'>
                      Ventaja
                    </th>
                    <th scope='col' className='p-5 text-base font-medium'>
                      Riesgo o límite
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {options.map(({ option, when, advantage, limit }) => (
                    <tr key={option} className='border-ring border-t'>
                      <th scope='row' className='text-primary p-5 text-base font-medium'>
                        {option}
                      </th>
                      <td className='p-5'>{when}</td>
                      <td className='p-5'>{advantage}</td>
                      <td className='p-5'>{limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className='container-screen-2xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
            Qué podemos evaluar o desarrollar
          </h2>
          <p className='max-w-2xl'>
            Según versión, entorno y alcance de tu proyecto. Lo confirmamos contigo antes de
            cotizar.
          </p>

          <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
            {capabilities.map((item) => (
              <li key={item} className='flex items-start gap-3'>
                <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className='bg-content border-y py-20'>
          <div className='container-screen-xl'>
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
              Compatibilidad y versiones
            </h2>
            <p className='max-w-2xl'>
              Antes de cotizar revisamos tu entorno. Ninguna implementación funciona automáticamente
              en todas las versiones: la compatibilidad se indica por caso.
            </p>

            <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
              {compatChecklist.map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='container-screen-2xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>Cómo trabajamos</h2>
          <p className='max-w-2xl'>Probamos en un entorno controlado cuando es posible.</p>

          <ol className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {steps.map(({ title, description }, i) => (
              <li key={title}>
                <Card className='flex h-full flex-col border-2'>
                  <CardHeader>
                    <span
                      className='mb-4 flex size-8 items-center justify-center rounded-lg text-lg font-bold md:size-12'
                      style={{
                        backgroundColor: `rgba(${color.join(',')}, 0.15)`,
                        color: `rgb(${color.join(',')})`,
                      }}
                      aria-hidden='true'
                    >
                      {i + 1}
                    </span>
                    <CardTitle className='text-base sm:text-xl'>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground'>{description}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section className='bg-content border-y py-20'>
          <div className='container-screen-xl grid gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>Qué recibes</h2>
              <p className='max-w-xl'>Según el alcance aprobado en la propuesta.</p>
              <ul className='mt-8 flex flex-col gap-4'>
                {deliverables.map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
                Qué no incluye automáticamente
              </h2>
              <ul className='mt-8 flex flex-col gap-4'>
                {notIncluded.map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className='container-screen-2xl py-20'>
          <div className='grid gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
                Qué necesitamos
              </h2>
              <p className='max-w-xl'>
                Con esto preparamos tu propuesta. El formulario solo pide lo esencial.
              </p>
              <ul className='mt-8 flex flex-col gap-4'>
                {neededInfo.map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
                Caso de decisión
              </h2>
              <div className='bg-content-1 border-ring mt-8 rounded-2xl border p-6 sm:p-8'>
                <p>
                  Si ya encontraste un plugin parecido,{' '}
                  <strong>envíanos su nombre y explica qué necesitas cambiar</strong>. Si no existe
                  ninguna solución cercana,{' '}
                  <strong>describe la experiencia que quieres crear</strong>.
                </p>
                <p className='mt-4'>
                  Primero evaluaremos si conviene{' '}
                  <strong>reutilizar, extender o desarrollar</strong>, y después te pasamos la
                  propuesta.
                </p>
                <Button asChild className='mt-6'>
                  <Link href={CONTACT_HREF}>
                    Empezar la evaluación
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className='container-screen-lg py-25'>
          <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
            Preguntas Frecuentes sobre Plugins y Mods Minecraft
          </h2>

          <TrackedAccordion collapsible className='flex flex-col gap-4' location='minecraft'>
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
          </TrackedAccordion>
        </section>

        <section className='bg-content-1 border-t py-20'>
          <div className='container-screen-xl text-center'>
            <h2 className='mb-4 text-xl font-medium sm:text-4xl'>
              ¿Necesitas una función que no existe en ningún plugin?
            </h2>
            <p className='mx-auto max-w-xl'>
              Cuéntanos tu caso y te orientaremos sobre si conviene configurar, extender o
              desarrollar, con alcance y siguiente paso claros.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-2'>
              <Button asChild size='xl'>
                <Link href={CONTACT_HREF}>
                  Pedir diagnóstico Minecraft
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size='xl' variant='outline'>
                <Link href='/projects'>Ver proyectos</Link>
              </Button>
            </div>
            <nav
              aria-label='Servicios relacionados'
              className='mt-10 flex flex-wrap justify-center gap-2'
            >
              {relatedLinks.map(({ href, label }) => (
                <Button key={href} variant='flat' size='sm' asChild>
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}
