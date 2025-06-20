import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import { Intro } from './section.intro';
import PricingPlans from './section.prices';
import Glossary from './section.glosario';
import { createMetadata, generateStructuredData } from '@/lib/metadata';

const fivemStructuredData = generateStructuredData('Service', {
  name: 'Configuración y Reparación de Servidores FiveM',
  description:
    'Servicio profesional de configuración desde cero, reparación de servidores rotos, desarrollo de scripts personalizados y mantenimiento continuo para FiveM.',
  serviceType: 'Configuración de Servidores de Gaming',
  priceRange: '500 - 5000 MXN',
  offers: [
    {
      '@type': 'Offer',
      name: 'Configuración desde Cero',
      description: 'Configuración completa de servidor FiveM para principiantes',
    },
    {
      '@type': 'Offer',
      name: 'Reparación de Servidores',
      description: 'Rescate y reparación de servidores FiveM con problemas',
    },
    {
      '@type': 'Offer',
      name: 'Scripts Personalizados',
      description: 'Desarrollo de scripts únicos para tu servidor FiveM',
    },
  ],
});

export const metadata = createMetadata({
  title: 'Configuración y Reparación Servidores FiveM | Expertos en FiveM',
  description:
    'Configuramos tu servidor FiveM desde cero o reparamos el que tienes. Scripts personalizados, mapeo, ropa custom y mantenimiento. ¿Tu servidor crashea? Te ayudamos.',
  canonical: 'https://neenbyss.com/services/fivem',
  openGraph: {
    url: 'https://neenbyss.com/services/fivem',
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_fivem.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'configurar servidor fivem',
    'reparar servidor fivem',
    'servidor fivem crashea',
    'ayuda servidor fivem',
    'mantenimiento servidor fivem',
    'scripts fivem personalizados',
    'crear servidor fivem desde cero',
    'desarrollador fivem profesional',
    'mapear servidor fivem',
    'ropa personalizada fivem',
    'soporte técnico fivem',
    'programador fivem México',
  ],
});

export default function FiveM_Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fivemStructuredData) }}
      />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Valores />
        <PricingPlans />
        <Glossary />
        <Faqs />
      </main>
    </>
  );
}
