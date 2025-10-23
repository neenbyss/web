export default function Glossary() {
  return (
    <section className='bg-content border-b pb-30'>
      <div className='container-screen-lg mx-auto px-4'>
        <h2 className='mb-4 text-2xl font-medium md:text-5xl'>Glosario de Términos</h2>
        <p>Entendiendo los conceptos clave de nuestros servicios FiveM</p>

        <div className='mt-8 flex flex-col gap-10'>
          {glossaryTerms.map((term, index) => (
            <div key={index}>
              <h3 className='mb-4 border-b pb-2.5 text-lg'>
                {' '}
                <span className='bg-primary/20 text-primary mr-3 inline-flex size-6 flex-col items-center justify-center gap-2 rounded-sm text-sm'>
                  {' '}
                  {index + 1}{' '}
                </span>{' '}
                {term.term}{' '}
              </h3>

              <p className=''>{term.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const glossaryTerms = [
  {
    term: 'Scripts abiertos',
    definition:
      'Se refiere a scripts de código que permiten acceder a su código fuente, permitiendo modificaciones al gusto del usuario. Estos scripts son ideales para adaptaciones personalizadas y ajustes según las necesidades del usuario.',
  },
  {
    term: 'Corrección de scripts abiertos',
    definition:
      'Si un script de código abierto presenta errores, estos pueden ser actualizados sin necesidad de reescribir todo el código desde cero. En casos de conversiones entre ESX-QBCore o QBCore-ESX, se evitan modificaciones extremas, pero si es necesario reescribir el código por completo, este proceso no aplica bajo las condiciones de scripts abiertos.',
  },
  {
    term: 'Agregado de funcionalidades',
    definition:
      'Se refiere a la capacidad de agregar nuevas acciones o adaptar un script existente de código abierto para que funcione junto con otros scripts sin necesidad de reescribir el código. Este proceso permite personalizar aún más el funcionamiento del script original sin alterar su estructura principal.',
  },
  {
    term: 'Creación de script personalizado',
    definition:
      "A diferencia del 'agregar funcionalidad', la creación de un script personalizado implica la construcción de una nueva función o la creación de un script desde cero. Este proceso está incluido en la suscripción solo si no requiere un diseño complejo, como interfaces avanzadas, y no toma más de tres días para su desarrollo. En caso de que el script necesite más de tres días de trabajo, un diseño más complejo o funcionalidades avanzadas, este no estará cubierto dentro de la suscripción. El script tendrá un costo adicional, ajustado según su nivel de complejidad, con un descuento basado en la suscripción del usuario. Si el usuario desea adquirir el script en código abierto, su costo será el doble del precio original del script, sin aplicar el descuento de la suscripción. Esto asegura que el cliente paga los derechos de propiedad y las adaptaciones necesarias.",
  },
  {
    term: 'Pack de ropa',
    definition:
      'Pack de ropa testeado y funcional, sin marcas reales para civiles y trabajos generales.',
  },
];
