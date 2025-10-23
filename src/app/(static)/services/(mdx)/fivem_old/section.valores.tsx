export function Valores() {
  return (
    <section className='border-b py-20 sm:py-30'>
      <div className='container-screen-xl text-start sm:text-center'>
        <h2 className='mb-4 text-xl font-medium capitalize sm:text-4xl'> ¿Por Qué Elegirnos? </h2>
        <p className='mx-auto mb-8 max-w-lg sm:mb-12'>
          {' '}
          Nuestros servicios están diseñados con los más altos estándares de calidad y rendimiento{' '}
        </p>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {NbHelp.map(({ key, description }, i) => (
            <div key={i} className='border-b pb-4 text-start sm:border-0 sm:pb-0 sm:text-center'>
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
    key: 'Equipo Profesional',
    description: 'Contamos con desarrolladores experimentados especializados en FiveM.',
  },
  {
    key: 'Código Optimizado',
    description: 'Desarrollamos soluciones eficientes que minimizan el impacto en el rendimiento.',
  },
  {
    key: 'Atención Personalizada',
    description: 'Cada proyecto recibe atención dedicada según sus necesidades específicas.',
  },
  {
    key: 'Transparencia',
    description: 'Gestión de tareas mediante Trello para que sigas el progreso en tiempo real.',
  },
];
