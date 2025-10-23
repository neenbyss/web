import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Faqs() {
  return (
    <section className='container-screen-md py-25'>
      <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
        {' '}
        Preguntas Frecuentes{' '}
      </h2>

      <Accordion type='single' collapsible className='flex flex-col gap-4'>
        {FAQs.map(({ question, answer }, i) => {
          return (
            <AccordionItem
              className='bg-primary/20 data-[state=open]:bg-primary/60 rounded-lg border-b-0 duration-300'
              value={'item-' + (i++).toString()}
              key={i}
            >
              <AccordionTrigger className='px-6 py-3 text-start text-base hover:cursor-pointer sm:text-center sm:text-xl'>
                {' '}
                {question}{' '}
              </AccordionTrigger>
              <AccordionContent className='px-6 py-4 text-base'>{answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

const FAQs = [
  {
    question: '¿Qué incluye un servicio de desarrollo Frontend?',
    answer:
      'Incluye el diseño e implementación de interfaces modernas y responsivas utilizando tecnologías como React, Next.js, Tailwind CSS y TypeScript. Nos enfocamos en que tu sitio luzca bien y funcione de forma fluida en todos los dispositivos.',
  },
  {
    question: '¿Qué tecnologías usan para el Backend?',
    answer:
      'Utilizamos Node.js, Express y NestJS como principales tecnologías, además de PHP con Laravel y Python según el tipo de proyecto. Estas herramientas nos permiten crear sistemas escalables, seguros y eficientes.',
  },
  {
    question: '¿Qué base de datos es mejor para mi proyecto?',
    answer:
      'Depende de tus necesidades. Para proyectos en tiempo real o no relacionales, recomendamos Firebase o MongoDB. Para sistemas más estructurados y con relaciones complejas, usamos PostgreSQL o MySQL.',
  },
  {
    question: '¿Pueden trabajar solo el diseño o solo el desarrollo?',
    answer:
      'Sí, ofrecemos servicios separados de diseño o desarrollo. Podemos trabajar solo en la parte visual o encargarnos exclusivamente de programar una interfaz que ya tengas diseñada.',
  },
  {
    question: '¿Ofrecen soporte después de la entrega?',
    answer:
      'Sí, ofrecemos mantenimiento y soporte técnico después de la entrega del proyecto. Podemos ayudarte a resolver bugs, hacer mejoras o integrar nuevas funcionalidades.',
  },
  {
    question: '¿Cuánto cuesta un sitio web o aplicación?',
    answer:
      'Cada proyecto es distinto, pero ofrecemos precios personalizados según la complejidad, tecnologías y funcionalidades requeridas. Siempre detallamos cada etapa en una propuesta clara y sin costos ocultos.',
  },
  {
    question: '¿Cuánto tiempo tarda el desarrollo de un sitio?',
    answer:
      'Depende del alcance. Un landing page puede tardar de 1 a 2 semanas, mientras que una plataforma compleja puede requerir entre 4 y 12 semanas. Siempre trabajamos con cronogramas definidos.',
  },
  {
    question: '¿Pueden trabajar con tecnologías que yo elija?',
    answer:
      'Sí, si tienes preferencias o un stack ya definido, nos adaptamos. Podemos trabajar con tecnologías específicas siempre que sean viables para el tipo de proyecto que tienes en mente.',
  },
];
