/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/ui/marquee"
import { AnimatedButton, Reveal, RevealText } from "@/components/animated"
import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative container-screen-2xl flex h-260 flex-col justify-end py-48">
      <RevealText as="h2" className="heading-1">
        Desarrollo de <span className="text-primary">Software</span> <br />
        Scripts <span className="text-orange-400"> FiveM </span>{" "}
        <span className="text-violet-600"> UI/UX </span> a Tu Medida
      </RevealText>
      <RevealText
        as="p"
        variant="fade"
        delay={0.25}
        className="w-130 pb-12 text-2xl font-light"
      >
        Desarrollos profesionales de servicios software completamente
        personalizados y a medida.
      </RevealText>

      <div className="flex gap-4">
        <AnimatedButton
          delay={0.18}
          size="lg"
          className="text-base shadow-[0_0_2rem] shadow-primary/35 [&_svg]:transition [&_svg]:duration-700 [&_svg]:ease-in-out hover:[&_svg]:translate-x-2"
        >
          Empezemos Ahora
          <IconArrowRight className="size-6" />
        </AnimatedButton>
        <AnimatedButton
          delay={0.26}
          variant="secondary"
          size="lg"
          className="text-base"
        >
          Portfolio
        </AnimatedButton>
        <div className="ml-auto" />
        <Reveal
          as="div"
          delay={0.34}
          className="mr-4 flex items-center gap-2 font-mono text-foreground-muted"
        >
          <div className="size-3.5 bg-green-400" />
          Cero Compromisos
        </Reveal>
        <Reveal
          as="div"
          delay={0.42}
          className="flex items-center gap-2 font-mono text-foreground-muted"
        >
          <div className="size-3.5 bg-green-400" />
          Consulta gratis en menos de 24 Horas
        </Reveal>
      </div>

      {/** Backgrounds */}
      <Image
        src="/svg/hero_vector_bg.png"
        alt="VECTOR_BG"
        width={1200}
        height={1200}
        className="pointer-events-none absolute inset-0 z-1 size-full scale-150"
      />

      <MarqueeProjectHero />
    </section>
  )
}

export function MarqueeProjectHero() {
  return (
    <div className="pointer-events-none absolute -top-30 -right-80 -z-1 flex -rotate-18 flex-col gap-8 mask-b-from-40% mask-l-from-0% mask-radial-from-30% mask-radial-to-85% dark:opacity-60 [*>div]:max-w-7xl">
      <Marquee duration={160} direction="horizontal" gap={"2rem"}>
        {images.map((src, i) => (
          <div key={i} className="relative aspect-video w-140">
            <img
              alt={`image-${i}`}
              className="size-full object-cover"
              {...{ src }}
              width={1200}
              height={1200}
            />
          </div>
        ))}
      </Marquee>
      <Marquee duration={160} direction="horizontal" reverse gap={"2rem"}>
        {images.map((src, i) => (
          <div key={i} className="relative aspect-video w-140">
            <img
              alt={`image-${i}`}
              className="size-full object-cover"
              {...{ src }}
              width={1200}
              height={1200}
            />
          </div>
        ))}
      </Marquee>
      <Marquee duration={160} direction="horizontal" gap={"2rem"}>
        {images.map((src, i) => (
          <div key={i} className="relative aspect-video w-140">
            <img
              alt={`image-${i}`}
              className="size-full object-cover"
              {...{ src }}
              width={1200}
              height={1200}
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

const images = [
  "https://landingi.com/wp-content/uploads/2024/04/3_6_compare-optimized.webp",
  "https://gempages.net/cdn/shop/articles/landing-pages-vs-homepages_d55bc63a-fc7e-48ec-a217-7772ef2ab6e1_1024x1024.webp?v=1772704377",
  "https://s3-alpha.figma.com/hub/file/2224354844914769031/b64a41ed-ad02-4486-a2eb-6bc5ea0312de-cover.png",
  "https://images.ctfassets.net/lzny33ho1g45/1QtWioSTlVurIb0MxnGMTm/cb3a9b55416e26e7def0cbeff5862063/image4.jpeg",
  "https://img.magnific.com/free-vector/travel-sale-landing-page-design_52683-46355.jpg?semt=ais_hybrid&w=740&q=80",
  "https://d2x3xhvgiqkx42.cloudfront.net/12345678-1234-1234-1234-1234567890ab/651c25b0-2d60-43c8-addf-1df2fd575568/2021/07/01/d1481f41-2a8b-4ea2-aa9c-09005555463f/3e792561-5da8-484e-8ead-c6fea28516cc.png",
]
