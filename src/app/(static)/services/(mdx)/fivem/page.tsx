import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import { Intro } from './section.intro';
import PricingPlans from './section.prices';
import Glossary from './section.glosario';
import { createMetadata, generateStructuredData } from '@/lib/metadata';

const fivemStructuredData = generateStructuredData('Service', {
  name: 'Servicios de Desarrollo y Configuración para FiveM',
  description:
    'Catálogo completo de servicios profesionales para FiveM: configuración desde cero, reparación de servidores, desarrollo de scripts en Lua, packs de ropa y EUP, MLO y mapeo, vehículos custom, interfaces NUI, migración ESX↔QBCore y optimización de rendimiento.',
  serviceType: 'Desarrollo, Configuración y Mantenimiento de Servidores FiveM',
  priceRange: '89 - 2000 USD',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios FiveM',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Planes Mensuales FiveM',
        description:
          'Planes mensuales con horas garantizadas y tiempos de respuesta definidos. Cinco niveles: Básico ($89), Mantenimiento ($199), Desarrollo ($349), Integral ($599) y Personalizado.',
        url: 'https://neenbyss.com/services/fivem#plans',
      },
      {
        '@type': 'Offer',
        name: 'Desarrollo de Scripts FiveM',
        description:
          'Scripts FiveM a medida en Lua para economía, inventario, trabajos, vehículos, policial, EMS y mecánicas únicas. Compatible con ESX Legacy y QBCore.',
        url: 'https://neenbyss.com/services/fivem/scripts',
      },
      {
        '@type': 'Offer',
        name: 'Packs de Ropa & EUP para FiveM',
        description:
          'Edición de ropa y creación de packs personalizados: civiles, trabajos, uniformes EUP (policía, EMS, bomberos). Stream-ready, sin marcas reales.',
        url: 'https://neenbyss.com/services/fivem/ropa',
      },
      {
        '@type': 'Offer',
        name: 'MLO & Mapeo para FiveM',
        description:
          'Diseño de MLO (Map Loader Object) e interiores personalizados: comisarías, hospitales, negocios y shells habitables. Mapeado con Codewalker.',
      },
      {
        '@type': 'Offer',
        name: 'Vehículos Custom para FiveM',
        description:
          'Packs de vehículos y addon-cars con handling ajustado, liveries personalizadas, tuning y modelos custom integrados al servidor.',
      },
      {
        '@type': 'Offer',
        name: 'Interfaces NUI & HUD para FiveM',
        description:
          'Diseño y desarrollo de NUI para FiveM: pause menu, HUD, phone, inventario, menús de trabajo y paneles de admin con HTML/CSS/JS, React o Vue.',
      },
      {
        '@type': 'Offer',
        name: 'Migración ESX ↔ QBCore',
        description:
          'Migración completa entre frameworks con bridge propio: conversión de scripts, base de datos, permisos, economía y vehículos sin duplicar código.',
      },
      {
        '@type': 'Offer',
        name: 'Optimización & Antidetect FiveM',
        description:
          'Auditoría de rendimiento, reducción de ticks, limpieza de recursos y configuración de antidetect/antihack para servidores con lag o crashes recurrentes.',
      },
    ],
  },
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
    'programador para fivem',
    'programadores para fivem',
    'busco programador fivem',
    'busco programador de fivem',
    'programador fivem español',
    'programadores fivem discord',
    'programador fivem discord',
    'desarrollador fivem',
    'desarrolladores fivem',
    'desarrollador de fivem',
    'fivem server developer',
    'crear servidor fivem',
    'crear un servidor fivem',
    'como crear servidor fivem',
    'como crear un servidor fivem',
    'cuanto cuesta crear un servidor fivem',
    'cuanto cobra un programador fivem',
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
    'programador fivem argentina',
    'programador fivem colombia',
    'desarrollador fivem latinoamerica',
    'pause menu fivem',
    'custom pause menu fivem',
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
