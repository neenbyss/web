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
        Preguntas Frecuentes{' '}
      </h2>

      <Accordion type='single' collapsible className='flex flex-col gap-4'>
        {FAQs.map(({ key, description }, i) => {
          return (
            <AccordionItem
              className='bg-primary/20 data-[state=open]:bg-primary/60 rounded-lg border-b-0 duration-300'
              value={'item-' + (i++).toString()}
              key={i}
            >
              <AccordionTrigger className='px-6 py-3 text-start text-base hover:cursor-pointer sm:text-center sm:text-xl'>
                {' '}
                {key}{' '}
              </AccordionTrigger>
              <AccordionContent className='px-6 py-4 text-base'>{description}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

const FAQs = [
  {
    key: '¿Qué incluye el diseño UI/UX en un software personalizado?',
    description:
      'Incluye la creación de interfaces visuales atractivas (UI) y la planificación de experiencias intuitivas (UX), adaptadas a tus usuarios y objetivos. Nos aseguramos de que cada pantalla sea clara, usable y alineada con tu marca.',
  },
  {
    key: '¿Diseñan desde cero o trabajan sobre una idea que ya tengo?',
    description:
      'Ambas opciones son posibles. Podemos partir de una idea que ya tengas o crear propuestas completamente nuevas desde cero, incluyendo wireframes, mockups y prototipos interactivos.',
  },
  {
    key: '¿Cómo se asegura la usabilidad del diseño?',
    description:
      'Aplicamos principios de experiencia de usuario como consistencia, jerarquía visual, accesibilidad y diseño centrado en el usuario. También hacemos pruebas con usuarios cuando es necesario para validar que todo sea fácil de entender y usar.',
  },
  {
    key: '¿Puedo solicitar cambios durante el proceso de diseño?',
    description:
      'Sí. Trabajamos de forma colaborativa contigo, entregando avances por etapas para que puedas dar feedback en cada fase. Así garantizamos que el resultado final cumpla con tus expectativas.',
  },
  {
    key: '¿Qué herramientas utilizan para diseñar interfaces?',
    description:
      'Principalmente usamos Figma por su potencia, flexibilidad y capacidad de colaboración en tiempo real. También utilizamos sistemas de diseño reutilizables para mantener coherencia visual en todo el producto.',
  },
  {
    key: '¿El diseño incluye la versión móvil o solo para escritorio?',
    description:
      'Siempre diseñamos pensando en la adaptabilidad. Creamos interfaces responsive que funcionan correctamente tanto en escritorio como en móviles y tablets, cuidando cada detalle para cada dispositivo.',
  },
  {
    key: '¿El diseño UI/UX está incluido en el desarrollo del software?',
    description:
      'Sí, en nuestros proyectos completos el diseño UI/UX forma parte del proceso. También puedes contratarlo por separado si ya cuentas con un equipo de desarrollo o una solución técnica establecida.',
  },
  {
    key: '¿Por qué invertir en un buen diseño UI/UX?',
    description:
      'Porque una buena interfaz no solo se ve bien: mejora la conversión, reduce errores, facilita el uso del sistema y genera confianza en tu producto. Un mal diseño puede hacer que pierdas usuarios, incluso si el sistema es funcional.',
  },
];
