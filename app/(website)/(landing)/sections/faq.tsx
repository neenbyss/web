/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { IconHelpCircleFilled } from "@tabler/icons-react"
import { Reveal, RevealText } from "@/components/animated"

export function FAQ() {
  return (
    <section className="relative mx-auto max-w-475 py-20">
      <h2 className="sr-only"> Preguntas Frecuentes </h2>
      <div className="container-screen-2xl flex items-start gap-72 pt-32 pb-36">
        <Reveal
          as="h3"
          className="flex max-w-35 gap-4 font-heading text-4xl text-primary"
        >
          <IconHelpCircleFilled className="mt-2 size-10 shrink-0" />
          ¿Tienes Dudas?
        </Reveal>
        <RevealText
          as="span"
          className="block max-w-3xl font-heading text-7xl font-medium text-foreground"
        >
          Preguntas Frecuentes
        </RevealText>
      </div>
      <div className="container-screen-2xl grid grid-cols-[0.5fr_1fr] gap-30">
        <RevealText
          as="p"
          variant="fade"
          className="text-xl text-muted-foreground"
        >
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </RevealText>

        <Accordion defaultValue={["shipping"]} className="gap-4" hiddenUntilFound >
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <AccordionItem key={i} value={i.toString()} className="bg-[#E9E7F6] dark:bg-[#151322] px-6 py-3 border-b-0! data-open:bg-[#DCD7FF] dark:data-open:bg-[#32277B] duration-500 ease-in-out">
                <AccordionTrigger className="text-2xl font-normal">
                  What are your shipping options?
                </AccordionTrigger>
                <AccordionContent className="text-xl text-muted-foreground">
                  We offer standard (5-7 days), express (2-3 days), and
                  overnight shipping. Free shipping on international orders.
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
