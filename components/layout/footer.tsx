import { IconBrandDiscordFilled, IconBrandInstagramFilled, IconBrandLinkedinFilled, IconMailFilled } from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "../ui/button"

export function Footer() {
  return (
    <footer className="py-12">
      <div className="container-screen-2xl grid grid-cols-4 [&>div]:p-6">
        <div className="space-y-6">
          <div className="h-20 w-60 bg-white"> </div>
          <p>
            Transformamos tu visión en experiencias digitales que inspiran y
            conectan con el futuro.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-12">
          <span className="font-heading text-2xl text-foreground">
            {" "}
            Compañía{" "}
          </span>
          <ul className="space-y-2.5">
            <li>
              <Link href="#" className="flex">
                INICIO
              </Link>
            </li>
            <li>
              <Link href="#">SERVICIOS</Link>
            </li>
            <li>
              <Link href="#">PORTFOLIO</Link>
            </li>
            <li>
              <Link href="#">BLOG</Link>
            </li>
            <li>
              <Link href="#">CONSULTAS</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-12">
          <span className="font-heading text-2xl text-foreground"> Legal </span>
          <ul className="space-y-2.5">
            <li>
              <Link href="#" className="flex">
                POLÍTICAS DE PRIVACIDAD{" "}
              </Link>
            </li>
            <li>
              <Link href="#">TÉRMINOS Y CONDICIONES </Link>
            </li>
            <li>
              <Link href="#">USO DE SOFTWARE Y SERVICIOS </Link>
            </li>
            <li>
              <Link href="#">CONDICIONES DE SERVICIOS FIVEM </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-12">
          <span className="font-heading text-2xl text-foreground"> Social </span>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary [&>button]:opacity-50 [&>button:hover]:opacity-100 [&>button:hover]:text-primary">
              <Button variant="outline" size="icon-lg">
                <IconBrandDiscordFilled />
              </Button>
              <Button variant="outline" size="icon-lg">
                <IconBrandInstagramFilled />
              </Button>
              <Button variant="outline" size="icon-lg">
                <IconBrandLinkedinFilled />
              </Button>
            </div>
            <span className="flex items-center gap-2 p-2 w-fit bg-secondary border border-muted opacity-50">
              <IconMailFilled />
              team@neenbyss.com
            </span>
          </div>
        </div>
      </div>
      <div className="container-screen-2xl py-6">
        <span className="block text-center font-mono text-[8cqw] font-medium tracking-widest opacity-20 sm:text-[5cqw]">
          <span className="animate-text-footer-gradient bg-linear-to-r from-primary via-purple-500 to-primary bg-size-[200%_auto] bg-clip-text text-transparent">
            ARQUITECTOS DIGITALES
          </span>
        </span>
      </div>

      <div className="container-screen-2xl flex items-center gap-4 opacity-20">
        <div className="h-px w-full bg-foreground" />
        <span className="text-sm text-nowrap text-foreground">
          © Neenbyss Studio {new Date().getFullYear()} - Todos los derechos
          reservados
        </span>
        <div className="h-px w-full bg-foreground" />
      </div>
    </footer>
  )
}
