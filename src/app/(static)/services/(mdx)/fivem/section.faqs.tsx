import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Faqs() {
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
    <section className='container-screen-lg py-25'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <h2 className='mb-10 text-xl font-medium sm:mb-20 sm:text-center sm:text-4xl'>
        {' '}
        Preguntas Frecuentes sobre Nuestros Servicios FiveM{' '}
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
    question: '¿Son programadores FiveM profesionales? ¿Qué experiencia tienen?',
    answer:
      'Sí. En Neenbyss somos un equipo de desarrolladores especializados en FiveM con experiencia en frameworks ESX y QBCore, desarrollo de scripts en Lua, diseño de interfaces NUI (HTML/CSS/JS, React, Vue) y arquitectura de servidores RP. Trabajamos con servidores de España, México, Chile, Perú, Colombia y el resto de Latinoamérica.',
  },
  {
    question: '¿Pueden reparar un servidor FiveM que crashea o no arranca?',
    answer:
      'Sí, ofrecemos servicio de reparación de servidores FiveM. Diagnosticamos crashes, errores de scripts, conflictos entre recursos, problemas de rendimiento y de base de datos. Trabajamos tanto con servidores en ESX como en QBCore, y también en migraciones entre frameworks. Si tu servidor tiene problemas, contáctanos para un diagnóstico.',
  },
  {
    question: '¿Pueden crear un servidor FiveM desde cero?',
    answer:
      'Sí. Configuramos servidores FiveM completos según la temática que elijas (policial, urbano, realista, survival, etc.): instalación de recursos base, base de datos, permisos, frameworks ESX o QBCore, scripts esenciales, economía, trabajos, vehículos, interfaces personalizadas y optimización. Entregamos un servidor listo para abrir a la comunidad.',
  },
  {
    question: '¿Desarrollan scripts FiveM personalizados?',
    answer:
      'Sí. Creamos scripts a medida en Lua con NUI personalizada para cualquier mecánica: sistemas de economía, inventarios, trabajos, negocios, vehículos, interfaces (pause menu, HUD, phone), minijuegos, y cualquier funcionalidad única que imagines. Todos los scripts están optimizados para no afectar el rendimiento del servidor.',
  },
  {
    question: '¿Trabajan con ESX y QBCore?',
    answer:
      'Sí, trabajamos con ambos frameworks, y también hacemos conversiones ESX ↔ QBCore de scripts abiertos cuando es viable. Usamos un sistema de bridge propio que permite que nuestros scripts funcionen en ambos frameworks sin duplicar código.',
  },
  {
    question: '¿Cuánto cuesta contratar un programador FiveM?',
    answer:
      'Ofrecemos planes mensuales desde $52.65 USD hasta $351 USD según las horas de trabajo y la prioridad de respuesta que necesites. También manejamos planes personalizados para servidores grandes. Cada plan incluye mantenimiento, corrección de bugs y ajustes. Los scripts grandes o con diseño complejo pueden tener costo adicional.',
  },
  {
    question: '¿Cuánto cuesta crear un servidor FiveM desde cero?',
    answer:
      'El precio depende de la temática y los sistemas que necesites. Un servidor básico con framework ESX o QBCore, recursos esenciales y configuración estándar suele partir desde $351 USD (plan Diamante). Servidores con scripts personalizados, interfaces NUI a medida o mecánicas únicas requieren presupuesto personalizado. Contáctanos con tus requisitos y te pasamos una cotización sin compromiso.',
  },
  {
    question: '¿Puedo crear un servidor FiveM gratis?',
    answer:
      'FiveM permite hostear un servidor local de forma gratuita, pero montar un servidor público estable, con scripts custom, base de datos, antidetect, recursos optimizados y soporte requiere conocimientos técnicos y tiempo. Si quieres evitar errores comunes (crashes, pérdida de datos, conflictos entre scripts), conviene contratar a un programador FiveM con experiencia.',
  },
  {
    question: '¿Tienen Discord para contactarlos?',
    answer:
      'Sí, puedes contactarnos por Discord, correo o el formulario de contacto de la web. Dentro de Discord coordinamos directamente en un canal privado con tu equipo durante el desarrollo y mantenimiento del servidor.',
  },
  {
    question: '¿Cómo priorizan las tareas y cómo veo el avance?',
    answer:
      'Gestionamos todas las tareas en Trello con prioridades (Baja, Media, Alta) y cuatro estados: Tareas, En proceso, Testeando y Terminado. Tú ves el progreso en tiempo real. Publicamos changelogs semanales (habitualmente los viernes) cuando hay avances significativos.',
  },
  {
    question: '¿Cuál es el horario de trabajo y tiempo de respuesta?',
    answer:
      'Trabajamos de lunes a sábado de 6:00 PM a 1:00 AM UTC para reuniones y desarrollo. El tiempo de respuesta depende del plan: desde 24h en planes Oro/Platino/Diamante hasta 48-72h en el plan Bronce. Para urgencias críticas en producción, los planes superiores tienen prioridad.',
  },
  {
    question: '¿Qué no pueden hacer?',
    answer:
      'No modificamos código encriptado u ofuscado (escrow), ni archivos compilados sin código fuente. Tampoco realizamos modificaciones que violen los términos de uso de CFX/FiveM o de los autores de scripts pagos. Si una tarea no es viable, te lo explicamos con los motivos técnicos antes de comenzar.',
  },
  {
    question: '¿Ofrecen diseño de interfaces para scripts FiveM (UI/UX)?',
    answer:
      'Sí. Diseñamos y rediseñamos interfaces NUI para scripts FiveM: pause menu, HUD, phone, inventarios, paneles de admin, menús de trabajos, etc. Hemos colaborado con empresas como CodeIQ en el rediseño de su Pause Menu. Puedes ver ejemplos en nuestra sección de proyectos.',
  },
];
