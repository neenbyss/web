import { createMetadata } from '@/lib/metadata';
import { Categories } from './section.categories';
import { Hero } from './section.hero';

export const metadata = createMetadata({
  title: 'Servicios',
  description:
    'Explorá nuestra colección de proyectos destacados que demuestran nuestra experiencia y capacidad para crear soluciones digitales innovadoras. Cada proyecto refleja nuestro compromiso con la excelencia y la satisfacción del cliente.',
});
export default function Services() {
  return (
    <main>
      <h1 className='sr-only'> Services </h1>
      <Hero />
      <Categories />
    </main>
  );
}
