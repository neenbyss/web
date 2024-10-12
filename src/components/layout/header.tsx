"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@nextui-org/theme";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/common/button";
/** 
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/common/dropdown";
 */
// import { Accordion, AccordionItem } from "@nextui-org/accordion";
/** 
import { LangIcon } from "@/icons/lang-icon";
import { MiniDownIcon } from "@/icons/mini-down-icon";
*/
import { CloseIcon } from "@/icons/close-icon";
import { MenuIcon } from "@/icons/menu-icon";
import { ExternalLink } from "@/icons/external-link-icon";
import { DiscordIcon } from "@/icons/discord-icon";
import { UserIcon } from "@/icons/user-icon";

import { useHeader } from "@/store/header-store";
import { usePathname } from "next/navigation";

const Navigation = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
  },
  {
    href: "/marketplace",
    label: "Marketplace",
  },
  {
    href: "/docs",
    label: "Docs",
    external: true,
  },
  {
    href: "/contact",
    label: "Contáctanos",
  },
  {
    href: "/faqs",
    label: "FAQ",
  },
];

export function Header() {
  const {
    isVisible,
    setIsVisible,
    lastScrollY,
    setLastScrollY,
    hasScrolled,
    setHasScrolled,
    isShow,
    setShow,
  } = useHeader();

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) setIsVisible(false);
      else setIsVisible(true);

      if (currentScrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, setHasScrolled, setIsVisible, setLastScrollY]);

  useEffect(() => {
    setShow(false);
  }, [pathname, setShow]);

  return (
    <>
      <motion.header
        className={cn(
          " top-0 w-full z-50 transition ease-soft-spring",
          hasScrolled ? "bg-background/40 fixed" : "absolute"
        )}
        initial={{ y: 0, backdropFilter: "none" }}
        animate={{ y: isVisible ? 0 : "-100%", backdropFilter: hasScrolled ? "blur(64px)" : "none"  }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "duration-500 max-w-screen-2xl px-4 flex justify-between items-center gap-4 w-full mx-auto",
            hasScrolled ? "py-2" : "py-6"
          )}
        >
          <div className="flex items-center gap-4 lg:gap-12 w-full">
            <Link href="/" className="block w-32 md:w-40 transition hover:scale-105 hover:brightness-90">
              <Image
                alt="NEENBYSS"
                src={"/NEENBYSS_LOGO.png"}
                width={500}
                height={500}
                className="w-full"
                priority
              />
            </Link>

            <ul className="hidden lg:flex items-center gap-6">
              {Navigation.map((props, i) => (
                <li key={i} className="block">
                  <Link
                    href={props.href}
                    {...(props.external && { target: "_blank" })}
                    className="flex items-center gap-2 py-3 hover:text-primary transition-colors text-nowrap"
                  >
                    {props.label}
                    {props.external && <ExternalLink className="size-3.5" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              as="a"
              href="https://client.neenbyss.com"
              target="_blank"
              endContent={<UserIcon />}
            >
              Área de clientes
            </Button>

            <Button
              as="a"
              href="/invite"
              target="_blank"
              variant="light"
              isIconOnly
              className="text-foreground"
              startContent={<DiscordIcon className="size-4" />}
            />
            {/** 
            <Dropdown
              offset={15}
              placement="bottom-end"
              className="hidden lg:block"
            >
              <DropdownTrigger>
                <Button
                  color="default"
                  variant="flat"
                  startContent={<LangIcon />}
                  endContent={<MiniDownIcon />}
                >
                  ES
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Inglés</DropdownItem>
                <DropdownItem>Español</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            */}
          </div>

          <Button
            isIconOnly
            onPress={() => setShow(!isShow)}
            color="default"
            variant="flat"
            className="lg:hidden"
            startContent={
              isShow ? (
                <CloseIcon className="size-6" />
              ) : (
                <MenuIcon className="size-6" />
              )
            }
          />
        </div>
      </motion.header>
      <AnimatePresence>
        {isShow && (
          <motion.menu
            className="fixed top-0 block lg:hidden size-full bg-content1 py-4 z-[9999] px-4"
            variants={{
              enter: {
                y: 0,
                opacity: 1,
              },
              exit: {
                y: "-100%",
                opacity: 0,
              },
            }}
            initial={"exit"}
            animate={"enter"}
            exit={"exit"}
            transition={{
              duration: 0.5,
              ease: "circInOut",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="block">
                <Image
                  alt="NEENBYSS"
                  src={"/NEENBYSS_LOGO.png"}
                  width={500}
                  height={500}
                  className="w-32 md:w-48"
                  priority
                />
              </Link>
              <Button
                isIconOnly
                onPress={() => setShow(!isShow)}
                color="default"
                variant="flat"
                className="lg:hidden"
                startContent={
                  isShow ? (
                    <CloseIcon className="size-6" />
                  ) : (
                    <MenuIcon className="size-6" />
                  )
                }
              />
            </div>
            <div className="max-h-full overflow-y-auto pt-4 pb-14 no-scrollbar space-y-2">
              {Navigation.map((props, i) => (
                <Button
                  as={Link}
                  href={props.href}
                  key={i}
                  color="default"
                  variant="light"
                  className="w-full"
                  {...(props.external && { target: "_blank" })}
                  endContent={
                    props.external && <ExternalLink className="size-3.5" />
                  }
                >
                  {props.label}
                </Button>
              ))}
              <Button
                as={"a"}
                href={"/"}
                endContent={<UserIcon />}
                className="w-full"
              >
                Área de clientes
              </Button>
              <Button
                as={Link}
                href={"/invite"}
                target="_blank"
                endContent={<DiscordIcon />}
                className="w-full text-foreground"
                variant="light"
              >
                Servidor de discord
              </Button>
              {/** 
              <Accordion
                isCompact
                className="px-0"
                itemClasses={{
                  trigger:
                    "flex justify-center hover:bg-default/50 rounded-md ",
                  titleWrapper: "w-fit flex-initial",
                  title: "w-fit text-sm",
                }}
              >
                <AccordionItem
                  startContent={<LangIcon />}
                  title="Idioma: ES"
                  className="data-[open=true]:bg-primary/15 rounded-md duration-300"
                >
                  <div>
                    <Button
                      className="w-full"
                      variant="light"
                      placement="center"
                      color="default"
                    >
                      Español
                    </Button>
                    <Button
                      className="w-full"
                      variant="light"
                      placement="center"
                      color="default"
                    >
                      Inglés
                    </Button>
                  </div>
                </AccordionItem>
              </Accordion>
              */}
            </div>
          </motion.menu>
        )}
      </AnimatePresence>
    </>
  );
}
