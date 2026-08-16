import ReactLenis from "lenis/react"
import { Hero } from "./sections/hero"
import { Portfolio } from "./sections/portfolio"
import { Services } from "./sections/services"
import { StatsWithPhrase } from "./sections/stats"
import { Testimonio } from "./sections/testimonio"
import { Articles } from "./sections/articles"
import { FAQ } from "./sections/faq"
import { Contact } from "./sections/contact"
import { CTA } from "@/components/layout/cta"


export default function Page() {
  return (
    <ReactLenis root>
      <main className="overflow-x-clip">
        <h1 className="sr-only"> Neenbyss - Arquitectos Digitales </h1>
        <Hero />
        <Portfolio />
        <StatsWithPhrase />
        <Services />
        <Testimonio />
        <Articles />
        <FAQ />
        <Contact />
        <CTA />
      </main>
    </ReactLenis>
  )
}
