/* eslint-disable @next/next/no-img-element */
"use client"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IconArrowUpRight } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { AnimatedButton, RevealText } from "@/components/animated"

export function Articles() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const updateCarouselState = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }
    updateCarouselState()

    api.on("select", updateCarouselState)
    api.on("reInit", updateCarouselState)

    return () => {
      api.off("select", updateCarouselState)
      api.off("reInit", updateCarouselState)
    }
  }, [api])

  return (
    <section className="overflow-hidden py-30">
      <h2 className="sr-only"> Explora artículos interesantes </h2>
      <div className="container-screen-2xl flex items-center gap-12 pt-36">
        <AnimatedButton variant="outline" size="lg" className="group">
          Ver Más
          <IconArrowUpRight className="duration-700 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1" />
        </AnimatedButton>

        <h3 className="ml-40">
          <RevealText as="span" className="heading-2 block text-foreground">
            Artículos
          </RevealText>
          <RevealText
            as="span"
            variant="fade"
            delay={0.2}
            className="block max-w-50 font-sans text-xl font-light text-primary"
          >
            Nuestros Blogs Relevantes
          </RevealText>
        </h3>
        <RevealText
          as="p"
          variant="fade"
          delay={0.25}
          className="ml-auto max-w-100 pt-8 text-2xl"
        >
          Explorá nuestra colección de proyectos destacados que demuestran
          nuestra experiencia y capacidad para crear soluciones digitales
          innovadoras.
        </RevealText>
      </div>

      <div className="mt-20">
        <Carousel
          className="w-full **:overflow-visible"
          {...{
            opts: {
              align: "center",
            },
            setApi,
          }}
        >
          <div className="relative mx-auto max-w-520 overflow-clip mask-r-from-60% mask-b-from-90% mask-radial-from-40% mask-radial-to-100% py-20">
            <div className="container-screen-2xl">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <Card className="gap-0">
                        <div className="aspect-4/4 overflow-hidden">
                          <img
                            alt="Imagen del artículo_"
                            className="size-full bg-cover"
                            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/white-and-green-generic-blog-header-design-template-3f2aaa1164597aa988cb19ceeae72556_screen.jpg?ts=1561540006"
                          />
                        </div>

                        <CardHeader className="flex items-center gap-4 pt-6">
                          <h3 className="heading-3 text-3xl">
                            {" "}
                            Título header para mostrar{" "}
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xl">
                            {" "}
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Modi ipsa voluptates quas non! Veritatis,
                            reiciendis. Debitis, esse aut! Reprehenderit ad
                            repellendus, dolorum nihil unde non fugit est quam
                            maiores voluptatibus!
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </div>
          <div className="container-screen-2xl grid grid-cols-3 gap-4">
            <div />
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`size-3 rounded-full transition-colors duration-300 ${current === index + 1 ? "bg-primary" : "bg-muted"} `}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-2">
              <CarouselPrevious
                variant="default"
                size="icon-lg"
                className="static"
              />
              <CarouselNext
                variant="default"
                size="icon-lg"
                className="static"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
