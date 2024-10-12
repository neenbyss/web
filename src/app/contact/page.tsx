import { EmailIcon } from "@/icons/email-icon";
import { Button } from "@/components/common/button";
import { DiscordIcon } from "@/icons/discord-icon";
import { Socials } from "@/utils/mocks/socials";
import { ContactForm } from "@/components/forms/contact";

import { Contact } from "@/utils/mocks/contact";
import { BreadCrumb } from "@/components/layout/bread-crumb";

export default function ContactPage() {
    return (
        <main className="max-w-screen-xl mx-auto px-4 pt-28 md:pt-32 pb-10 flex flex-col lg:flex-row justify-between gap-12 w-full">
            
            <section className="max-w-xl w-full">
                <BreadCrumb
                    className="mb-4"
                    removeStyle
                />
                <h1 className="text-3xl md:text-5xl font-black mb-4 mt-2"> CONÉCTATE CON NUESTRO EQUIPO </h1>

                <span>
                    <span className="block font-medium text-primary">
                        ¿Necesitas ayuda o tienes una consulta?

                    </span>
                    <span>
                        Estamos aquí para asistirte.
                    </span>
                </span>
                <p className="pt-6 max-w-md">
                    Nuestro equipo de soporte especializado está listo para ofrecerte soluciones personalizadas y asesorarte en cada paso.
                </p>

                <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-5">

                    <div className="p-4 bg-primary/20 rounded-2xl w-full">
                        <Button
                            as="a"
                            href={Contact.email_contact.href}
                            variant="flat"
                            isIconOnly
                            className="text-foreground"
                            size="sm"
                        >
                            <EmailIcon />
                        </Button>

                        <span className="block text-foreground-foreground text-base font-bold mt-2"> Correo Empresarial </span>
                        <a href={Contact.email_contact.href} className="block">
                            {Contact.email_contact.email}
                        </a>
                    </div>

                    <div className="p-4 bg-primary/20 rounded-2xl w-full">
                        <Button
                            as="a"
                            href={Contact.discord.href}
                            target="_blank"
                            variant="flat"
                            isIconOnly
                            className="text-foreground"
                            size="sm"
                        >
                            <DiscordIcon />
                        </Button>

                        <span className="block text-foreground-foreground text-base font-bold mt-2"> Servidor Discord </span>
                        <a target="_blank" href={Contact.discord.href} className="block">
                            Enlace de invitación
                        </a>
                    </div>
                </div>

                <div className="mt-4">
                    <h2 className="font-medium text-lg mb-4">
                        Redes sociales
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 [&_svg]:size-6">
                        {Socials.map(({href, icon}, i) =>
                            <Button 
                                key={i}
                                as="a"
                                href={href}
                                target="_blank"
                                startContent={icon}
                                isIconOnly
                                variant="flat"
                                className="hover:scale-105"
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="w-full">
                <ContactForm />
            </section>
        </main>
    )
}