import { Hero } from './section.hero';
import { Projects } from './section.projects';
import { Valores } from './section.valores';
import { Services } from './section.services';
import { Timeline } from './section.timeline';
import { Contact } from './section.contact';
import { Products } from './section.products';
import { generateStructuredData } from '@/lib/metadata';

const organizationStructuredData = generateStructuredData('Organization', {
  sameAs: [
    'https://twitter.com/neenbyss',
    'https://linkedin.com/company/neenbyss',
    'https://discord.gg/neenbyss',
  ],
  knowsAbout: [
    'FiveM',
    'Programación FiveM',
    'Scripts FiveM',
    'ESX',
    'QBCore',
    'Desarrollo Web',
    'Diseño UI/UX',
    'React',
    'Next.js',
    'Lua',
  ],
});

export default function Home() {
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <h1 className='sr-only'>
        Neenbyss - Desarrollo de Software, Servidores FiveM y Diseño UI/UX
      </h1>
      <Hero />
      <Products />
      <section className='to-content-1 bg-gradient-to-b from-transparent'>
        <Valores />
        <Projects />
      </section>
      <Services />
      <Timeline />
      <Contact />
    </main>
  );
}
