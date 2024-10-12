"use client";
import { BreadCrumb } from "@/components/layout/bread-crumb";
import { MinusIcon } from "@/icons/minus-icon";
import { PlusIcon } from "@/icons/plus-icon";
import { QuestionIcon } from "@/icons/question-icon";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { cn } from "@nextui-org/theme";
import Link from "next/link";

const faqs = [
    {
      question: "¿Qué servicios ofrece su empresa de software?",
      answer: "Ofrecemos una amplia gama de servicios que incluyen desarrollo de software a medida, mantenimiento de aplicaciones, integración de sistemas, consultoría tecnológica y soluciones de nube."
    },
    {
      question: "¿Cómo es su proceso de desarrollo de software?",
      answer: "Seguimos metodologías ágiles como Scrum y Kanban para asegurar una entrega continua de valor. Trabajamos en ciclos de desarrollo iterativos y mantenemos una comunicación constante con nuestros clientes."
    },
    {
      question: "¿Qué tipos de proyectos han desarrollado en el pasado?",
      answer: "Hemos trabajado en proyectos de diversa índole, incluyendo plataformas web, aplicaciones móviles, sistemas de gestión empresarial, y soluciones de comercio electrónico, entre otros."
    },
    {
      question: "¿Ofrecen servicios de mantenimiento y soporte?",
      answer: "Sí, ofrecemos servicios de mantenimiento y soporte para asegurar que sus aplicaciones funcionen sin problemas y estén siempre actualizadas con las últimas tecnologías y mejoras."
    },
    {
      question: "¿Qué tecnologías utilizan para el desarrollo de software?",
      answer: "Trabajamos con una variedad de tecnologías como JavaScript, Python, Java, .NET, React, Angular, Node.js, entre otras, además de manejar bases de datos como PostgreSQL, MySQL, y MongoDB."
    },
    {
      question: "¿Pueden integrarse con sistemas existentes?",
      answer: "Sí, ofrecemos servicios de integración de sistemas para conectar aplicaciones existentes con nuevas soluciones, garantizando un flujo de datos eficiente y seguro entre plataformas."
    },
    {
      question: "¿Cómo manejan la seguridad en sus proyectos?",
      answer: "La seguridad es una prioridad. Implementamos prácticas de seguridad de vanguardia, como cifrado de datos, autenticación de dos factores, y evaluaciones de vulnerabilidades en todas nuestras soluciones."
    },
    {
      question: "¿Cuál es su política de precios?",
      answer: "Nuestros precios son competitivos y varían según la complejidad del proyecto. Ofrecemos planes personalizados, incluyendo tarifas por hora, tarifas fijas por proyecto, o modelos basados en suscripción."
    },
    {
      question: "¿Tienen experiencia en proyectos de transformación digital?",
      answer: "Sí, ayudamos a las empresas a modernizar sus sistemas y procesos mediante la implementación de tecnologías innovadoras, como la automatización, la inteligencia artificial y la nube."
    },
    {
      question: "¿Qué tan involucrados pueden estar en el proceso de consultoría?",
      answer: "Ofrecemos servicios de consultoría personalizada, desde la evaluación inicial de sus necesidades tecnológicas hasta la creación de una hoja de ruta para su transformación digital o desarrollo de software."
    }
  ];

  
export default function FAQS() {
    return (
        <main className="max-w-screen-xl mx-auto px-4 pt-28 md:pt-32 pb-10 w-full space-y-6 flex flex-col lg:flex-row gap-4 justify-between">
            <section className="w-full">
                <BreadCrumb 
                    removeStyle
                    className="mb-4"
                />
                <h1 className="text-3xl md:text-5xl font-black mb-4 mt-2"> RESUELVE TUS DUDAS </h1>

                <p>
                    ¿Aún tienes preguntas? Estamos aquí para ayudarte. 
                </p>
                <span>
                    <Link href="/contact" className="hover:underline text-primary"> Contáctanos </Link>
                    <span> y obtén la información que necesitas. </span>
                </span>
            </section>

            <section className=" w-full">
                <Accordion> 
                    {faqs.map(({answer, question},i) => 
                        <AccordionItem
                            key={i}
                            classNames={{
                                title: "font-medium text-sm lg:text-base",
                                indicator: "!text-foreground [&_svg]:size-4",
                                trigger: "data-[hover=true]:brightness-75"
                            }}
                            startContent={<QuestionIcon />}
                            indicator={(r) => 
                                <div className={cn("duration-300 p-0.5 bg-primary rounded-lg [&_svg]:size-4", r.isOpen ? "bg-primary" : "bg-primary/40")}>
                                    {r.isOpen ? <MinusIcon className="rotate-90" /> : <PlusIcon />}
                                </div>
                            }
                            title={question}
                            className="text-sm w-full data-[open=true]:bg-primary/10 px-4"
                        >
                            {answer}
                        </AccordionItem>
                    )}
                </Accordion>
            </section>
        </main>
    )
}