import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import Intro from './section.intro';
import { serviceCategories } from '@/utils/data/services';

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
