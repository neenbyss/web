import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Faqs() {
  return (
    <section className='container-screen-lg py-25'>
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
    question: '¿Las actualizaciones diarias significan que recibiré un changelog todos los días?',
    answer:
      'No necesariamente. Las actualizaciones indican que el trabajo avanza, pero los changelogs (registros detallados de cambios) solo se publican cuando hay avances significativos o tareas finalizadas. Dependiendo de la complejidad, estos pueden emitirse cada 2 a 5 días o incluso extenderse hasta una semana.',
  },
  {
    question: '¿Si pago un plan más caro significa que todas mis tareas se harán en poco tiempo?',
    answer:
      'No. El costo del plan no reduce la complejidad de las tareas ni garantiza que todo se complete en pocas horas. Algunas tareas pueden parecer simples desde fuera, pero a nivel técnico pueden requerir más tiempo debido a su complejidad. No trabajamos 24/7 ni podemos hacer todo de golpe solo porque un cliente pagó un plan premium. El tiempo de desarrollo depende de la dificultad de la tarea, la cantidad de trabajo pendiente, y las horas asignadas según el plan contratado.',
  },
  {
    question: '¿Cómo priorizan las tareas y cómo sé en qué están trabajando?',
    answer:
      'Utilizamos Trello para gestionar todas las tareas. Cada tarea se etiqueta según su prioridad: Baja (ajustes menores y tareas simples), Media (cambios funcionales que requieren análisis), y Alta (problemas críticos o cambios complejos). Además de las etiquetas, usamos cuatro secciones en Trello: Tareas (pendientes), En proceso (trabajando activamente), Testeando (implementadas y en revisión), y Terminado (solo el cliente puede mover la tarea aquí si considera que está completamente lista).',
  },
  {
    question: '¿Qué sucede si una tarea toma más tiempo en completarse?',
    answer:
      'Si una tarea es compleja y requiere varios días de trabajo, es posible que el changelog no se publique hasta que haya avances significativos. A veces, agrupamos changelogs en un solo informe para mostrar los avances de forma más organizada.',
  },
  {
    question: '¿Qué pasa si hay tareas que simplemente no se pueden hacer?',
    answer:
      'No todo es posible. Existen limitaciones técnicas fuera de nuestro control, como código encriptado u ofuscado (no se pueden hacer modificaciones si el código está protegido), archivos compilados o cerrados (no se pueden editar sin acceso al código fuente), e incompatibilidad con el servidor o framework (algunas modificaciones pueden ser inviables por restricciones del sistema). Si una tarea no se puede hacer, te lo notificaremos y explicaremos las razones técnicas.',
  },
  {
    question: '¿Cómo se reflejan los avances si no hay changelogs frecuentes?',
    answer:
      'Aunque los changelogs no sean diarios, puedes ver el progreso en Trello, donde cada tarea se actualiza conforme avanza.',
  },
  {
    question: '¿Las tareas se completan inmediatamente después de pagar un plan?',
    answer:
      'No. Cada plan tiene un número de horas de trabajo asignadas y un tiempo de respuesta estimado, lo que significa que las tareas se gestionan en función de la carga de trabajo y su complejidad. Si hay varias tareas pendientes, se seguirán los tiempos establecidos en el plan y el orden de prioridad.',
  },
  {
    question: '¿Cuáles son los días y horarios de trabajo?',
    answer:
      'Trabajamos de lunes a viernes en un horario de 6:00 PM UTC a 1:00 AM UTC. Durante este tiempo, estamos disponibles para reuniones, consultas o colaboraciones. El tiempo de trabajo depende del plan contratado y varía entre 2 y 5 horas por día. Esto no significa que estamos disponibles todo el tiempo o que todas las tareas se completarán en un solo día.',
  },
];
