import { IconArrowUpRight } from "@tabler/icons-react"
import { AnimatedButton, Reveal, RevealText } from "@/components/animated"

export function Portfolio() {
  return (
    <section className="py-32">
      <h2 className="sr-only"> Nuestro portfolio </h2>
      <div className="container-screen-2xl flex items-center gap-12 py-36">
        <AnimatedButton variant="outline" size="lg" className="group">
          Ver Más
          <IconArrowUpRight className="duration-700 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1" />
        </AnimatedButton>

        <h3 className="ml-40">
          <RevealText as="span" className="heading-2 block text-foreground">
            Portfolio
          </RevealText>
          <RevealText
            as="span"
            variant="fade"
            delay={0.2}
            className="block max-w-50 font-sans text-xl font-light text-primary"
          >
            Nuestra experiencia en acción
          </RevealText>
        </h3>
        <RevealText
          as="p"
          variant="fade"
          delay={0.25}
          className="ml-auto max-w-100 text-xl"
        >
          Explorá nuestra colección de proyectos destacados que demuestran
          nuestra experiencia y capacidad para crear soluciones digitales
          innovadoras.
        </RevealText>
      </div>

      <div className="container-screen-2xl grid grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <Reveal
              key={i}
              delay={(i % 2) * 0.1}
              className="group transition duration-500 ease-in-out hover:scale-102 hover:brightness-90"
            >
              <div className="group aspect-16/12 overflow-clip bg-white"></div>
              <div className="flex justify-between gap-4">
                <div className="mt-4">
                  <h3 className="mb-3 text-4xl">Project Title {i + 1}</h3>
                  <span className="block w-fit border border-primary bg-primary/15 px-2.5 py-0.5 font-heading text-base text-primary">
                    Desarrollo web
                  </span>
                </div>
                <div className="mt-3 flex size-12 flex-col items-center justify-center border border-muted bg-secondary opacity-40 duration-700 group-hover:opacity-100">
                  <IconArrowUpRight className="size-8 rotate-45 duration-700 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-0" />
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
