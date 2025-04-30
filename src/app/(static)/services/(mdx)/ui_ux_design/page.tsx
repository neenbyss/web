import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import Intro from './section.intro';
import { serviceCategories } from '@/utils/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Diseño UI/UX Profesional | Neenbyss',
  description:
    'Creamos interfaces atractivas, intuitivas y funcionales para apps web, móviles y plataformas como FiveM. Mejora la experiencia de tus usuarios con un diseño que convierte.',
  openGraph: {
    url: 'https://neenbyss.com/services/ui-ux_design',
    images: ['https://neenbyss.com/og_servicios_design.png'],
  },
  twitter: {
    images: ['https://neenbyss.com/og_servicios_design.png'],
    card: 'summary_large_image',
  },
  keywords: [
    'diseño ui/ux personalizado',
    'interfaces web modernas',
    'diseño para aplicaciones móviles',
    'experiencia de usuario optimizada',
    'mockups interactivos',
    'prototipos ui/ux',
    'ux para fivem',
    'necesito diseño ui/ux',
  ],
});

export default function Page() {
  const color = serviceCategories.find((x) => x.uid === 'ui_ux_design')!.color;
  return (
    <main>
      <Hero />
      <Intro {...{ color }} />
      <Services />

      <Valores />

      <Faqs />
    </main>
  );
}
