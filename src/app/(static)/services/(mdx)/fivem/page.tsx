import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import { Intro } from './section.intro';
import PricingPlans from './section.prices';
import Glossary from './section.glosario';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Servicios para Servidores de FiveM | Scripts, Soporte y Configuración - Neenbyss',
  description:
    'Ofrecemos desarrollo de scripts personalizados, configuración avanzada de servidores y soporte técnico profesional para FiveM. Lleva tu servidor al siguiente nivel con soluciones hechas a medida.',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem',
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'scripts para fivem',
    'servidores fivem personalizados',
    'configuración fivem',
    'soporte fivem',
    'diseño ui/ux fivem',
    'necesito scripts para servidor fivem',
    'desarrollador fivem',
    'soporte técnico fivem',
  ],
});

export default function FiveM_Page() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Valores />
      <PricingPlans />
      <Glossary />
      <Faqs />
    </main>
  );
}
