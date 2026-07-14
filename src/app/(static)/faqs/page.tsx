import Link from 'next/link';
import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import { createMetadata } from '@/lib/metadata';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { QuestionIcon } from '@/icons/question';

export const metadata = createMetadata({
  title: 'Preguntas Frecuentes',
  description:
    'Resuelve tus dudas sobre nuestros servicios de desarrollo web, diseño UI/UX, programación FiveM, scripts personalizados, packs de ropa EUP, bots de Discord y soporte técnico.',
  canonical: 'https://neenbyss.com/faqs',
  keywords: [
    'preguntas frecuentes neenbyss',
    'faq programador fivem',
    'faq desarrollo web',
    'dudas scripts fivem',
    'dudas pack de ropa fivem',
    'dudas esx qbcore',
    'faq desarrolladores fivem',
    'contratar programador fivem',
    'neenbyss dudas',
  ],
});

const generalFaqs = [
  {
    question: '¿Qué servicios ofrece Neenbyss?',
    answer:
      'Nos especializamos en cuatro pilares: desarrollo web (landing pages, sitios corporativos, e-commerce, dashboards), diseño UI/UX, desarrollo para FiveM (scripts personalizados, configuración de servidores, packs de ropa, MLO, interfaces NUI) y bots de Discord.',
  },
  {
    question: '¿Cómo es el proceso de trabajo con Neenbyss?',
    answer:
      'Partimos de una reunión de descubrimiento sin compromiso. Cuando el alcance está claro entregamos cotización y cronograma. Durante el desarrollo gestionamos todo en Trello con prioridades (Baja / Media / Alta) y cuatro estados (Tareas, En proceso, Testeando, Terminado) para que veas el progreso en tiempo real.',
  },
  {
    question: '¿Qué tipos de proyectos han desarrollado?',
    answer:
      'Landing pages, sitios corporativos, e-commerce, dashboards, integraciones con APIs, servidores FiveM completos, scripts a medida (ESX y QBCore), rediseños de interfaces NUI para FiveM (como el Pause Menu de CodeIQ) y bots de Discord con automatizaciones. Puedes revisar el portafolio en la sección Proyectos.',
  },
  {
    question: '¿Ofrecen servicios de mantenimiento y soporte?',
    answer:
      'Sí. Para servidores FiveM contamos con planes mensuales (Bronce, Plata, Oro, Platino, Diamante y personalizados) con horas garantizadas y tiempos de respuesta definidos. Para webs y aplicaciones ofrecemos mantenimiento por bloques de horas o proyectos puntuales.',
  },
  {
    question: '¿Qué tecnologías utilizan?',
    answer:
      'En web: Next.js, React, TypeScript, Tailwind CSS, Node.js, Nest, PostgreSQL, MySQL y MongoDB. En FiveM: Lua 5.4, ESX Legacy, QBCore (con bridge propio), ox_lib, oxmysql y NUI con HTML/CSS/JS, React o Vue. Para Discord: discord.js y Python cuando aplica.',
  },
  {
    question: '¿Pueden integrarse con sistemas existentes?',
    answer:
      'Sí. Conectamos aplicaciones con pasarelas de pago, CRMs, ERPs, plataformas de envío, APIs internas y servicios de terceros. Para FiveM, integramos con frameworks ESX y QBCore existentes sin requerir reescrituras completas.',
  },
  {
    question: '¿Cómo manejan la seguridad?',
    answer:
      'Validación server-side en scripts FiveM como norma (nunca confiar en el cliente), cifrado de datos, autenticación y autorización con mejores prácticas, protección contra SQL injection, CSRF y XSS en webs, y pruebas de penetración cuando el proyecto lo requiere.',
  },
  {
    question: '¿Cuál es la política de precios?',
    answer:
      'Variamos según complejidad. Webs y software a medida: cotización por proyecto. Scripts FiveM: desde 50 USD (sencillos) hasta 2000 USD (complejos). Packs de ropa FiveM: desde 30 USD. Planes mensuales FiveM: desde 40.50 USD/mes. Siempre cotizamos sin compromiso tras revisar el brief.',
  },
  {
    question: '¿Tienen experiencia con transformación digital?',
    answer:
      'Sí. Ayudamos a empresas y comunidades a modernizar procesos: migración de webs legacy, automatización con integraciones, dashboards de métricas en tiempo real y, en el mundo FiveM, migraciones de servidores completos entre frameworks (ESX ↔ QBCore).',
  },
  {
    question: '¿Ofrecen consultoría técnica?',
    answer:
      'Sí, desde la evaluación inicial hasta la hoja de ruta. Podemos auditar código existente, recomendar stacks, validar decisiones de arquitectura o diagnosticar problemas de rendimiento en servidores FiveM en producción.',
  },
];

const fivemFaqs = [
  {
    question: '¿Ofrecen programación FiveM a medida?',
    answer:
      'Sí, somos un equipo de programadores FiveM con experiencia en ESX Legacy, QBCore, Lua 5.4, NUI y arquitectura de servidores RP. Creamos, configuramos y reparamos servidores desde cero, y desarrollamos scripts únicos según la temática de tu servidor. Consulta el detalle en /services/fivem.',
  },
  {
    question: '¿Qué frameworks FiveM soportan?',
    answer:
      'Trabajamos de forma nativa con ESX Legacy y QBCore. Usamos un bridge propio (nb-bridge) que permite que nuestros scripts funcionen en ambos frameworks sin duplicar código. Para otros frameworks (QBox, ND, Ox Core, Qbus, vRP) evaluamos la integración caso por caso. Más detalle en nuestra página de scripts FiveM.',
  },
  {
    question: '¿Hacen packs de ropa y EUP para FiveM?',
    answer:
      'Sí. Diseñamos packs de ropa stream-ready y sin marcas reales: civiles, trabajos, uniformes EUP para policía, EMS y bomberos, ropa de mafias y prendas custom a medida sobre MP male/female. Compatibles con ESX y QBCore y optimizados para no saturar el streaming. Detalle y precios en /services/fivem/ropa.',
  },
  {
    question: '¿Crean servidores FiveM desde cero?',
    answer:
      'Sí. Configuramos servidores FiveM completos según la temática (policial, urbano, realista, survival): instalación de recursos base, base de datos, permisos, framework ESX o QBCore, economía, trabajos, vehículos, interfaces y optimización. Entregamos el servidor listo para abrir a la comunidad.',
  },
  {
    question: '¿Tengo que tener ya un servidor FiveM para contratar scripts?',
    answer:
      'No. Si ya tienes servidor, desarrollamos el script para tu entorno concreto. Si no lo tienes, podemos configurarte uno desde cero o entregar el script como recurso independiente con documentación para que lo instales tú o tu equipo técnico cuando lo tengas listo.',
  },
  {
    question: '¿Desde qué países pueden contratar los servicios FiveM?',
    answer:
      'Somos un equipo hispanohablante con clientes en España, México, Chile, Perú, Colombia, Argentina y resto de Latinoamérica. Trabajamos por Discord y Trello, coordinamos horarios según tu zona (UTC-6 a UTC+1) y facturamos en USD. También atendemos servidores internacionales en inglés.',
  },
  {
    question: '¿Puedo ver ejemplos reales de vuestro trabajo en FiveM?',
    answer:
      'Sí. En la sección Proyectos tienes casos de estudio como el rediseño del Pause Menu FiveM que hicimos para CodeIQ, entre otros trabajos con interfaces NUI y webs para servidores de rol. Cada ficha explica el alcance y nuestra participación.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [...generalFaqs, ...fivemFaqs].map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};

export default function FAQS() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main className='container-screen-xl flex flex-col justify-between gap-4 space-y-6 pt-8 pb-8 lg:flex-row'>
        <section className='w-full'>
          <AppBreadcrumb className='mb-3 bg-transparent px-0 py-0' />
          <h1 className='mt-2 mb-6 text-4xl font-medium md:text-6xl'>Resuelve Tus Dudas</h1>

          <p>
            Preguntas frecuentes sobre desarrollo web, UI/UX, programación FiveM, scripts, packs de
            ropa y bots de Discord.
          </p>
          <span>
            <Link href='/contact' className='text-primary hover:underline'>
              {' '}
              Contáctanos{' '}
            </Link>
            <span> y obtén la información que necesitas. </span>
          </span>

          <div className='mt-8 hidden flex-col gap-2 text-sm lg:flex'>
            <Link href='/services/fivem' className='text-primary/80 hover:text-primary'>
              → Ver servicios FiveM
            </Link>
            <Link href='/services/fivem/scripts' className='text-primary/80 hover:text-primary'>
              → Scripts FiveM personalizados
            </Link>
            <Link href='/services/fivem/ropa' className='text-primary/80 hover:text-primary'>
              → Packs de ropa y EUP
            </Link>
          </div>
        </section>

        <section className='min-h-160 w-full'>
          <h2 className='mb-4 text-xl font-medium sm:text-2xl'>Generales</h2>
          <Accordion type='single' collapsible>
            {generalFaqs.map((x, i) => (
              <AccordionItem
                key={i}
                value={`general-${i}`}
                className='data-[state=open]:bg-primary/20 px-4 duration-300'
              >
                <AccordionTrigger>
                  <span className='text-foreground flex items-center gap-2'>
                    <QuestionIcon /> {x.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent> {x.answer} </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 className='mt-12 mb-4 text-xl font-medium sm:text-2xl'>FiveM</h2>
          <Accordion type='single' collapsible>
            {fivemFaqs.map((x, i) => (
              <AccordionItem
                key={i}
                value={`fivem-${i}`}
                className='data-[state=open]:bg-primary/20 px-4 duration-300'
              >
                <AccordionTrigger>
                  <span className='text-foreground flex items-center gap-2'>
                    <QuestionIcon /> {x.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent> {x.answer} </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </>
  );
}
