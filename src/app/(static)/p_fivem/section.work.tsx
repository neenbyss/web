export function Work() {
  return (
    <section className='container-screen-2xl flex flex-col-reverse gap-20 py-20 lg:grid lg:grid-cols-2'>
      <div className='flex flex-col justify-between gap-8 overflow-clip md:flex-row md:gap-0 lg:flex-col lg:justify-start lg:gap-8'>
        <img
          alt='1_'
          src='https://powerupgaming.co.uk/wp-content/uploads/Untitled-Gym-Game-Trello.jpg'
          className='rounded-2xl border object-contain shadow-2xs md:w-[48%] lg:w-full'
        />
        <img
          alt='2_'
          src='/images/tx_admin.png'
          className='rounded-2xl border object-contain shadow-2xs md:w-[48%] lg:w-full'
        />
      </div>

      <div>
        <h2 className='mb-5 pt-6 text-xl sm:text-5xl'>
          {' '}
          Comunicación Constante Y Trabajo Garantizado{' '}
        </h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

        <div className='mt-20 flex flex-col items-center'>
          <h3 className='mb-2 w-full text-start text-3xl'>Planificación</h3>
          <p className='mb-6 border-b pb-6'>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium quos temporibus
            natus nemo, ipsam rem architecto incidunt, iste nesciunt porro mollitia maxime
            asperiores odit explicabo obcaecati rerum labore itaque a.
          </p>
          <h3 className='mb-2 w-full text-start text-3xl'>Implementación</h3>
          <p className='mb-6 border-b pb-6'>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium quos temporibus
            natus nemo, ipsam rem architecto incidunt, iste nesciunt porro mollitia maxime
            asperiores odit explicabo obcaecati rerum labore itaque a.
          </p>
          <h3 className='mb-2 w-full text-start text-3xl'>Soporte y Verificación</h3>
          <p className='mb-6 border-b pb-6'>
            {' '}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium quos temporibus
            natus nemo, ipsam rem architecto incidunt, iste nesciunt porro mollitia maxime
            asperiores odit explicabo obcaecati rerum labore itaque a.
          </p>
        </div>
      </div>
    </section>
  );
}
