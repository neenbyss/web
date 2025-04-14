import { Hero } from './section.hero';
import { TabsSection } from './section.tabs';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';

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
