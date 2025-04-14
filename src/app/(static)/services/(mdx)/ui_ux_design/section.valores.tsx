export function Valores() {
  return (
    <section className='bg-content border-b py-20'>
      <div className='container-screen-xl'>
        <h2 className='mb-6 text-xl font-medium capitalize sm:mb-12 sm:text-4xl'>
          {' '}
          ¿Por Qué Elegirnos?{' '}
        </h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
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
    key: 'Centrado en el Usuario',
    description:
      'Diseñamos pensando en las necesidades, objetivos y comportamientos de los usuarios finales para ofrecer experiencias útiles y significativas.',
  },
  {
    key: 'Consistencia',
    description:
      'Mantenemos patrones coherentes en toda la interfaz para facilitar el aprendizaje, la navegación y la interacción del usuario.',
  },
  {
    key: 'Accesibilidad',
    description:
      'Creamos interfaces inclusivas que pueden ser utilizadas por personas con diversas capacidades, promoviendo la igualdad de acceso digital.',
  },
  {
    key: 'Jerarquía Visual',
    description:
      'Organizamos los elementos según su importancia para guiar la atención del usuario y mejorar la comprensión del contenido.',
  },
];
