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
  title: 'Programador FiveM | Desarrollo, Configuración y Reparación de Servidores',
  description:
    '¿Buscas programadores FiveM? Creamos, configuramos y reparamos servidores FiveM. Scripts personalizados para ESX y QBCore, diseño de interfaces, soporte técnico y mantenimiento continuo. Consulta gratis.',
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
    'programador fivem',
    'programadores fivem',
    'programador de fivem',
    'desarrollador fivem',
    'desarrolladores fivem',
    'fivem server developer',
    'crear servidor fivem',
    'configurar servidor fivem',
    'reparar servidor fivem',
    'reparacion de servidores fivem',
    'reparacion servidor fivem',
    'servidor fivem crashea',
    'soporte fivem',
    'fivem soporte',
    'soporte tecnico fivem',
    'ayuda servidor fivem',
    'mantenimiento servidor fivem',
    'scripts fivem personalizados',
    'scripts fivem custom',
    'desarrollo scripts fivem',
    'scripts qbcore',
    'scripts esx',
    'desarrollador fivem profesional',
    'contratar programador fivem',
    'mapear servidor fivem',
    'ropa personalizada fivem',
    'pack de ropa fivem',
    'programador fivem mexico',
    'programador fivem españa',
    'programador fivem chile',
    'desarrollador fivem latinoamerica',
    'pause menu fivem',
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
