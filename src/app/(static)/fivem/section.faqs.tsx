import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { QuestionIcon } from '@/icons/question';
import Link from 'next/link';

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
                <span className='text-foreground flex items-center gap-3'>
                  <QuestionIcon className='size-6' />
                  {question}{' '}
                </span>
              </AccordionTrigger>
              <AccordionContent className='px-6 py-4 text-base'>{answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <p className='mt-6 text-center opacity-60'>
        Consulta nuestros{' '}
        <Link href='/terms-fivem' className='text-primary hover:underline'>
          {' '}
          Términos y Condiciones De Fivem{' '}
        </Link>{' '}
        para más información
      </p>
    </section>
  );
}

const FAQs = [
  {
    question: '¿Trabajan los fines de semana?',
    answer:
      'De forma regular, no. El soporte normal es de lunes a viernes. Solamente se atienden urgencias.',
  },
  {
    question: '¿En planes de soporte continuo puedo pedir instalación de scripts?',
    answer:
      'Sí, siempre que sean scripts simples. Si pides más de 5 scripts de golpe, o mezclas simples con complejos, se cobra $5 USD por script extra. Las tareas se programan según criterio del programador para mantener fluidez y calidad.',
  },
  {
    question: '¿Qué se considera un script simple y uno complejo?',
    answer:
      'Simple: instalación sin modificar código, solo ajustes básicos (permisos, precios, coordenadas mínimas). Complejo: requiere traducción extensa, adaptación a otro framework/inventario o integración entre varios sistemas.',
  },
  {
    question: '¿Cuántas tareas pueden estar activas a la vez?',
    answer:
      'No hay un número fijo público. El programador decide según complejidad: varias simples pueden avanzarse en paralelo, mientras que las complejas se manejan de 1 a 3 para evitar errores y asegurar calidad.',
  },
  {
    question: '¿Si pago un plan más caro, terminarán mis tareas más rápido?',
    answer:
      'Un plan más alto te da más horas semanales, prioridad y acceso a tareas más complejas, pero el tiempo depende de la dificultad y del orden de solicitudes. Trabajamos para mantener calidad, no velocidad sin control.',
  },
  {
    question: '¿Qué pasa si hay tareas que no se pueden hacer?',
    answer:
      'Si un recurso (script, mapa, vehículo, ropa) está encriptado, no podemos modificarlo ni optimizarlo. Solo podemos instalarlo y configurarlo en la medida que lo permita su creador.',
  },
  {
    question: '¿Las horas no usadas se acumulan?',
    answer:
      'No. Las horas son semanales y no acumulables, lo que garantiza una carga de trabajo equilibrada y atención constante para todos los clientes.',
  },
  {
    question: '¿Puedo cambiar de plan en cualquier momento?',
    answer:
      'Sí. El cambio se aplica al siguiente mes o de inmediato con ajuste proporcional al precio y horas restantes.',
  },
  {
    question: '¿Qué diferencia hay entre planes continuos y planes de montaje/reparación?',
    answer:
      'Continuos: para servidores ya en producción y estables, centrados en mantenimiento y mejoras menores. Montaje/Reparación: para servidores nuevos o con errores graves, con enfoque en instalación, adaptación y corrección de problemas.',
  },
];
