import { CardContent, CardFooter } from "@/components/ui/card"
import { IconHelpCircleFilled } from "@tabler/icons-react"
import {
  AnimatedCard,
  CountUp,
  GrowBar,
  Reveal,
  TextScrollReveal,
} from "@/components/animated"

export function StatsWithPhrase() {
  return (
    <section className="relative max-w-475 mx-auto py-20">
      <h2 className="sr-only"> Stats y calidad </h2>
      <div className="container-screen-2xl flex items-start gap-72 pb-16 pt-32">
        <Reveal
          as="h3"
          className="flex max-w-35 gap-4 font-heading text-4xl text-primary"
        >
          <IconHelpCircleFilled className="mt-2 size-10 shrink-0" />
          ¿Por qué escogernos?
        </Reveal>
        <TextScrollReveal className="max-w-5xl text-6xl leading-25 tracking-[0.3rem] font-medium text-foreground">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </TextScrollReveal>
      </div>

      <div className="container-screen-2xl flex justify-end gap-8 pt-16 pb-32">
        <AnimatedCard>
          <CardContent className="text-7xl">
            <CountUp to={25} prefix="+ " />
          </CardContent>
          <CardFooter className="text-3xl text-purple-600">
            Servicios realizados
          </CardFooter>
        </AnimatedCard>
        <AnimatedCard delay={0.12}>
          <CardContent className="text-7xl">
            <CountUp to={80} prefix="+ " suffix="%" />
          </CardContent>
          <CardFooter className="text-3xl text-primary">
            Satisfacción de servicio
          </CardFooter>
        </AnimatedCard>
      </div>

      <div className="opacity-15 absolute flex items-end justify-end gap-8 top-0 left-0 size-full p-12 -z-1 mask-linear-[90deg,transparent_0%,black_50%,transparent_100%]">
        <GrowBar delay={0} className="h-[40%] w-72 rounded-xl bg-purple-600" />
        <GrowBar delay={0.12} className="h-[60%] w-72 rounded-xl bg-violet-500" />
        <GrowBar delay={0.24} className="h-[80%] w-72 rounded-xl bg-primary" />
        <GrowBar delay={0.36} className="h-full w-72 rounded-xl bg-red-500" />
      </div>
    </section>
  )
}
