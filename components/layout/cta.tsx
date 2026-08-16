import { IconMailFilled, IconSendFilled } from "@tabler/icons-react"
import { Field } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { RevealText } from "@/components/animated"

export function CTA() {
  return (
    <section className="bg-linear-to-r from-primary/40 to-background/0 py-24">
      <div className="container-screen-2xl">
        <RevealText as="h2" className="heading-2 max-w-6xl text-balance">
          ¿Listo para impulsar tu negocio al siguiente nivel?
        </RevealText>
        <div className="flex justify-between">
          <RevealText
            as="p"
            variant="fade"
            delay={0.2}
            className="max-w-3xl text-balance"
          >
            Agenda una consulta gratuita hoy mismo y descubre cómo podemos
            ayudarte a alcanzar tus objetivos digitales. Nuestro equipo de
            expertos está listo para crear una solución personalizada para tu
            negocio.
          </RevealText>

          <div className="flex items-end gap-2 w-full">
            <Field>
              <Label> Envíanos un Mensaje</Label>
              <InputGroup className="bg-background border border-muted h-12" >
                <InputGroupInput type="email" placeholder="tucorreo@gmail.com" className="text-lg!" />
                <InputGroupAddon className="ps-4">
                    <IconMailFilled className="size-5" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Button className="h-12">
                Enviar
                <IconSendFilled />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
