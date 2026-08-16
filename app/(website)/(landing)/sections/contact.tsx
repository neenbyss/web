import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { IconArrowRight, IconMailFilled } from "@tabler/icons-react"
import { AnimatedCard, Reveal, RevealText } from "@/components/animated"

export function Contact() {
  return (
    <section>
      <h1 className="sr-only"> Contáctanos </h1>
      <div className="container-screen-2xl grid grid-cols-[.8fr_1fr] gap-18 py-44">
        <div className="flex flex-col pb-12">
          <RevealText as="h2" className="mb-20 font-heading text-7xl">
            Consulta con <br /> Nuestro Equipo
          </RevealText>

          <Reveal
            as="span"
            delay={0.2}
            className="flex items-center gap-3 text-3xl text-foreground underline underline-offset-2"
          >
            <IconMailFilled className="size-10" />
            team@neenbyss.com
          </Reveal>

          <div className="mb-12 grow-0" />

          <div>
            <h3 className="mb-4 text-xl">¿Necesitas una respuesta rápida?</h3>
            <p className="pb-4">
              Únete a nuestro servidor de Discord y abre un ticket personalizado
              para recibir atención rápida y eficiente
            </p>
            <Button variant={"secondary"} size={"lg"} className="w-full">
              Unirse Ahora
            </Button>
            <p className="py-4">
              O puedes agendar una reunión a través de nuestro calendario
            </p>
            <Button variant={"secondary"} size={"lg"} className="w-full">
              Agendar una Reunión
            </Button>
          </div>
        </div>

        <AnimatedCard className="bg-background px-6">
          <CardHeader className="py-6">
            <h2 className="mb-12 font-heading text-5xl"> Escríbenos </h2>

            <form className="flex flex-col gap-4">
              <InputGroup className="h-16">
                <InputGroupInput
                  type="name"
                  placeholder="Nombre *"
                  className="px-2.5 text-lg!"
                />
              </InputGroup>
              <InputGroup className="h-16">
                <InputGroupInput
                  type="email"
                  placeholder="Correo Electrónico *"
                  className="px-2.5 text-lg!"
                />
              </InputGroup>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="h-16! w-full max-w-32 text-lg! px-2.5">
                    <SelectValue placeholder="+51" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>País</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <InputGroup className="h-16">
                  <InputGroupInput
                    type="phone"
                    placeholder="Teléfono de contacto"
                    className="px-2.5 text-lg!"
                  />
                </InputGroup>
              </div>
              <Select>
                <SelectTrigger className="h-16! w-full text-lg! px-2.5">
                  <SelectValue placeholder="Servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Servicios</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputGroup>
                <InputGroupTextarea
                  placeholder="Detalles adicionales del servicio*"
                  className="px-2.5 text-lg! min-h-30 max-h-60"
                />
              </InputGroup>

              <Label className="flex cursor-pointer items-center gap-2 text-sm my-4">
                <Checkbox className="size-6" />
                Aceptar nuestros términos y condiciones de Neenbyss
              </Label>

              <div className="flex items-center justify-between gap-4 ">
                <div></div>
                <Button size="lg">
                  Enviar
                  <IconArrowRight />
                </Button>
              </div>
            </form>
          </CardHeader>
        </AnimatedCard>
      </div>
    </section>
  )
}
