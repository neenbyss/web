"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"
import { Button } from "../ui/button"
import {
  IconBrandDiscordFilled,
  IconMoonFilled,
  IconSunFilled,
  IconUser,
} from "@tabler/icons-react"
import { ButtonGroup } from "../ui/button-group"
import { useTheme } from "next-themes"
import { motion, useMotionValueEvent, useScroll } from "motion/react"

const Nav = [
  { href: "/", label: "INICIO" },
  { href: "#", label: "SERVICIOS" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "#", label: "BLOG" },
  { href: "#", label: "CONSULTAS" },
]

export function Header() {
  const path = usePathname()
  const { setTheme } = useTheme()

  const isPath = useCallback((is_path: string) => path === is_path, [path])

  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 80)
    setHidden(latest > previous && latest > 0)
  })

  return (
    <motion.header
      variants={{ visible: { y: "0%" }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed z-20 flex h-26 w-full flex-col items-center justify-center transition-colors duration-500",
        scrolled && "bg-background/60 backdrop-blur-md"
      )}
    >
      {/**<Annoucement />*/}
      <div className="container-screen-2xl flex w-full max-w-[calc(var(--breakpoint-2xl)+40rem)]! items-center justify-between gap-4">
        <nav>
          <Link href="/">
            <Image
              src="/logos/Isotipo - Neenbyss Studios.svg"
              alt="Neenbyss Studios"
              className="h-16 w-60 object-contain object-left hidden dark:block"
              width={400}
              height={400}
            />
            <Image
              src="/logos/Isotipo black - Neenbyss Studios.svg"
              alt="Neenbyss Studios"
              className="h-16 w-60 object-contain object-left dark:hidden"
              width={400}
              height={400}
            />
          </Link>
        </nav>

        <div className="flex items-center gap-25">
          <nav className="flex items-center gap-8">
            {Nav.map(({ href, label }, i) => {
              return (
                <Link
                  key={`${href}.${label}-${i}`}
                  {...{ href }}
                  className={cn(
                    "relative font-medium uppercase duration-500 ease-in-out hover:opacity-100",
                    isPath(href) ? "text-primary" : "opacity-80"
                  )}
                >
                  {label}
                  {isPath(href) && (
                    <div className="absolute -bottom-3.5 left-1/2 h-1 w-5 -translate-1/2 rounded bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              nativeButton={false}
              size="icon-lg"
              className="border"
              render={(props) => {
                return (
                  <Link href="#" {...props}>
                    <IconBrandDiscordFilled />
                  </Link>
                )
              }}
            />

            <ButtonGroup className="border bg-secondary">
              <Button
                onClick={() => setTheme("dark")}
                variant="ghost"
                size="icon-lg"
                className="dark:opacity-100 opacity-40"

              >
                <IconMoonFilled />
              </Button>
              <Button
                onClick={() => setTheme("light")}
                variant="ghost"
                size="icon-lg"
                className="dark:opacity-40"
              >
                <IconSunFilled />
              </Button>
            </ButtonGroup>

            <Button size="lg" className={"h-12"}>
              Área de Clientes
              <IconUser />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
