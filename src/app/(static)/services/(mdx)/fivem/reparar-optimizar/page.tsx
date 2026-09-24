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

const repairStructuredData = generateStructuredData('Service', {
  name: 'Reparación y Optimización de Servidores FiveM',
  description:
    'Diagnóstico y corrección de errores, crashes y problemas de rendimiento en servidores FiveM: scripts, SQL, callbacks, recursos, streaming y lag para ESX y QBCore.',
  serviceType: 'Reparación y Optimización de Servidores FiveM',
});

const FAQs = [
  {
    question: '¿Pueden reparar un servidor FiveM que no inicia?',
    answer:
      'Sí. Revisamos logs, recursos con errores y configuración para identificar por qué el servidor no arranca o se cae al poco tiempo. El alcance exacto depende del diagnóstico: necesitamos acceso al servidor o al menos los logs y la lista de recursos para decirte qué está fallando y cómo corregirlo.',
  },
  {
    question: '¿Pueden trabajar con ESX y QBCore?',
    answer:
      'Sí, trabajamos con ambos frameworks y también revisamos migraciones entre ellos. Si tu servidor usa Qbox u otro framework, lo evaluamos caso por caso según el código disponible.',
  },
  {
    question: '¿Qué necesitan para diagnosticar un error?',
    answer:
      'Lo ideal es: framework y versión, descripción del problema, desde cuándo ocurre, logs o capturas del error, recursos afectados, número aproximado de jugadores y fecha objetivo. Cuanta más información proporciones, más rápido identificamos la causa. Nada de esto es obligatorio para escribirnos: el formulario solo pide lo esencial.',
  },
  {
    question: '¿Pueden revisar problemas de lag?',
    answer:
      'Sí. Analizamos consumo de recursos, tiempos de tick, callbacks y eventos, consultas SQL, streaming de ropa, vehículos y MLO, y recursos duplicados o innecesarios. Te explicamos qué encontramos y qué cambios reducen la carga, dentro del alcance aprobado.',
  },
  {
    question: '¿Trabajan con scripts protegidos o escrow?',
    answer:
      'No modificamos recursos protegidos o escrow fuera de lo que permiten sus términos y sus autores. Si el problema está dentro de un recurso protegido, te lo explicamos y buscamos alternativas compatibles: configuración, recursos complementarios o reemplazo con código propio.',
  },
  {
    question: '¿Tocan directamente el servidor de producción?',
    answer:
      'No sin acordarlo antes. Primero definimos el alcance y el procedimiento contigo, y cuando es posible aplicamos los cambios en un entorno controlado o de pruebas. No improvisamos sobre producción.',
  },
  {
    question: '¿Cuánto tarda un diagnóstico?',
    answer:
      'Depende del alcance, del acceso proporcionado, de la gravedad del problema y de la información disponible. Al recibir tu solicitud te orientamos sobre el siguiente paso y los tiempos estimados para tu caso. Respondemos inicialmente en menos de 24 horas.',
  },
  {
    question: '¿Qué ocurre si el problema requiere desarrollar una función nueva?',
    answer:
      'Si durante el diagnóstico vemos que la solución necesita un script nuevo, un MLO, vehículos o un pack de ropa, te lo explicamos y se cotiza como presupuesto separado. La reparación cubre corregir lo existente; el desarrollo nuevo siempre se acuerda aparte.',
  },
];

const symptoms = [
  {
    title: 'El servidor no inicia o se cae',
    description:
      'El servidor no arranca, se detiene solo o crashea al poco tiempo. Revisamos logs y recursos para encontrar qué lo impide.',
  },
  {
    title: 'Un recurso muestra errores',
    description:
      'Un script marca errores en consola o dejó de funcionar tras un cambio. Identificamos el recurso afectado y su causa.',
  },
  {
    title: 'Lag, stuttering o respuestas lentas',
    description:
      'Caídas de rendimiento con jugadores conectados. Analizamos consumo, ticks, callbacks y consultas que generan carga.',
  },
  {
    title: 'Inventario, HUD o interfaz rota',
    description:
      'Una interfaz dejó de abrirse o muestra datos incorrectos. Revisamos el recurso NUI y su integración con el framework.',
  },
  {
    title: 'Conflictos entre scripts o frameworks',
    description:
      'Dos recursos chocan entre sí o la migración ESX ↔ QBCore dejó funciones rotas. Detectamos la incompatibilidad y la resolvemos.',
  },
  {
    title: 'Una actualización rompió algo',
    description:
      'Tras actualizar un recurso, el framework o el servidor, algo dejó de funcionar. Rastreamos el cambio que lo provocó.',
  },
  {
    title: 'SQL o callbacks con carga innecesaria',
    description:
      'Consultas repetidas o eventos mal usados que saturan la base de datos. Revisamos queries y lógica para reducir la carga.',
  },
  {
    title: 'Streaming que afecta el rendimiento',
    description:
      'Ropa, vehículos o MLO que saturan la conexión de los jugadores. Evaluamos assets y proponemos optimizaciones.',
  },
];

const reviewChecklist = [
  'Logs del servidor',
  'Recursos con errores',
  'Uso de callbacks y eventos',
  'Consultas SQL',
  'Dependencias y compatibilidad',
  'Scripts ESX, QBCore o Qbox',
  'Inventario, HUD, NUI y recursos relacionados',
  'Streaming de ropa, vehículos y MLO',
  'Configuración de servidor y recursos',
  'Compatibilidad entre versiones',
  'Recursos duplicados o innecesarios',
  'Integración entre scripts',
];

const steps = [
  {
    title: 'Recibimos el síntoma y el contexto',
    description:
      'Nos cuentas qué ocurre, desde cuándo y con qué framework. Mientras más contexto, más rápido avanzamos.',
  },
  {
    title: 'Revisamos logs, recursos y configuración',
    description:
      'Analizamos la información disponible: errores en consola, recursos afectados y ajustes actuales.',
  },
  {
    title: 'Identificamos la causa y el alcance',
    description:
      'Te explicamos qué está fallando, por qué ocurre y qué implica corregirlo, en lenguaje claro.',
  },
  {
    title: 'Aplicamos la solución de forma controlada',
    description:
      'Cuando es posible, trabajamos en un entorno de pruebas antes de llevar cambios a producción.',
  },
  {
    title: 'Verificamos y documentamos',
    description:
      'Comprobamos el resultado, te entregamos notas de lo realizado y el siguiente paso sugerido.',
  },
];

const deliverables = [
  'Diagnóstico del problema',
  'Explicación clara de la causa encontrada, cuando sea posible',
  'Cambios realizados dentro del alcance aprobado',
  'Pruebas o verificaciones ejecutadas',
  'Notas de compatibilidad',
  'Recomendaciones de mantenimiento',
  'Siguiente paso sugerido',
];

const neededInfo = [
  'Framework y versión',
  'Descripción del problema',
  'Desde cuándo ocurre',
  'Logs o capturas si existen',
  'Recursos afectados',
  'Número aproximado de jugadores',
  'Fecha objetivo (beta, evento, reapertura)',
  'Acceso o información técnica mínima necesaria',
];

const scopeLimits = [
  'No modificamos recursos protegidos o escrow fuera de lo permitido por sus términos y autores.',
  'No copiamos assets sin autorización.',
  'Cambios grandes, scripts nuevos, MLOs, vehículos o packs de ropa pueden requerir un presupuesto separado.',
  'La reparación depende del acceso, los logs, el código disponible y las condiciones de cada recurso.',
  'No tocamos producción sin acordar previamente el alcance y el procedimiento.',
];

const relatedLinks = [
  { href: '/services/fivem', label: 'Servicios FiveM' },
  { href: '/services/fivem/scripts', label: 'Scripts personalizados' },
  { href: '/services/fivem/ropa', label: 'Packs de ropa y EUP' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/faqs', label: 'Preguntas frecuentes' },
];

export const metadata = createMetadata({
  title: 'Reparar y optimizar servidor FiveM: crash, errores y lag',
  description:
    'Reparamos errores, crashes y problemas de rendimiento en servidores FiveM. Diagnóstico de scripts, SQL, callbacks, recursos y lag para ESX y QBCore.',
  canonical: 'https://neenbyss.com/services/fivem/reparar-optimizar',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem/reparar-optimizar',
    // TODO(propietario): crear una OG específica de reparación/optimización.
    // Se usa la imagen de línea FiveM para no reutilizar la de otra oferta.
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'reparar servidor fivem',
    'servidor fivem crashea',
    'error script fivem',
    'optimizar servidor fivem',
    'lag servidor fivem',
    'soporte fivem',
    'diagnóstico servidor fivem',
    'reparar esx fivem',
    'reparar qbcore fivem',
    'programador fivem',
  ],
});

export const dynamic = 'error';

export default function FiveMRepairPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(repairStructuredData) }}
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
              Reparación y optimización de servidores FiveM: crash, errores y lag
            </h1>
            <p className='max-w-2xl'>
              Diagnosticamos y corregimos problemas de{' '}
              <strong>estabilidad, rendimiento y compatibilidad</strong> en servidores{' '}
              <strong>ESX y QBCore</strong>. Revisamos la causa, probamos la solución y te
              explicamos el <strong>siguiente paso con claridad</strong>.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href='/contact?service=fivem_support'>
                  Pedir diagnóstico
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/services/fivem'>Ver servicios FiveM</Link>
              </Button>
            </div>
            <p className='text-foreground-2/70 mt-4 text-sm'>
              Respuesta inicial en menos de 24 horas · No tocamos producción sin revisar el alcance
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
            Síntomas que atendemos
          </h2>
          <p className='max-w-2xl'>
            Si tu servidor presenta alguno de estos problemas, podemos ayudarte a diagnosticarlo y
            corregirlo.
          </p>

          <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {symptoms.map(({ title, description }) => (
              <Link
                key={title}
                href='/contact?service=fivem_support'
                className='group block h-full'
              >
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
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>Qué revisamos</h2>
            <p className='max-w-2xl'>
              Cada caso es distinto: revisamos lo que aplique a tu situación. El alcance final
              depende del diagnóstico y del acceso que puedas proporcionar.
            </p>

            <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
              {reviewChecklist.map((item) => (
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
          <p className='max-w-2xl'>Un proceso claro para que sepas qué esperar en cada momento.</p>

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
                Qué necesitamos
              </h2>
              <p className='max-w-xl'>
                Esta información acelera el diagnóstico. Solo el formulario pide lo esencial; el
                resto puedes compartirlo cuando te contactemos.
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
          </div>
        </section>

        <section className='container-screen-xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
            Alcance y límites
          </h2>
          <p className='max-w-2xl'>
            Trabajamos con honestidad sobre lo que sí y lo que no podemos hacer.
          </p>
          <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
            {scopeLimits.map((item) => (
              <li key={item} className='bg-content-1 border-ring rounded-2xl border p-5'>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className='container-screen-lg py-25'>
          <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
            Preguntas Frecuentes sobre Reparación y Optimización FiveM
          </h2>

          <TrackedAccordion
            collapsible
            className='flex flex-col gap-4'
            location='fivem_reparar_optimizar'
          >
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
              ¿Tu servidor FiveM tiene errores, lag o caídas?
            </h2>
            <p className='mx-auto max-w-xl'>
              Cuéntanos qué está ocurriendo y te orientaremos sobre el diagnóstico, el alcance y el
              siguiente paso.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-2'>
              <Button asChild size='xl'>
                <Link href='/contact?service=fivem_support'>
                  Pedir diagnóstico
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size='xl' variant='outline'>
                <Link href='/services/fivem'>Ver servicios FiveM</Link>
              </Button>
            </div>
            <p className='text-foreground-2/70 mx-auto mt-4 max-w-xl text-sm'>
              Para orientarte más rápido, incluye qué error ves, cuándo empezó y tu framework (ESX,
              QBCore o Qbox).
            </p>
            <nav
              aria-label='Servicios relacionados'
              className='mt-10 flex flex-wrap justify-center gap-2'
            >
              {relatedLinks.map(({ href, label }) => (
                <Button key={href} asChild variant='flat' size='sm'>
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
