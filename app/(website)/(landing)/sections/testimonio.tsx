"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { IconStar } from "@tabler/icons-react"
import { useEffect,  useState } from "react"
import { RevealText } from "@/components/animated"

export function Testimonio() {
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
    <section>
      <div className="container-screen-2xl py-55">
        <RevealText as="h2" className="heading-2 text-right">
          Testimonios
        </RevealText>

        <div className="mt-20 grid grid-cols-[.8fr_1fr] gap-18">
          <div className="flex flex-col justify-center gap-8">
            <div /> {/* Trust pilot logo placeholder */}
            <div className="mt-6 flex items-center -space-x-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Avatar key={i} className="size-16 border-4 border-background">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="grayscale"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
                <span className="flex items-center gap-4 text-4xl ml-8 text-foreground">
                    4.4
                    <IconStar className="size-12 fill-primary text-primary" />
                </span>

            </div>
          </div>

          <Carousel
            className="w-full"
            {...{
              opts: {
                align: "start",
              },
              setApi,
            }}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardHeader className="flex items-center gap-4">
                        <Avatar className="size-12">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            className="grayscale"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <span className="text-lg font-medium text-foreground">
                            Nombre del testimonio
                          </span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <IconStar
                                key={i}
                                className="size-4 fill-primary text-primary last:fill-transparent"
                              />
                            ))}
                          </div>
                        </div>
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
            <div className="mt-12 grid grid-cols-3 gap-4">
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
                <CarouselPrevious variant="default" size="icon-lg" className="static" />
                <CarouselNext variant="default" size="icon-lg" className="static" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
