import { Hero } from './section.hero';
import { TabsSection } from './section.tabs';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import { createMetadata, generateStructuredData } from '@/lib/metadata';

const webDevStructuredData = generateStructuredData('Service', {
  name: 'Desarrollo Web Profesional',
  description:
    'Desarrollo de sitios web modernos, landing pages optimizadas, tiendas online y aplicaciones web con tecnologías de vanguardia.',
  serviceType: 'Desarrollo de Software',
  priceRange: '500 - 15000 MXN',
});

export const metadata = createMetadata({
  title: 'Desarrollo Web Profesional | Landing Pages y Sitios Empresariales',
  description:
    'Desarrollamos sitios web modernos, landing pages optimizadas, tiendas online y aplicaciones web con Next.js, React y tecnologías de vanguardia. SEO incluido.',
  canonical: 'https://neenbyss.com/services/web-development',
  openGraph: {
    url: 'https://neenbyss.com/services/web-development',
    images: ['https://neenbyss.com/og_servicios_web.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_web.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'desarrollo web profesional México',
    'landing pages optimizadas',
    'sitios web empresariales',
    'tiendas online e-commerce',
    'aplicaciones web modernas',
    'desarrollo Next.js',
    'sitios web responsivos',
    'desarrollo web SEO',
    'páginas web corporativas',
    'desarrollo web a medida',
    'programación web profesional',
    'diseño web moderno',
  ],
});

export default function Web_Development_Page() {
  return (
    <main>
      <Hero />

      <Services />

      <TabsSection />

      <Valores />

      <Faqs />
    </main>
  );
}
