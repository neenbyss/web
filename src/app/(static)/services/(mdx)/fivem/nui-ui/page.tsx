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

const CONTACT_HREF = '/contact?service=fivem_nui_ui';

const nuiStructuredData = generateStructuredData('Service', {
  name: 'Diseño NUI/HUD para FiveM',
  description:
    'Diseño y desarrollo de interfaces NUI para FiveM: pause menu, HUD, teléfono, inventario y paneles personalizados para ESX y QBCore.',
  serviceType: 'Diseño de Interfaces NUI para FiveM',
});

const FAQs = [
  {
    question: '¿Qué interfaces NUI pueden diseñar?',
    answer:
      'Pause menu, HUD, teléfono, inventario, menús de trabajo, tiendas, paneles administrativos, MDT, pantallas de carga, alertas, notificaciones y modales. Cada interfaz se diseña según tu servidor: no son plantillas genéricas adaptadas a última hora.',
  },
  {
    question: '¿Pueden rediseñar un script que ya compré?',
    answer:
      'Sí, es uno de nuestros trabajos más comunes: cambiamos colores, logos, tipografía, distribución y coherencia visual de interfaces existentes. El alcance depende del código disponible y de las condiciones de licencia del recurso.',
  },
  {
    question: '¿Trabajan con ESX y QBCore?',
    answer:
      'Sí. Diseñamos e integramos interfaces para recursos de ambos frameworks. La compatibilidad final depende del script concreto y de sus eventos y callbacks.',
  },
  {
    question: '¿Pueden integrar la interfaz con mi script?',
    answer:
      'Sí, integramos la NUI con la lógica existente: eventos, callbacks y estados del recurso. Para hacerlo necesitamos acceso al código o, como mínimo, a su documentación de eventos. Sin eso, solo podemos entregar el diseño visual.',
  },
  {
    question: '¿Qué ocurre si el recurso es escrow?',
    answer:
      'Los recursos protegidos o escrow limitan lo que se puede modificar. No los alteramos fuera de lo permitido por sus términos y autores. Si el rediseño no es viable sobre ese recurso, te proponemos alternativas: ajustes de configuración permitidos o una interfaz nueva sobre código propio.',
  },
  {
    question: '¿La UI incluye la lógica del script?',
    answer:
      'No automáticamente. El rediseño visual y la lógica son trabajos distintos: rediseñar cambia cómo se ve y se usa; desarrollar la lógica crea cómo funciona. Si tu interfaz necesita también lógica nueva, se cotiza como desarrollo aparte.',
  },
  {
    question: '¿Pueden adaptar la interfaz a mi branding?',
    answer:
      'Sí. Trabajamos con tu identidad visual: logo, colores, tipografía y estilo del servidor o comunidad. Si aún no tienes branding definido, te ayudamos a establecer una dirección visual coherente antes de diseñar.',
  },
  {
    question: '¿Entregan el código fuente?',
    answer:
      'Entregamos el código de lo que diseñamos y desarrollamos nosotros, documentado. El código de recursos de terceros o protegidos sigue perteneciendo a sus autores y sus licencias.',
  },
  {
    question: '¿Cuánto cuesta una interfaz para FiveM?',
    answer:
      'Depende del alcance: tipo de interfaz, si es rediseño o creación nueva, integración necesaria, estados y resoluciones. No hay precio único: cuéntanos qué interfaz tienes o quieres construir y te pasamos una propuesta sin compromiso.',
  },
  {
    question: '¿Cuánto tarda el diseño y desarrollo?',
    answer:
      'Depende del alcance aprobado, del recurso existente y de las revisiones. Tras revisar tu caso te damos una estimación para tu proyecto concreto. Respondemos inicialmente en menos de 24 horas.',
  },
];

const situations = [
  {
    title: 'Script funcional, interfaz genérica',
    description:
      'El sistema trabaja bien, pero su interfaz parece la de cualquier otro servidor. Le damos una identidad visual propia.',
  },
  {
    title: 'Interfaces incoherentes entre sí',
    description:
      'Cada script usa colores y estilos distintos. Unificamos pause menu, HUD, teléfono e inventario bajo una misma dirección visual.',
  },
  {
    title: 'Rediseño de pause menu, HUD o inventario',
    description:
      'Quieres renovar las interfaces principales sin cambiar la lógica. Rediseñamos sobre tu recurso existente.',
  },
  {
    title: 'UI que no se adapta a resoluciones',
    description:
      'Elementos que se rompen o se ven mal según la pantalla. Diseñamos pensando en distintas resoluciones desde el inicio.',
  },
  {
    title: 'Integrar interfaz con script existente',
    description:
      'Tienes el diseño o la idea y necesitas conectarlo con los eventos y callbacks de tu recurso.',
  },
  {
    title: 'Nueva marca para apertura o relanzamiento',
    description:
      'Vas a abrir o relanzar y quieres que todo —interfaces incluidas— comunique la nueva identidad del servidor.',
  },
];

const interfaces = [
  'Pause menu',
  'HUD',
  'Teléfono',
  'Inventario',
  'Menús de trabajo',
  'Tiendas',
  'Paneles administrativos',
  'MDT',
  'Pantallas de carga',
  'Alertas, notificaciones y modales',
];

const included = [
  'Dirección visual',
  'Paleta, tipografía y componentes',
  'Wireframes o prototipo',
  'Diseño responsive',
  'Implementación HTML/CSS/JS',
  'Integración NUI con React o Vue según el caso',
  'Integración con eventos y callbacks del recurso',
  'Estados de carga, error, vacío y confirmación',
  'Documentación y changelog',
  'Pruebas en entorno controlado cuando sea posible',
];

const steps = [
  {
    title: 'Revisamos script y objetivo',
    description: 'Analizamos tu recurso, tus referencias y qué experiencia visual quieres lograr.',
  },
  {
    title: 'Definimos arquitectura visual',
    description:
      'Establecemos componentes, jerarquía y estilos antes de diseñar pantallas sueltas.',
  },
  {
    title: 'Propuesta o prototipo',
    description: 'Te mostramos la dirección visual para validar antes de implementar e integrar.',
  },
  {
    title: 'Implementación e integración',
    description: 'Desarrollamos la NUI y la conectamos con los eventos y callbacks del recurso.',
  },
  {
    title: 'Pruebas y compatibilidad',
    description: 'Verificamos estados, resoluciones y compatibilidad con tu framework y recursos.',
  },
];

const approaches = [
  {
    title: 'Ajustar estilos existentes',
    description:
      'Cuando la estructura funciona: colores, tipografía, logos y detalles sin tocar la arquitectura.',
  },
  {
    title: 'Rediseñar la arquitectura visual',
    description:
      'Cuando la interfaz confunde: nueva distribución, jerarquía y componentes sobre el mismo recurso.',
  },
  {
    title: 'Crear una interfaz nueva',
    description:
      'Cuando nada de lo existente sirve: diseño completo conectado a tus eventos y callbacks.',
  },
  {
    title: 'Desarrollar también la lógica',
    description:
      'Cuando además hace falta funcionalidad: se cotiza como desarrollo de script aparte.',
  },
];

const neededInfo = [
  'Tipo de interfaz',
  'Capturas o referencias',
  'Script y framework',
  'Código disponible o condiciones de escrow',
  'Resoluciones objetivo',
  'Identidad visual',
  'Estados y acciones necesarias',
  'Fecha objetivo',
];

const limits = [
  'Los scripts protegidos o escrow pueden limitar los cambios posibles.',
  'La lógica compleja se cotiza aparte del trabajo visual.',
  'Assets, logos, fuentes y recursos externos deben contar con autorización.',
  'La integración depende del código y los eventos disponibles del recurso.',
  'Desarrollar un script desde cero no es automáticamente parte de un rediseño visual.',
];

const relatedLinks = [
  { href: '/services/fivem', label: 'Servicios FiveM' },
  { href: '/services/fivem/scripts', label: 'Scripts personalizados' },
  { href: '/services/fivem/reparar-optimizar', label: 'Reparar y optimizar' },
  { href: '/services/fivem/crear-servidor', label: 'Crear servidor' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/faqs', label: 'Preguntas frecuentes' },
];

export const metadata = createMetadata({
  title: 'Diseño NUI/HUD para FiveM: pause menu, HUD e inventario',
  description:
    'Diseñamos y desarrollamos interfaces NUI para FiveM: pause menu, HUD, teléfono, inventario y paneles personalizados para ESX y QBCore.',
  canonical: 'https://neenbyss.com/services/fivem/nui-ui',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem/nui-ui',
    // TODO(propietario): crear una OG específica de diseño NUI.
    // Se usa la imagen de línea FiveM para no reutilizar la de otra oferta.
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'diseño nui fivem',
    'hud fivem personalizado',
    'pause menu fivem',
    'inventario fivem custom',
    'telefono fivem nui',
    'rediseño interfaz fivem',
    'ui fivem esx',
    'ui fivem qbcore',
    'interfaces roleplay fivem',
    'programador fivem',
  ],
});

export const dynamic = 'error';

export default function FiveMNuiPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nuiStructuredData) }}
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
              Diseño NUI para FiveM: interfaces que hacen propio tu servidor
            </h1>
            <p className='max-w-2xl'>
              Diseñamos y desarrollamos{' '}
              <strong>pause menus, HUD, teléfonos, inventarios y paneles personalizados</strong>{' '}
              para que la experiencia visual de tu servidor sea{' '}
              <strong>coherente con su identidad</strong> y funcione con tus recursos.
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href={CONTACT_HREF}>
                  Cotizar mi interfaz
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/projects/code_iq_pausemenu'>Ver proyectos FiveM</Link>
              </Button>
            </div>
            <p className='text-foreground-2/70 mt-4 text-sm'>
              Respuesta inicial en menos de 24 horas · Alcance y entregables claros · Sin compromiso
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
            Si tus interfaces se ven genéricas, incoherentes o desactualizadas, podemos ayudarte.
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
                      Cotizar mi interfaz <ArrowRightIcon className='size-4' />
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
              Interfaces que podemos diseñar
            </h2>
            <p className='max-w-2xl'>
              Ejemplos de lo que diseñamos. Cada proyecto define su alcance: no todo viene en un
              único paquete.
            </p>

            <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
              {interfaces.map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='container-screen-2xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
            Qué incluye el trabajo
          </h2>
          <p className='max-w-2xl'>
            Según el alcance aprobado para tu interfaz y tu recurso existente.
          </p>

          <ul className='mt-10 grid gap-4 sm:grid-cols-2'>
            {included.map((item) => (
              <li key={item} className='bg-content-1 border-ring rounded-2xl border p-5'>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className='bg-content border-y py-20'>
          <div className='container-screen-2xl'>
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
              Cómo trabajamos
            </h2>
            <p className='max-w-2xl'>De la referencia a la interfaz integrada en tu servidor.</p>

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
          </div>
        </section>

        <section className='container-screen-2xl py-20'>
          <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
            Rediseño frente a desarrollo desde cero
          </h2>
          <p className='max-w-2xl'>
            No todos los casos necesitan lo mismo. Te orientamos sobre el camino correcto.
          </p>

          <div className='mt-12 grid gap-6 md:grid-cols-2'>
            {approaches.map(({ title, description }) => (
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
        </section>

        <section className='bg-content border-y py-20'>
          <div className='container-screen-xl'>
            <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>
              Caso de referencia: CodeIQ Pause Menu
            </h2>
            <p className='max-w-2xl'>
              Participamos en el <strong>rediseño de interfaz (UI) del Pause Menu de CodeIQ</strong>
              : una interfaz premium para servidores FiveM, compatible con{' '}
              <strong>QBCore y ESX</strong>, con estética neón-gamer y distribución modular. Nos
              encargamos exclusivamente de la fase de diseño visual; el desarrollo del script
              pertenece a CodeIQ.
            </p>
            <div className='mt-8 flex flex-wrap gap-2'>
              <Button asChild>
                <Link href='/projects/code_iq_pausemenu'>
                  Ver el caso CodeIQ
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href={CONTACT_HREF}>Quiero algo así para mi servidor</Link>
              </Button>
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
                Esta información acelera tu propuesta. El formulario solo pide lo esencial.
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
              <h2 className='text-foreground mb-4 text-xl font-medium sm:text-4xl'>Límites</h2>
              <p className='max-w-xl'>
                Para que sepas desde el inicio qué sí y qué no podemos hacer.
              </p>
              <ul className='mt-8 flex flex-col gap-4'>
                {limits.map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <CheckTaskIcon className='text-primary mt-1 shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className='container-screen-lg py-25'>
          <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
            Preguntas Frecuentes sobre Diseño NUI para FiveM
          </h2>

          <TrackedAccordion collapsible className='flex flex-col gap-4' location='fivem_nui_ui'>
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
              ¿Quieres que tu servidor se vea realmente propio?
            </h2>
            <p className='mx-auto max-w-xl'>
              Cuéntanos qué interfaz tienes o qué experiencia quieres construir y te orientaremos
              sobre alcance, integración y siguiente paso.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-2'>
              <Button asChild size='xl'>
                <Link href={CONTACT_HREF}>
                  Cotizar mi interfaz
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
