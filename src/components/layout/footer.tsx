"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../common/button";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { ExternalLink } from "@/icons/external-link-icon";

import { Socials } from "@/utils/mocks/socials";
import { useRef } from "react";
import { EmailIcon } from "@/icons/email-icon";

const Navigation = [
    {
      title: "Compañía",
      links: [
        { href: "/", label: "Inicio" },
        { href: "https://docs.neenbyss.com", label: "Documentación", external: true },
        { href: "/marketplace", label: "Neenbyss Marketplace" },
        { href: "/portfolio", label: "Portfolio de Neenbyss" },
        { href: "/faqs", label: "Preguntas frecuentes" },
        { href: "/contact", label: "Contáctanos" }
      ]
    },
    {
      title: "Políticas",
      links: [
        { href: "/terms", label: "Términos y Condiciones" },
        { href: "/privacy", label: "Políticas de Privacidad" },
        { href: "/terms-software", label: "Uso de Software y Servicios" }
      ]
    }
];

export function Footer() {
    const route = useRouter();
    const input_email = useRef<HTMLInputElement>(null);

    return (
        <footer className="bg-content1 pt-20 pb-8">

            <div className="max-w-screen-2xl px-4 mx-auto">
                <div className=" bg-[#202258] px-12 py-8 rounded-3xl flex flex-col lg:flex-row items-center gap-8 justify-between">
                    
                    <div className="max-w-lg text-center lg:text-start">
                        <span className="block text-2xl md:text-4xl font-bold text-foreground pb-2">
                            Confía En <span>Nuestra Experiencia</span> Para Tu Próximo <span className="text-secondary">Proyecto</span>
                        </span>
                        <p className="text-sm"> Nos ocupamos de la tecnología, tú de hacer crecer tu negocio. </p>
                    </div>

                    <Button
                        variant="flat"
                    >
                        Área de Clientes
                    </Button>

                </div>

                <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4 py-8 mt-10 w-full">

                    <div className="sm:max-w-[340px] w-full flex flex-col items-center sm:items-start text-center sm:text-start">
                        <Link href="/" className="block">
                            <Image 
                                alt="NEENBYSS"
                                src={"/NEENBYSS_LOGO.png"}
                                width={500}
                                height={500}
                                className="w-36"
                                priority
                            />
                        </Link>

                        <p className="mt-4 text-sm">
                            Transformamos tu visión en experiencias digitales que inspiran y conectan con el futuro.
                        </p>

                        <span className="text-xs text-primary/50 pt-4"> Web desarrollada por el equipo de desarrollo y diseño de neenbyss </span>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap justify-between lg:justify-end gap-4 xl:gap-10 w-full">
                        {Navigation.map(({title, links}, i) => 
                            <div key={i} className="space-y-2 sm:max-w-[260px] w-full [&_a]:block [&_a]:text-sm text-center sm:text-start">
                                <span className="block text-medium font-bold mb-6"> {title} </span>

                                {links.map(({href, label, external}, y) =>
                                    <Link
                                        key={`${i}-${y}`} 
                                        href={href} 
                                        className="hover:text-primary focus:underline focus:text-secondary transition"
                                        {...external && {target: "_blank"}}
                                    >
                                        {label}
                                        {external && <ExternalLink className="size-3.5 -mt-2 inline-block ml-0.5" />}
                                    </Link>
                                )}
                            </div>
                        )}

                        <div className="space-y-4 sm:max-w-xs w-full">
                            <div>
                                    <span className="block text-medium font-bold mb-4 text-center sm:text-start"> Redes Sociales </span>

                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 [&_svg]:size-5">
                                        {Socials.map(({href, icon}, i) =>
                                            <Button 
                                                key={i}
                                                as="a"
                                                href={href}
                                                size="sm"
                                                target="_blank"
                                                startContent={icon}
                                                isIconOnly
                                                variant="flat"
                                                className="hover:scale-105"
                                            />
                                        )}
                                    </div>
                            </div>
                            <div className="space-y-2">
                                    <span className="block text-medium font-bold mb-6 text-center sm:text-start"> Contáctanos </span>

                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Input type="email" ref={input_email} endContent={<EmailIcon />} placeholder="tucorreo@gmail.com" />
                                        <Button
                                            onPress={() => {
                                                route.push(`/contact?email=${input_email.current?.value}`)
                                            }}
                                        >
                                            Enviar
                                        </Button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                <span className="block text-center mt-8 opacity-50 text-sm"> © Neenbyss {new Date().getFullYear()} | Todos los derechos reservados. </span>
            </div>

        </footer>
    )
}