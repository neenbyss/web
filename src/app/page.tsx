/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/common/button";
import { useFloatingAnimation } from "@/hooks/use-floating-animation";
import { QuestionIcon } from "@/icons/question-icon";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Link from "next/link";
import { motion } from "framer-motion";
import { EmailIcon } from "@/icons/email-icon";

import { DiscordIcon } from "@/icons/discord-icon";
import { Input, Textarea } from "@nextui-org/input";
import { Contact } from "@/utils/mocks/contact";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { LinkIcon } from "@nextui-org/link";

import { CheckIcon } from "@/icons/check-icon";
import { WebIcon } from "@/icons/web-icon";
import { DesignIcon } from "@/icons/design-icon";
import { FivemIcon } from "@/icons/fivem-icon";
import { SystemIcon } from "@/icons/system-icon";
import { SettingsIcon } from "@/icons/settings-icon";
import { MaskBorder } from "@/components/common/mask-border";
import Marquee from "@/components/common/marquee";

const Services = [
  {
    icon: <WebIcon />,
    title: "Desarrollo Web",
    description:
      "Creamos sitios web y aplicaciones personalizadas que se adaptan a tus necesidades, utilizando las últimas tecnologías para asegurar un rendimiento óptimo y una experiencia de usuario excepcional.",
    sub: [
      "Webs personalizadas.",
      "Sistemas personalizados.",
      "Landing Pages.",
      "Páginas E-commerce.",
      "Blogs y sitios de contenido.",
      "Migración de sitios a nuevas plataformas.",
    ],
  },
  {
    icon: <DesignIcon />,
    title: "Diseños Digitales",
    description:
      "Diseñamos interfaces atractivas e intuitivas que ofrecen a los usuarios una experiencia fluida y placentera. Nuestro enfoque se centra en la estética y funcionalidad, asegurando una comunicación clara y satisfactoria, mientras reflejamos la identidad de la marca.",
    sub: [
      "Diseños de interfaces para aplicaciones web.",
      "Diseños de interfaces para dispositivos móviles.",
      "Creación de wireframes y mockups.",
      "Adaptación de diseños para dispositivos móviles (Responsive Design).",
      "Diseño de interfaces de paneles administrativos.",
    ],
  },
  {
    icon: <FivemIcon />,
    title: "Desarrollo de FiveM",
    description:
      "Creamos y personalizamos servidores de FiveM para ofrecer experiencias de juego únicas y adaptadas a tus preferencias. Desde la configuración inicial hasta la implementación de scripts avanzados, nuestro servicio garantiza un entorno de juego estable y emocionante para tu comunidad.",
    sub: [
      "Configuración de servidores de FiveM.",
      "Creación de scripts personalizados.",
      "Optimización del rendimiento del servidor.",
      "Personalización de UI y HUD en el juego.",
      "Soporte técnico para resolución de errores.",
      "Optimización del rendimiento del servidor.",
    ],
  },
  {
    icon: <SystemIcon />,
    title: "Mantenimiento",
    description:
      "Aseguramos que tus sistemas y plataformas digitales estén siempre en óptimas condiciones. Proveemos soporte continuo, actualizaciones de seguridad, y optimización para mantener tus sistemas funcionando sin problemas y adaptándose a las nuevas exigencias del mercado.",
    sub: [
      "Soporte técnico para resolución de problemas.",
      "Gestión de dominio y hosting.",
      "Actualización de contenido web.",
      "Mejora de compatibilidad con navegadores y dispositivos.",
    ],
  },
  {
    icon: <SettingsIcon />,
    title: "Configuración",
    description:
      "Realizamos configuraciones personalizadas para asegurar que todos los sistemas se desempeñen de manera integrada de manera eficiente. Desde la configuración inicial hasta los sistemas de pago, nuestra meta es simplificar y optimizar los procesos técnicos para que puedas concentrarte en lo que mejor haces: crecer.",
    sub: [
      "Configuración de servidores VPS y dedicados.",
      "Configuración de bases de datos.",
      "Configuración de cuentas de correos electrónicos corporativos.",
      "Aplicación de certificados SSL.",
      "Personalización de configuraciones de WordPress.",
      "Integración con plataformas de terceros.",
    ],
  },
];

export default function Home() {
  const circle1Animation = useFloatingAnimation(
    [50, 80],
    [10, 20],
    [10, 12],
    [18, 20]
  );
  const circle2Animation = useFloatingAnimation(
    [40, 70],
    [5, 15],
    [8, 10],
    [15, 18]
  );
  const circle3Animation = useFloatingAnimation(
    [30, 60],
    [8, 12],
    [10, 13],
    [19, 22]
  );
  const circle4Animation = useFloatingAnimation(
    [60, 90],
    [15, 25],
    [9, 11],
    [17, 20]
  );

  return (
    <main className="overflow-hidden">
      <section className="overflow-hidden relative bg-[radial-gradient(48%_100%_at_0%_5%,rgba(125,47,126,.16),rgba(70,62,124,0)_100%)] pt-[15dvh] pb-[20dvh] sm:pt-[20dvh] sm:pb-[45dvh]">
        <div className="relative z-10 max-w-screen-2xl px-4 mx-auto">
          <div className="text-center">
            <h1 className="font-black text-5xl sm:text-6xl lg:text-8xl py-4">
              {" "}
              ARQUITECTOS DIGITALES{" "}
            </h1>
            <span className="text-xl sm:text-3xl lg:text-5xl font-black">
              <span className="text-secondary"> DESARROLLAMOS </span>
              <span> TUS PROYECTOS </span>
            </span>

            <div className="mt-8 max-w-5xl mx-auto space-y-2 text-center text-lg">
              <p className="">
                Convertimos ideas en realidades digitales, creando experiencias
                únicas que conectan con el futuro.
              </p>
              <p>
                Nuestro enfoque creativo y técnico nos permite construir
                proyectos innovadores que inspiran y transforman, impulsando tu
                visión hacia nuevas dimensiones.
              </p>
            </div>

            <div className="mt-10 flex gap-4 justify-center">
              <Button> Nuestros Servicios </Button>
              <Button variant="light" className="text-foreground">
                Explora Proyectos
              </Button>
            </div>
          </div>

          <MaskBorder className="mt-10 max-w-5xl mx-auto">
            <Marquee className="[--duration:30s]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-lg px-5 py-1.5 border border-divider bg-gradient-to-tr from-primary/5 to-secondary/10 shadow-inner shadow-primary/10"
                >
                  Página web
                </span>
              ))}
            </Marquee>
          </MaskBorder>
        </div>

        <motion.div
          className="absolute top-[5%] left-[-80%] md:left-[-50%] lg:left-[-30%] w-[85vh] h-[85vh] rounded-full border border-[#724F9D]/50"
          animate={circle1Animation}
        />

        <motion.div
          className="absolute top-[18%] left-[-70%] md:left-[-40%] lg:left-[-20%] w-[85vh] h-[85vh] rounded-full border border-[#724F9D]/50"
          animate={circle2Animation}
        />

        <motion.div
          className="absolute top-[-25%] right-[-55%] md:right-[-35%] lg:right-[-15%] w-[85vh] h-[85vh] rounded-full border border-[#BA8D61]/60"
          animate={circle3Animation}
        />
        <motion.div
          className="absolute top-[-5%] right-[-64%] md:right-[-44%] lg:right-[-24%] w-[85vh] h-[85vh] rounded-full border border-[#BA8D61]/60"
          animate={circle4Animation}
        />
      </section>

      <section className="rounded-[4rem] bg-content1/80 my-20 overflow-hidden">
        <div className="py-40 bg-[radial-gradient(at_center,rgba(93,69,253,0.1),rgba(0,0,0,0)_50%)]">
          <div className="max-w-screen-2xl px-4 mx-auto">
            <div className="">
              <h2 className="text-5xl font-black uppercase max-w-3xl mt-4">
                SERVICIOS que Convierten Ideas en Realidad
              </h2>
              <p className="pt-3 max-w-3xl">
                En Neenbyss, nos dedicamos a ofrecer soluciones integrales que
                combinan creatividad, tecnología y eficiencia. Nuestro enfoque
                está en transformar ideas en realidades tangibles, adaptándonos
                a las necesidades de cada proyecto para impulsar el éxito de
                nuestros clientes.
              </p>
            </div>
            <div className="pt-20 opacity-80 grid gap-4 grid-cols-2 lg:grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[50%_50%] lg:[&>div]:col-span-2 lg:[&_div:nth-child(4)]:col-[2_/_span_2]">
              {Services.map(({ title, icon, description, sub }, i) => (
                <div
                  key={i}
                  className="p-5 bg-gradient-to-t from-[rgba(25,27,32,.5)] to-[rgb(48,51,62,.5)] rounded-xl border border-white/5 space-y-4"
                >
                  <div className="">
                    <div className="w-7 h-7 rounded-lg bg-primary [&_svg]:drop-shadow-[0_0_10px_rgba(255,255,255)] [&_svg]:size-4 flex flex-col [&_svg]:m-auto mb-3">
                      {icon}
                    </div>
                    <h3 className="text-lg font-bold"> {title} </h3>
                    <p>{description}</p>
                  </div>

                  <div>
                    <span className="font-black"> --- </span>

                    <ul className="mt-2 flex flex-col gap-1.5 text-foreground font-medium">
                      {sub.map((t, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <CheckIcon className="size-4 text-primary" />
                          <span> {t} </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="py-20 px-4">
          <div className="text-center max-w-screen-2xl mx-auto">
            <span className="uppercase font-bold text-primary text-xl">
              {" "}
              Nuestros proyectos{" "}
            </span>
            <h2 className="text-5xl font-black uppercase">
              {" "}
              Proyectos que inspiran confianza{" "}
            </h2>
            <div>
              <p className="pt-4">
                En Neenbyss, nos enorgullece presentar nuestro portafolio, que
                incluye una selección de proyectos en los que hemos participado
                y desarrollado.
              </p>
              <p className="pb-4">
                Cada uno de estos proyectos refleja nuestro compromiso con la
                calidad, la innovación y la satisfacción de nuestros clientes.
              </p>
              <p>
                Explora nuestros logros y descubre cómo en Neenbyss
                transformamos ideas en resultados concretos.
              </p>
            </div>
          </div>

          <MaskBorder className="flex flex-col gap-4 py-20">
            <Marquee pauseOnHover className="[--duration:80s]">
              {Array.from({length: 10}).map((_, i) =>
                <Link key={i} href="#" className="block max-w-sm lg:max-w-lg hover:scale-[1.02] transition">
                  <ProjectCard 
                    key={i}
                    img="https://neubox.com/blog/wp-content/uploads/2023/02/1-1.webp"
                    title={`Project Name ${i++}`}
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta earum corporis non velit consequuntur tempore odit maxime, dolore labore repellat fugiat et vitae exercitationem libero placeat eum assumenda aut. Non!"
                    tag="project-v"
                  />
                </Link>
              )}
            </Marquee>    
            <Marquee pauseOnHover reverse className="[--duration:80s] ">
              {Array.from({length: 10}).map((_, i) =>
                <Link key={i} href="#" className="block max-w-sm lg:max-w-lg hover:scale-[1.02] transition">
                  <ProjectCard 
                    key={i}
                    img="https://neubox.com/blog/wp-content/uploads/2023/02/1-1.webp"
                    title={`Project Name ${i++}`}
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta earum corporis non velit consequuntur tempore odit maxime, dolore labore repellat fugiat et vitae exercitationem libero placeat eum assumenda aut. Non!"
                    tag="project-v"
                  />
                </Link>
              )}
            </Marquee>    
          </MaskBorder>

          <div className="flex justify-end max-w-screen-2xl mx-auto">
            <Button as={Link} href="/portfolio">
              Explorar más
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-44 px-4 bg-[radial-gradient(40%_80%_at_100%_80%,_rgba(38,_191,_138,_0.2),_rgba(54,_216,_194,_0)_100%),_radial-gradient(50%_80%_at_0%_0%,_rgba(35,_56,_235,_0.2),_rgba(213,_32,_220,_0)_100%),_linear-gradient(90deg,rgba(147,44,230,.2),rgba(36,41,82,.2))] bg-[length:200%_200%] animate-gradient">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-4 justify-between">
          <div className="w-full lg:max-w-xl flex flex-col gap-10 lg:gap-4 justify-between lg:h-[364px]">
            <div>
              <h2 className="text-5xl font-black leading-[50px]">
                {" "}
                PREGUNTAS FRECUENTES{" "}
              </h2>
              <p>
                Si tienes alguna duda, consulta nuestras preguntas frecuentes
                para encontrar la respuesta que necesitas.
              </p>
            </div>

            <div className="w-full lg:max-w-[470px]">
              <h3 className="text-xl font-bold text-secondary">
                {" "}
                ¿TIENES DUDAS?
              </h3>
              <p>
                Aún tienes dudas? Únete a nuestro
                <a
                  href="/invite"
                  target="_blank"
                  className="text-primary hover:underline mx-1"
                >
                  servidor de Discord
                </a>
                o
                <Link
                  href="/contact"
                  className="text-primary hover:underline mx-1"
                >
                  Contáctanos
                </Link>
                para recibir soporte más personalizado.
              </p>
            </div>
          </div>

          <div className="lg:max-w-xl w-full">
            <Accordion showDivider={false} className="px-0 flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <AccordionItem
                  key={i}
                  startContent={<QuestionIcon />}
                  classNames={{
                    title: "font-medium text-sm lg:text-base",
                    indicator: "!text-foreground [&_svg]:size-5",
                  }}
                  title="Acá una pregunta frecuente para resolver dudas"
                  className="bg-primary/60 data-[hover=true]:bg-primary px-6 rounded-2xl text-sm"
                >
                  <p className="pb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-44 px-4 bg-gradient-to-l to-[#9747FF]/[.05] from-[#191B20] overflow-hidden">
        <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-4 justify-between">
          <div className="max-w-lg w-full">
            <span className="text-secondary text-xl font-bold">
              {" "}
              CONTÁCTANOS{" "}
            </span>
            <h2 className="text-5xl font-black pt-1.5 pb-3">
              NOS ENCANTARÍA PODER AYUDARTE
            </h2>
            <p> Contáctanos para un soporte más personalizado </p>

            <div className="mt-4 flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-content1">
                <Button
                  href={Contact.email_contact.href}
                  as="a"
                  variant="flat"
                  isIconOnly
                  startContent={<EmailIcon className="size-5" />}
                />

                <div>
                  <span className="block text-primary font-medium">
                    {" "}
                    Correo Empresarial{" "}
                  </span>
                  <Link
                    href={Contact.email_contact.href}
                    className="block hover:text-primary focus:text-secondary focus:underline"
                  >
                    {" "}
                    {Contact.email_contact.email}{" "}
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-content1">
                <Button
                  href={Contact.discord.href}
                  as="a"
                  variant="flat"
                  isIconOnly
                  startContent={<DiscordIcon className="size-5" />}
                />

                <div>
                  <span className="block text-primary font-medium">
                    {" "}
                    Servidor de Discord{" "}
                  </span>
                  <Link
                    href={Contact.discord.href}
                    className="block hover:text-primary focus:text-secondary focus:underline"
                  >
                    {" "}
                    Invitación{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl bg-content1 rounded-2xl p-5">
            <h3 className="text-3xl font-bold">Contáctanos</h3>
            <p>
              Envíanos mensaje a través de nuestro correo para un soporte más
              detallado.
            </p>

            <ContactSubmit />
          </div>
        </div>

        <div className="absolute bottom-[-20%] left-[-20%] w-[75vh] h-[75vh] rounded-full border border-[#9D7C4F]/20" />
        <div className="absolute bottom-[20%] left-[-30%] w-[75vh] h-[75vh] rounded-full border border-[#9D7C4F]/20" />

        <div className="absolute top-[-35%] right-[-10%] w-[75vh] h-[75vh] rounded-full border border-[#6761BA]/20" />
        <div className="absolute top-[5%] right-[-20%] w-[75vh] h-[75vh] rounded-full border border-[#6761BA]/20" />
      </section>
    </main>
  );
}

const ContactSubmit = () => {
  const route = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const values = {
      names: form.get("names") ?? "",
      email: form.get("email") ?? "",
      phone: form.get("phone") ?? "",
      issue: form.get("issue") ?? "",
      message: form.get("message") ?? "",
    };
    const parse = Object.entries(values)
      .map((x) => {
        return `${x[0]}=${x[1]}`;
      })
      .join("&");
    route.push(`/contact?${parse}`);
  };
  return (
    <form className="flex flex-col gap-3 mt-8" onSubmit={onSubmit}>
      <Input type="name" name="names" label="Nombre Completo" />
      <div className="flex gap-3">
        <Input
          type="email"
          name="email"
          label="Tu dirección E-mail"
          placeholder="correo@neenbyss.com"
        />
        <Input
          type="phone"
          name="phone"
          label="Número de teléfono"
          placeholder="+00 00000000"
        />
      </div>
      <Input type="text" name="issue" label="Asunto" />
      <Textarea name="message" label="Mensaje" />

      <div className="flex justify-end">
        <Button type="submit" color="secondary" endContent={<LinkIcon />}>
          {" "}
          Enviar{" "}
        </Button>
      </div>
    </form>
  );
};


const ProjectCard = ({
  img,
  title,
  description,
  tag,
}: {
  img: string,
  title: string,
  description: string,
  tag: string,
}) => {
  return (
    <figure className="group relative w-full aspect-video rounded-3xl overflow-clip border-none hover:cursor-pointer isolate">
      <img
        alt="aea"
        className="absolute top-0 left-0 size-full aspect-video"
        src={img}
        width={720}
        height={720}
      />
      <div className="relative z-10 size-full flex bg-gradient-to-t to-content1/20 from-content1 from-10% backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl scale-[1.01]">
        <div className="mt-auto w-full h-fit px-4 pt-10 pb-4">
          <figcaption className="font-bold text-xl uppercase duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-75 translate-y-10 group-hover:translate-y-0">
            {title}
          </figcaption>
          <p className="duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-300 translate-y-10 group-hover:translate-y-0">
            {description}
          </p>

          <blockquote className="text-primary duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-500 translate-y-10 group-hover:translate-y-0 block mt-2"> #{tag} </blockquote>
        </div>
      </div>
    </figure>
  );
};