import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import Intro from './section.intro';
import { serviceCategories } from '@/utils/data/services';
import { createMetadata, generateStructuredData } from '@/lib/metadata';

const uiUxStructuredData = generateStructuredData('Service', {
  name: 'Diseño UI/UX Profesional',
  description:
    'Diseño de interfaces de usuario intuitivas y experiencias optimizadas para aplicaciones web, móviles y plataformas especializadas como FiveM.',
  serviceType: 'Diseño Digital',
  priceRange: '500 - 15000 MXN',
});

export const metadata = createMetadata({
  title: 'Diseño UI/UX Profesional | Interfaces y Experiencia de Usuario',
  description:
    'Diseñamos interfaces atractivas e intuitivas para apps web, móviles y FiveM. Mejoramos la experiencia de usuario con diseños que convierten y retienen.',
  canonical: 'https://neenbyss.com/services/ui-ux-design',
  openGraph: {
    url: 'https://neenbyss.com/services/ui-ux-design',
    images: ['https://neenbyss.com/og_servicios_design.png'],
    type: 'website',
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_design.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'diseño ui ux profesional',
    'diseño interfaz usuario',
    'experiencia usuario UX',
    'diseño aplicaciones móviles',
    'prototipo interactivo',
    'diseño web moderno',
    'interfaces intuitivas',
    'diseño ui fivem',
    'mockups profesionales',
    'diseño centrado usuario',
    'diseñador ui ux México',
    'wireframes prototipos',
  ],
});

export default function Page() {
  const color = serviceCategories.find((x) => x.uid === 'ui_ux_design')!.color;
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(uiUxStructuredData) }}
      />
      <main>
        <Hero />
        <Intro {...{ color }} />
        <Services />

        <Valores />

        <Faqs />
      </main>
    </>
  );
}
