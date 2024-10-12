"use client";

import { Button } from "@/components/common/button";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";
import { BreadCrumb } from "@/components/layout/bread-crumb";
import { BoxMenuIcon } from "@/icons/box-menu-icon";
import { ListIcon } from "@/icons/list-icon";
import { SearchIcon } from "@/icons/search-icon";
import { useHeader } from "@/store/header-store";
import { MarketplaceProvider, useMarketplace } from "@/store/marketplace-store";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


const Filters = [
  {
    key: "webs",
    label: "Páginas webs",
    amount: 40,
  },
  {
    key: "mobile",
    label: "Aplicaciones móviles",
    amount: 0,
  },
  {
    key: "designs",
    label: "Diseños UI/UX",
    amount: 0
  },
  {
    key: "fiveM",
    label: "Scripts FiveM",
    amount: 10
  }
];

export default function TemplatePortfolio({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isVisible } = useHeader();

  return (
    <MarketplaceProvider>
      <main className="relative overflow-clip">
        <div className="relative z-10 pt-28 pb-12 max-w-screen-2xl px-4 mx-auto w-full">
          <section className="relative overflow-hidden px-6 py-8 rounded-2xl">
            <div className="absolute top-0 left-0 size-full bg-[linear-gradient(90deg,#D650C8,#5D45FD)] opacity-30" />

            <div className="relative translate-x-0">
              <h1 className="text-5xl font-bold mb-2"> Neenbyss Marketplace </h1>
              <p>
                {" "}
                Bienvenido a nuestro marketplace, explora muchas plantillas para tus proyectos.{" "}
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
                <span className="font-bold block mb-4"> Filtros </span>
                <span className="uppercase opacity-40 mb-1.5 text-xs">
                  {" "}
                  CATEGORÍAS{" "}
                </span>

                <CheckboxGroup
                  defaultValue={Filters.map(x => x.key)}
                >
                  {Filters.map(({key, label, amount}, i) => 
                    <Checkbox key={i} value={key} className="hover:brightness-90" classNames={{
                      base: "inline-flex w-full max-w-full",
                      label: "w-full"
                    }}>
                      <span className="flex items-center gap-2 w-full justify-between">
                        <span className="block w-full">{label}</span>
                        <span className="flex text-xs rounded-lg w-6 h-6 font-bold bg-white/20">
                          <span className="block m-auto">{amount}</span>
                        </span>
                      </span>
                    </Checkbox>
                  )}
                </CheckboxGroup>

                <span className="uppercase opacity-40 mb-1.5 mt-2 text-xs">
                  {" "}
                  PRECIOS{" "}
                </span>
                
                <PriceRanger />
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
    </MarketplaceProvider>
  );
}

const PriceRanger = () => {
  const { price_range, setPriceRange } = useMarketplace();


  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider 
        label="Gama de precios"
        step={10}
        maxValue={5000}
        minValue={0}
        renderValue={() => <></>}
        value={price_range} 
        onChange={setPriceRange}
        size="sm"
      />
      <p className="block w-full text-xs text-end font-medium opacity-50">
        {Array.isArray(price_range) && price_range.map((b) => `$${b}`).join(" – ")}
      </p>
    </div>
  )
}

const Actions = () => {
  const { mode_content, setModeContent, setSearch, search } = useMarketplace();

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
