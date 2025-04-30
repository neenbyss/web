import { Hero } from './section.hero';
import { TabsSection } from './section.tabs';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Desarrollo Web',
  description:
    'Creamos sitios web profesionales, landing pages, tiendas online y paneles administrativos con tecnologías modernas como Next.js, Tailwind y más. Rápidos, seguros y adaptados a tu negocio.',
  openGraph: {
    url: 'https://neenbyss.com/services/web-development',
    images: ['https://neenbyss.com/og_servicios_web.png'],
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_web.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'desarrollo web personalizado',
    'landing pages a medida',
    'sitios corporativos modernos',
    'tiendas en línea',
    'e-commerce profesional',
    'paneles administrativos web',
    'aplicaciones web',
    'Next.js desarrollo',
    'empresa de desarrollo web',
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
