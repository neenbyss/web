import { Hero } from './section.hero';
import { Projects } from './section.projects';
import { Valores } from './section.valores';
import { Services } from './section.services';
import { Timeline } from './section.timeline';
import { Contact } from './section.contact';
import { Products } from './section.products';

export default function Home() {
  return (
    <main>
      <h1 className='sr-only'> Neenbyss </h1>
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
