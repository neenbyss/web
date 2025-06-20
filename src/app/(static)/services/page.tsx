import { createMetadata, generateStructuredData } from '@/lib/metadata';
import { Categories } from './section.categories';
import { Hero } from './section.hero';

const structuredData = generateStructuredData('WebPage', {
  name: 'Servicios de Software Personalizado - Neenbyss',
  description:
    'Servicios integrales de desarrollo web, configuración FiveM, diseño UI/UX y consultoría técnica profesional.',
  url: 'https://neenbyss.com/services',
});

export const metadata = createMetadata({
  title: 'Servicios de Software Personalizado | Neenbyss',
  description:
    'Servicios integrales: desarrollo web profesional, configuración y reparación de servidores FiveM, diseño UI/UX y consultoría técnica. Soluciones tecnológicas a medida.',
  canonical: 'https://neenbyss.com/services',
  openGraph: {
    url: 'https://neenbyss.com/services',
    images: ['https://neenbyss.com/og_servicios.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'servicios de software México',
    'desarrollo de software personalizado',
    'configuración servidor FiveM',
    'reparación servidor FiveM',
    'scripts FiveM personalizados',
    'diseño UI/UX profesional',
    'consultoría técnica TI',
    'desarrollo web profesional',
    'mantenimiento FiveM',
    'automatización empresarial',
    'aplicaciones web a medida',
    'Neenbyss servicios',
  ],
});

export default function Services() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <h1 className='sr-only'> Services </h1>
        <Hero />
        <Categories />
      </main>
    </>
  );
}
