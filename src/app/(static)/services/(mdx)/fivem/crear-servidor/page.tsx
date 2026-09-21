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

const CONTACT_HREF = '/contact?service=fivem_configuration_plan_personalizado';

const setupStructuredData = generateStructuredData('Service', {
  name: 'Crear Servidor FiveM desde Cero',
  description:
    'Creación y configuración de servidores FiveM desde cero: framework, base de datos, recursos, permisos y pruebas para ESX y QBCore.',
  serviceType: 'Creación y Configuración de Servidores FiveM',
});

const FAQs = [
  {
    question: '¿Pueden crear un servidor FiveM desde cero?',
    answer:
      'Sí. Partimos de tu idea de roleplay y construimos una base funcional: definimos el framework, configuramos los recursos, conectamos la base de datos, ajustamos permisos y probamos el resultado antes de avanzar. Recibes una base limpia, documentada y lista para crecer.',
  },
  {
    question: '¿Trabajan con ESX, QBCore y Qbox?',
    answer:
      'Sí, trabajamos con ESX y QBCore, y evaluamos Qbox según tu proyecto. Ningún framework es mejor en todos los casos: la decisión depende de tu idea, los recursos que ya tengas, tu equipo y tus objetivos. Te ayudamos a elegir con criterios técnicos, no por moda.',
  },
  {
    question: '¿Qué necesito tener antes de comenzar?',
    answer:
      'Solo tu idea y el estilo de roleplay que imaginas. Si ya tienes framework preferido, recursos comprados, hosting o fecha objetivo, compártelo y lo integramos en la propuesta. Si no tienes nada de eso, también podemos empezar: el descubrimiento sirve para definirlo.',
  },
  {
    question: '¿Pueden ayudarme a elegir framework y recursos?',
    answer:
      'Sí, es parte del trabajo. Revisamos tu idea, los recursos existentes que te interesan y los que ya posees, y te decimos qué conviene comprar, configurar, extender o desarrollar, qué puede generar incompatibilidades y qué conviene dejar para una segunda etapa.',
  },
  {
    question: '¿Incluyen scripts de pago, ropa, vehículos o MLOs?',
    answer:
      'Depende del alcance aprobado. Los scripts de pago no están incluidos salvo acuerdo expreso, y assets como MLOs, vehículos o ropa/EUP pueden cotizarse aparte. Distinguimos siempre entre recursos existentes, licencias de terceros (que adquieres tú) y desarrollo propio. Puedes ver ejemplos en nuestras páginas de scripts y ropa.',
  },
  {
    question: '¿Puedo empezar con una versión básica y añadir funciones después?',
    answer:
      'Sí, y es lo recomendable. Definimos una base funcional con lo esencial (framework, base de datos, permisos, economía e interfaces base) y dejamos una ruta clara de evolución: cada función adicional se integra después sin desordenar la configuración inicial.',
  },
  {
    question: '¿El hosting está incluido?',
    answer:
      'No automáticamente. El hosting, VPS, dominios y servicios de terceros dependen de la propuesta y se contratan aparte. Te orientamos sobre qué necesitas según tu escala objetivo, pero la infraestructura la eliges y la pagas tú.',
  },
  {
    question: '¿Cuánto cuesta crear un servidor FiveM?',
    answer:
      'Depende del alcance, los recursos, la complejidad, las integraciones y la propiedad de los assets. No hay un precio único: tras el descubrimiento te pasamos una propuesta con alcance cerrado o un Plan Personalizado. Cuéntanos tu idea en el formulario y te orientamos sin compromiso.',
  },
  {
    question: '¿Cuánto tarda el armado?',
    answer:
      'Depende del alcance definido después del descubrimiento: no prometemos fechas fijas antes de conocer tu proyecto. Comparte tu fecha objetivo (beta o apertura) y la usamos para planificar qué entra en la primera entrega y qué queda para después.',
  },
  {
    question: '¿Pueden mantener el servidor después de entregarlo?',
    answer:
      'Sí. Una vez entregada la base, puedes contratar un plan mensual de mantenimiento y evolución según la etapa de tu servidor. Así el servidor queda acompañado después del lanzamiento, no solo configurado.',
  },
];

const situations = [
  {
    title: 'Tengo una idea, no una base técnica',
    description:
      'Sabes qué roleplay quieres, pero no cómo convertirlo en servidor. Traducimos tu idea en una base funcional y ordenada.',
  },
  {
    title: 'Quiero abrir una comunidad',
    description:
      'Necesitas organizar el proyecto antes de instalar recursos: base estable, permisos y estructura lista para recibir jugadores.',
  },
  {
    title: 'No sé si ESX, QBCore o Qbox',
    description:
      'Cada framework tiene ventajas según tu caso. Te ayudamos a elegir con criterios técnicos, no por moda.',
  },
  {
    title: 'Tengo recursos sin integrar',
    description:
      'Compraste o conseguiste scripts y no sabes cómo integrarlos. Los revisamos, configuramos los compatibles y te decimos qué sobra.',
  },
  {
    title: 'Necesito sistemas conectados',
    description:
      'Jobs, economía, inventario, vehículos y permisos funcionando juntos, no una suma de recursos sueltos que chocan entre sí.',
  },
  {
    title: 'Quiero crecer sin desorden',
    description:
      'Una base preparada para añadir funciones después, sin acumular configuraciones improvisadas que luego nadie entiende.',
  },
];

const scopeExamples = [
  'Selección o confirmación del framework',
  'Configuración inicial del servidor',
  'Base de datos y conexión con el servidor',
  'Estructura de recursos',
  'Permisos y roles administrativos',
  'Configuración de inventario',
  'Economía inicial',
  'Jobs y negocios base',
  'Vehículos y configuraciones iniciales',
  'Integración de recursos compatibles',
  'Configuración de UI o recursos visuales existentes',
  'Entorno de pruebas cuando sea posible',
  'Documentación básica de configuración',
];

const steps = [
  {
    title: 'Descubrimiento',
    description:
      'Entendemos tu idea, el público al que apuntas, el estilo de roleplay y tu fecha objetivo.',
  },
  {
    title: 'Definición técnica',
    description:
      'Revisamos framework, recursos, hosting, base de datos y dependencias de tu proyecto.',
  },
  {
    title: 'Alcance y propuesta',
    description:
      'Separamos lo esencial, lo opcional y lo que requiere desarrollo adicional, con propuesta clara.',
  },
  {
    title: 'Configuración y desarrollo',
    description: 'Instalamos, integramos y adaptamos todo lo aprobado en la propuesta.',
  },
  {
    title: 'Pruebas y entrega',
    description:
      'Verificamos el flujo acordado, documentamos lo realizado y definimos el siguiente paso.',
  },
];

const decisions = [
  {
    title: 'ESX frente a QBCore/Qbox',
    description:
      'Comparamos opciones según tu idea, recursos disponibles, equipo y objetivos. Sin favoritismos: la decisión depende de tu proyecto.',
  },
  {
    title: 'Existente frente a personalizado',
    description:
      'Te decimos qué conviene comprar, configurar, extender o desarrollar desde cero según costo, tiempo y mantenimiento.',
  },
  {
    title: 'Qué puede dar incompatibilidades',
    description:
      'Revisamos recursos que suelen chocar entre sí o con ciertos frameworks antes de que los instales.',
  },
  {
    title: 'Qué dejar para después',
    description:
      'Priorizamos lo esencial para abrir y dejamos funciones secundarias para una segunda etapa, sin bloquear el crecimiento.',
  },
  {
    title: 'Cómo evitar funciones innecesarias',
    description:
      'Evitamos instalar de inicio todo lo que suena atractivo pero tu servidor aún no necesita ni puede mantener.',
  },
  {
    title: 'Qué depende de terceros',
    description:
      'Identificamos qué elementos dependen de tu hosting, VPS o licencias externas para que no haya sorpresas.',
  },
];

const deliverables = [
  'Servidor configurado según el alcance',
  'Recursos integrados y documentados',
  'Base de datos conectada',
  'Permisos y configuraciones iniciales',
  'Lista de dependencias',
  'Registro de cambios',
  'Pruebas realizadas',
  'Recomendaciones para la siguiente etapa',
  'Explicación de lo que quedó fuera del alcance',
];

const notIncluded = [
  'Scripts de pago no incluidos salvo acuerdo expreso.',
  'MLOs, vehículos, ropa/EUP o assets externos pueden cotizarse aparte.',
  'El desarrollo de sistemas complejos puede requerir un presupuesto separado.',
  'Hosting, VPS, dominios y servicios de terceros no se incluyen automáticamente.',
  'Las licencias de recursos y assets corresponden a quien los adquiera, salvo acuerdo distinto.',
  'Migrar un servidor existente no es igual que crear uno desde cero.',
  'El soporte mensual se contrata según el plan correspondiente.',
];

const neededInfo = [
  'Idea y estilo del servidor',
  'Framework preferido, si ya lo tiene',
  'Número aproximado de slots o jugadores objetivo',
  'Fecha estimada de beta o apertura',
  'Recursos o scripts que ya posee',
  'Hosting o VPS previsto',
  'Funciones prioritarias',
  'Referencias visuales o servidores de referencia',
  'Presupuesto orientativo, si desea compartirlo',
];

const relatedLinks = [
  { href: '/services/fivem', label: 'Servicios FiveM' },
  { href: '/services/fivem/reparar-optimizar', label: 'Reparar y optimizar' },
  { href: '/services/fivem/scripts', label: 'Scripts personalizados' },
  { href: '/services/fivem/ropa', label: 'Packs de ropa y EUP' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/faqs', label: 'Preguntas frecuentes' },
];

export const metadata = createMetadata({
  title: 'Crear servidor FiveM desde cero: ESX y QBCore',
  description:
    'Creamos y configuramos servidores FiveM desde cero: framework, base de datos, recursos, permisos y pruebas para ESX y QBCore. Cotiza tu proyecto.',
  canonical: 'https://neenbyss.com/services/fivem/crear-servidor',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem/crear-servidor',
    // TODO(propietario): crear una OG específica de creación de servidores.
    // Se usa la imagen de línea FiveM para no reutilizar la de otra oferta.
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'crear servidor fivem',
    'crear servidor fivem desde cero',
    'configurar servidor fivem',
    'servidor fivem esx',
    'servidor fivem qbcore',
    'montar servidor roleplay',
    'base servidor fivem',
    'programador fivem',
    'abrir servidor fivem',
    'comunidad roleplay fivem',
  ],
});

export const dynamic = 'error';

export default function FiveMSetupPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(setupStructuredData) }}
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
              Crear servidor FiveM desde cero: una base limpia, documentada y lista para crecer
            </h1>
            <p className='max-w-2xl'>
              Te ayudamos a convertir tu <strong>idea de roleplay en un servidor funcional</strong>:
              definimos la base, <strong>configuramos los recursos</strong>, conectamos la{' '}
              <strong>base de datos</strong> y probamos el resultado antes de avanzar.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href={CONTACT_HREF}>
                  Cotizar mi servidor
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/services/fivem'>Ver servicios FiveM</Link>
              </Button>
            </div>
            <p className='text-foreground-2/70 mt-4 text-sm'>
              Respuesta inicial en menos de 24 horas · Alcance y siguiente paso claros · Sin
              compromiso
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
            Si estás en alguno de estos puntos, podemos convertir tu idea en un servidor jugable.
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
                      Cuéntanos tu idea <ArrowRightIcon className='size-4' />
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
              Qué puede incluir el armado
            </h2>
            <p className='max-w-2xl'>
              El alcance se define según la propuesta aprobada. Estos son ejemplos de elementos que
              puede incluir el proyecto, no una lista automática de incluidos.
            </p>

            <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
              {scopeExamples.map((item) => (
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
          <p className='max-w-2xl'>
            De la idea a la entrega, con claridad en cada etapa. Probamos en un entorno controlado
            cuando el proyecto y la infraestructura lo permiten.
          </p>

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
          <div className='container-screen-xl'>
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
              Decisiones técnicas que ayudamos a tomar
            </h2>
            <p className='max-w-2xl'>
              La decisión correcta depende de tu proyecto, recursos, equipo y objetivos.
            </p>

            <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {decisions.map(({ title, description }) => (
                <Card key={title} className='flex h-full flex-col border-2'>
                  <CardHeader>
                    <CardTitle className='text-base sm:text-xl'>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground'>{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className='container-screen-2xl py-20'>
          <div className='grid gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>Qué recibes</h2>
              <p className='max-w-xl'>
                Entregables posibles, siempre condicionados al alcance aprobado en la propuesta.
              </p>
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
              <p className='max-w-xl'>
                Para evitar malentendidos, esto se acuerda aparte cuando aplica.
              </p>
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

        <section className='bg-content border-y py-20'>
          <div className='container-screen-xl grid gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
                Qué necesitamos de ti
              </h2>
              <p className='max-w-xl'>
                Esta información nos ayuda a preparar tu propuesta. El formulario solo pide lo
                esencial; el resto puedes incluirlo en tu mensaje.
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
                Planes y contratación
              </h2>
              <p className='max-w-xl'>
                El armado desde cero se trabaja como{' '}
                <strong>Plan Personalizado o proyecto con alcance cerrado</strong>: definimos
                contigo qué entra, qué queda fuera y en qué orden. No está incluido automáticamente
                en los planes mensuales estándar.
              </p>
              <p className='mt-4 max-w-xl'>
                Después de la entrega, puedes contratar un{' '}
                <strong>plan mensual para mantenimiento y evolución</strong> según la etapa de tu
                servidor.
              </p>
              <div className='mt-8 flex flex-wrap gap-2'>
                <Button asChild>
                  <Link href={CONTACT_HREF}>
                    Cuéntanos tu idea
                    <ArrowRightIcon />
                  </Link>
                </Button>
                <Button asChild variant='outline'>
                  <Link href='/services/fivem'>Ver planes FiveM</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className='container-screen-lg py-25'>
          <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
            Preguntas Frecuentes sobre Crear un Servidor FiveM
          </h2>

          <TrackedAccordion
            collapsible
            className='flex flex-col gap-4'
            location='fivem_crear_servidor'
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
              ¿Tienes una idea de servidor FiveM?
            </h2>
            <p className='mx-auto max-w-xl'>
              Cuéntanos tu idea y te orientaremos sobre el alcance, la propuesta y el siguiente
              paso.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-2'>
              <Button asChild size='xl'>
                <Link href={CONTACT_HREF}>
                  Cotizar mi servidor
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size='xl' variant='outline'>
                <Link href='/services/fivem'>Ver servicios FiveM</Link>
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
