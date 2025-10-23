import { Hero } from './section.hero';
import { Servers } from './section.servers';
import { Services } from './section.services';
import { Work } from './section.work';

export default function Home() {
  return (
    <main className='overflow-clip'>
      <h1 className='sr-only'> Programadores para fivem </h1>
      <Hero />
      <Services />
      <Work />
      <Servers />
    </main>
  );
}
