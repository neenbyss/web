"use client";

import { Button } from "@/components/common/button";
import { BreadCrumb } from "@/components/layout/bread-crumb";
import { BoxMenuIcon } from "@/icons/box-menu-icon";
import { ListIcon } from "@/icons/list-icon";
import { SearchIcon } from "@/icons/search-icon";
import { useHeader } from "@/store/header-store";
import { PortfolioProvider, usePortfolio } from "@/store/portfolio-store";
import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ROOT = "/portfolio";

const Navigation = [
  {
    href: `${ROOT}`,
    label: "Todos",
    amount: 99,
  },
  {
    href: `${ROOT}/webs`,
    label: "Proyectos Web",
    amount: 99,
  },
  {
    href: `${ROOT}/designs`,
    label: "Diseños UI/UX",
    amount: 99,
  },
  {
    href: `${ROOT}/scripts-fivem`,
    label: "Scripts FiveM",
    amount: 99,
  },
  {
    href: `${ROOT}/configs-fivem`,
    label: "Configuraciones FiveM",
    amount: 99,
  },
];
export default function TemplatePortfolio({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const { isVisible } = useHeader();

  const route = useRouter();

  return (
    <PortfolioProvider>
      <main className="relative overflow-clip">
        <div className="relative z-10 pt-28 pb-12 max-w-screen-2xl px-4 mx-auto w-full">
          <section className="relative overflow-hidden px-6 py-8 rounded-2xl">
            <div className="absolute top-0 left-0 size-full bg-[linear-gradient(90deg,rgba(29,69,253),rgba(123,80,124))] opacity-30" />

            <div className="relative translate-x-0">
              <h1 className="text-5xl font-bold mb-2"> Nuestro Portfolio </h1>
              <p>
                {" "}
                Explora los proyectos que realizamos a lo largo de nuestra
                experiencia.{" "}
              </p>

              <BreadCrumb className="mt-4" />
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-[.35fr_1fr] gap-8 mt-8">
            <menu className="">
              <motion.div
                className="flex flex-col gap-3 sticky"
                initial={{ top: "6rem" }}
                animate={{ top: isVisible ? "6rem" : "1rem" }}
                transition={{ duration: 0.3 }}
              >
                <span className="uppercase opacity-40 mb-1.5 text-xs">
                  {" "}
                  CATEGORÍAS{" "}
                </span>

                {Navigation.map(({ href, label, amount }, i) => {
                  const isPath = path === href;
                  return (
                    <Button
                      key={i}
                      onPress={() => {
                        route.push(href)
                      }}
                      color={isPath ? "primary" : "default"}
                      variant={isPath ? "solid" : "light"}
                      placement="start"
                      className="text-start"
                      endContent={
                        <span
                          className={cn(
                            "flex text-xs rounded-lg w-6 h-6 font-bold",
                            isPath ? "bg-white/20" : "bg-primary/50"
                          )}
                        >
                          <span className="block m-auto">{amount}</span>
                        </span>
                      }
                    >
                      <span className="w-full block">{label}</span>
                    </Button>
                  );
                })}
              </motion.div>
            </menu>

            <div className="w-full">
              <div className="flex gap-4 max-w-lg mb-4">
                <Actions />
              </div>

              {children}
            </div>
          </section>
        </div>

        <div className="absolute top-[-25%] left-[-20%] w-[85vh] h-[85vh] rounded-full border border-[#724F9D]/30" />

        <div className="absolute top-[-35%] left-[-30%] w-[85vh] h-[85vh] rounded-full border border-[#724F9D]/30" />

        <div className="absolute top-[-35%] right-[-15%] w-[85vh] h-[85vh] rounded-full border border-[#BA8D61]/30" />
        <div className="absolute top-[-25%] right-[-30%] w-[85vh] h-[85vh] rounded-full border border-[#BA8D61]/30" />
      </main>
    </PortfolioProvider>
  );
}

const Actions = () => {
  const { mode_content, setModeContent, setSearch, search } = usePortfolio();

  const pathname = usePathname();

  useEffect(() => {
    setSearch("");
  }, [pathname, setSearch]);

  return (
    <div className="w-full">
      <span className="block text-xs opacity-60 mb-2"> Filtros </span>
      <div className="flex gap-4 max-w-2xl w-full">
        <Input
          startContent={<SearchIcon />}
          placeholder="Buscar"
          value={search}
          onValueChange={setSearch}
          isClearable
        />

        {mode_content === "grid_box" && (
          <Button
            startContent={<BoxMenuIcon />}
            isIconOnly
            color="default"
            variant="light"
            onPress={() => setModeContent("list_box")}
          />
        )}

        {mode_content === "list_box" && (
          <Button
            startContent={<ListIcon />}
            isIconOnly
            color="default"
            variant="light"
            onPress={() => setModeContent("grid_box")}
          />
        )}
      </div>
    </div>
  );
};
