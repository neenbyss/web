export function Valores() {
  return (
    <section className='bg-content border-b py-20'>
      <div className='container-screen-xl'>
        <h2 className='mb-5 text-xl font-medium capitalize sm:mb-12 sm:text-4xl'>
          {' '}
          ¿Por Qué Elegirnos?{' '}
        </h2>
        <div className='grid gap-6 sm:grid-cols-2'>
          {NbHelp.map(({ key, description }, i) => (
            <div key={i} className='bg-background rounded-lg border p-4'>
              <h3 className='mb-2 text-base font-medium sm:text-lg'> {key} </h3>
              <p> {description} </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const NbHelp = [
  {
    key: 'Diseño y Desarrollo Integral',
    description:
      'Nuestro equipo se encarga de todo el proceso, desde la concepción de la idea hasta la implementación final. Trabajamos contigo para transformar tu visión en una realidad digital efectiva, asegurando que cada elemento de tu sitio web esté alineado con tus objetivos comerciales.',
  },
  {
    key: 'Diseño Web a Medida',
    description:
      'Si solo requieres el diseño de la web, nuestro equipo creativo elaborará una propuesta visual atractiva y funcional. Nos enfocamos en que el diseño sea coherente con tu marca, utilizando colores adecuados, una distribución de contenido eficaz y una experiencia de usuario óptima. Cada elemento en el diseño tendrá un propósito claro y estará orientado a mejorar la interacción del usuario con tu sitio.',
  },
  {
    key: 'Desarrollo Web Profesional',
    description:
      'Para proyectos que requieren tanto diseño como desarrollo, utilizamos las tecnologías más adecuadas para cada caso. Ya sea una página informativa, una tienda en línea o una plataforma compleja, nuestro equipo está preparado para enfrentar cualquier desafío y crear soluciones que se adapten perfectamente a tus necesidades.',
  },
  {
    key: 'Precios Flexibles y Transparentes',
    description:
      'Entendemos que cada proyecto es único. Por ello, ofrecemos tarifas personalizadas basadas en tus requisitos específicos, asegurando que obtengas el máximo valor por tu inversión. Nuestra transparencia en precios te garantiza claridad desde el inicio, sin costos ocultos.',
  },
];
