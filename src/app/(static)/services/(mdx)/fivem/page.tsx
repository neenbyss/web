import { Hero } from './section.hero';
import { Services } from './section.service';
import { Valores } from './section.valores';
import { Faqs } from './section.faqs';
import { Intro } from './section.intro';
import PricingPlans from './section.prices';
import Glossary from './section.glosario';

export default function Web_Development_Page() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Valores />
      <PricingPlans />
      <Glossary />
      <Faqs />
    </main>
  );
}
