"use client"

import { cn } from "@/lib/utils"
import { IconArrowUpRight } from "@tabler/icons-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import Image from "next/image"
import { AnimatedButton, Reveal, RevealText } from "@/components/animated"

type SubService = {
  id: string
  name: string
}

type ServiceData = {
  id: string
  title: string
  description: string
  slug: string
  subServices: SubService[]
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: "s1",
    title: "Diseño de interfaces",
    description:
      "Creamos experiencias digitales intuitivas y atractivas que conectan con los usuarios. Nos enfocamos en la usabilidad y la estética para garantizar productos excepcionales.",
    slug: "diseno-de-interfaces",
    subServices: [
      { id: "sub1-1", name: "UI Design" },
      { id: "sub1-2", name: "UX Research" },
      { id: "sub1-3", name: "Prototipado" },
      { id: "sub1-4", name: "Design Systems" },
    ],
  },
  {
    id: "s2",
    title: "Desarrollo Frontend",
    description:
      "Construimos aplicaciones web rápidas, escalables y accesibles utilizando las tecnologías más modernas del mercado, garantizando el mejor rendimiento.",
    slug: "desarrollo-frontend",
    subServices: [
      { id: "sub2-1", name: "React / Next.js" },
      { id: "sub2-2", name: "Tailwind CSS" },
      { id: "sub2-3", name: "Animaciones Web" },
    ],
  },
  {
    id: "s3",
    title: "Desarrollo Backend",
    description:
      "Arquitecturas sólidas y seguras para soportar la lógica de negocio de tu plataforma, optimizadas para manejar alto tráfico y bases de datos complejas.",
    slug: "desarrollo-backend",
    subServices: [
      { id: "sub3-1", name: "Node.js" },
      { id: "sub3-2", name: "Bases de Datos" },
      { id: "sub3-3", name: "APIs REST / GraphQL" },
      { id: "sub3-4", name: "Arquitectura Cloud" },
    ],
  },
]

export function Services() {
  const [activeServiceId, setActiveServiceId] = useState<string>(
    SERVICES_DATA[0].id
  )

  return (
    <section className="relative bg-[#E9E7F6] py-55 dark:bg-[#151322]">
      <h2 className="sr-only">Servicios de Neenbyss</h2>

      <div className="container-screen-2xl flex items-center gap-12 py-36">
        <AnimatedButton variant="outline" size="lg" className="group">
          Nuestros Servicios
          <IconArrowUpRight className="duration-700 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1" />
        </AnimatedButton>

        <RevealText as="h3" className="heading-2 ml-30">
          <span className="text-primary">Servicios</span> que necesitas
        </RevealText>
      </div>

      <div className="container-screen-2xl">
        {SERVICES_DATA.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.08}>
            <ServiceItem
              index={index + 1}
              service={service}
              isActive={activeServiceId === service.id}
              onActivate={() => setActiveServiceId(service.id)}
            />
          </Reveal>
        ))}
      </div>

      {/** Backgrounds */}
      <Image
        src="/svg/hero_vector_bg.png"
        alt="VECTOR_BG"
        width={1200}
        height={1200}
        className="pointer-events-none absolute top-10 left-1/2 h-300 w-400 -translate-x-1/2 scale-160 rotate-125"
      />
    </section>
  )
}

interface ServiceItemProps {
  index: number
  service: ServiceData
  isActive: boolean
  onActivate: () => void
}

const ServiceItem = ({
  index,
  service,
  isActive,
  onActivate,
}: ServiceItemProps) => {
  return (
    <div className="flex border-b border-muted pt-15 pb-8 last:border-none">
      <div className="mt-2 mr-[15%]">
        <span className="text-2xl text-muted-foreground">({index})</span>
      </div>

      <div className="relative grid w-full grid-cols-[1fr_0.8fr_4rem] gap-8">
        <div>
          <h3
            onClick={onActivate}
            className={cn(
              "heading-3 cursor-pointer hover:underline",
              isActive && "text-primary"
            )}
          >
            {service.title}
          </h3>

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pt-8 font-light opacity-80">
                  {service.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-8">
                  <span className="mb-4 block text-muted-foreground">
                    Categorías
                  </span>

                  <div className="flex flex-wrap gap-3">
                    {service.subServices.map((sub) => (
                      <span
                        key={sub.id}
                        className="cursor-pointer rounded bg-background px-2.5 py-0.5 text-xl transition duration-500 ease-in-out hover:bg-primary/25"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a
          href={`/${service.slug}`}
          className={cn(
            "absolute top-2 right-0 mt-1.5 flex size-12 shrink-0 flex-col items-center justify-center border border-muted transition-colors duration-300",
            isActive ? "bg-primary text-primary-foreground" : "bg-secondary"
          )}
        >
          <IconArrowUpRight className="size-8 duration-700 ease-in-out hover:scale-110" />
        </a>
      </div>
    </div>
  )
}
