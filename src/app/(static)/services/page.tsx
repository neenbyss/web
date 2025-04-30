import { createMetadata } from '@/lib/metadata';
import { Categories } from './section.categories';
import { Hero } from './section.hero';

export const metadata = createMetadata({
  title: 'Servicios de Software Personalizado',
  description:
    'Conoce todos nuestros servicios personalizados en desarrollo web, aplicaciones móviles, Discord, FiveM, diseño UI/UX y consultoría técnica. Creamos soluciones tecnológicas a la medida de tus necesidades.',
  openGraph: {
    url: 'https://neenbyss.com/services',
    images: ['https://neenbyss.com/og_servicios.png'],
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'servicios de software',
    'desarrollo de software personalizado',
    'aplicaciones móviles a medida',
    'bots de Discord',
    'scripts para FiveM',
    'diseño UI/UX profesional',
    'consultoría técnica en TI',
    'landing pages optimizadas',
    'desarrollo web moderno',
    'paneles administrativos',
    'programadores para fivem',
    'scripts de fivem',
  ],
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
