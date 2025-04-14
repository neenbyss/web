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
  title: 'Preguntas Frecuentess',
});
const faqs = [
  {
    question: '¿Qué servicios ofrece su empresa de software?',
    answer:
      'Ofrecemos una amplia gama de servicios que incluyen desarrollo de software a medida, mantenimiento de aplicaciones, integración de sistemas, consultoría tecnológica y soluciones de nube.',
  },
  {
    question: '¿Cómo es su proceso de desarrollo de software?',
    answer:
      'Seguimos metodologías ágiles como Scrum y Kanban para asegurar una entrega continua de valor. Trabajamos en ciclos de desarrollo iterativos y mantenemos una comunicación constante con nuestros clientes.',
  },
  {
    question: '¿Qué tipos de proyectos han desarrollado en el pasado?',
    answer:
      'Hemos trabajado en proyectos de diversa índole, incluyendo plataformas web, aplicaciones móviles, sistemas de gestión empresarial, y soluciones de comercio electrónico, entre otros.',
  },
  {
    question: '¿Ofrecen servicios de mantenimiento y soporte?',
    answer:
      'Sí, ofrecemos servicios de mantenimiento y soporte para asegurar que sus aplicaciones funcionen sin problemas y estén siempre actualizadas con las últimas tecnologías y mejoras.',
  },
  {
    question: '¿Qué tecnologías utilizan para el desarrollo de software?',
    answer:
      'Trabajamos con una variedad de tecnologías como JavaScript, Python, Java, .NET, React, Angular, Node.js, entre otras, además de manejar bases de datos como PostgreSQL, MySQL, y MongoDB.',
  },
  {
    question: '¿Pueden integrarse con sistemas existentes?',
    answer:
      'Sí, ofrecemos servicios de integración de sistemas para conectar aplicaciones existentes con nuevas soluciones, garantizando un flujo de datos eficiente y seguro entre plataformas.',
  },
  {
    question: '¿Cómo manejan la seguridad en sus proyectos?',
    answer:
      'La seguridad es una prioridad. Implementamos prácticas de seguridad de vanguardia, como cifrado de datos, autenticación de dos factores, y evaluaciones de vulnerabilidades en todas nuestras soluciones.',
  },
  {
    question: '¿Cuál es su política de precios?',
    answer:
      'Nuestros precios son competitivos y varían según la complejidad del proyecto. Ofrecemos planes personalizados, incluyendo tarifas por hora, tarifas fijas por proyecto, o modelos basados en suscripción.',
  },
  {
    question: '¿Tienen experiencia en proyectos de transformación digital?',
    answer:
      'Sí, ayudamos a las empresas a modernizar sus sistemas y procesos mediante la implementación de tecnologías innovadoras, como la automatización, la inteligencia artificial y la nube.',
  },
  {
    question: '¿Qué tan involucrados pueden estar en el proceso de consultoría?',
    answer:
      'Ofrecemos servicios de consultoría personalizada, desde la evaluación inicial de sus necesidades tecnológicas hasta la creación de una hoja de ruta para su transformación digital o desarrollo de software.',
  },
];

export default function FAQS() {
  return (
    <main className='container-screen-xl flex flex-col justify-between gap-4 space-y-6 px-2 pb-10 md:pt-15 lg:flex-row'>
      <h1 className='sr-only'> Preguntas Frecuentes </h1>
      <section className='w-full'>
        <AppBreadcrumb className='mb-3 bg-transparent px-0 py-0' />
        <h2 className='mt-2 mb-6 text-4xl font-medium md:text-6xl'> Resuelve Tus Dudas </h2>

        <p>¿Aún tienes preguntas? Estamos aquí para ayudarte.</p>
        <span>
          <Link href='/contact' className='text-primary hover:underline'>
            {' '}
            Contáctanos{' '}
          </Link>
          <span> y obtén la información que necesitas. </span>
        </span>
      </section>

      <section className='min-h-160 w-full'>
        <Accordion type='single' collapsible>
          {faqs.map((x, i) => {
            return (
              <AccordionItem
                key={i}
                value={i.toString()}
                className='data-[state=open]:bg-primary/20 px-4 duration-300'
              >
                <AccordionTrigger>
                  <span className='text-foreground flex items-center gap-2'>
                    <QuestionIcon /> {x.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent> {x.answer} </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </main>
  );
}
