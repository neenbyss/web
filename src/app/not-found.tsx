"use client";
import { Button } from "@/components/common/button";
import Link from "next/link";

import { motion} from "framer-motion";

import { useFloatingAnimation } from "@/hooks/use-floating-animation";

export default function NotFound() {
    const circle1Animation = useFloatingAnimation([50, 80], [10, 20], [10, 12], [18, 20]);
    const circle2Animation = useFloatingAnimation([40, 70], [5, 15], [8, 10], [15, 18]);
    const circle3Animation = useFloatingAnimation([30, 60], [8, 12], [10, 13], [19, 22]);
    const circle4Animation = useFloatingAnimation([60, 90], [15, 25], [9, 11], [17, 20]);

  return (
    <main className="h-dvh flex bg-gradient-to-t from-[rgba(95,29,30,.2)] to-[rgba(0,0,0,0)] relative overflow-hidden">
    <title> Página no encontrada </title>
      <div className="m-auto text-center">
        <h1 className="block text-[10rem] leading-[10rem] text-danger font-black">
          {" "}
          404{" "}
        </h1>
        <span className="font-bold text-5xl">
          {" "}
          ¡Oh no! Página no encontrada{" "}
        </span>
        <p className="text-opacity-70 pt-4">
          {" "}
          Parece que la ruta que estás buscando no existe o fue removida.{" "}
        </p>
        <Button as={Link} href="/" className="mt-8">
          {" "}
          Ir al Inicio{" "}
        </Button>
      </div>

      {/* Círculos animados */}
      <motion.div
        className="absolute bottom-[-55%] left-[-5%] w-[85vh] h-[85vh] rounded-full border border-[#D12DEA]/20 shadow-[inset_0_-.4rem_.2rem_rgba(209,45,234,0.2)]"
        animate={circle1Animation} // Usamos la animación flotante del hook
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-20%] w-[85vh] h-[85vh] rounded-full border border-[#9E2DEA]/20 shadow-[inset_0_-.4rem_.2rem_rgba(158,45,234,0.2)]"
        animate={circle2Animation}
      />
      <motion.div
        className="absolute top-[-25%] right-[-12%] w-[80vh] h-[80vh] rounded-full border border-[#662DEA]/20 shadow-[inset_0_-.4rem_.2rem_rgba(102,45,234,0.2)]"
        animate={circle3Animation}
      />
      <motion.div
        className="absolute top-[-2%] right-[-30%] w-[80vh] h-[80vh] rounded-full border border-[#F2A11E]/20 shadow-[inset_0_-.4rem_.2rem_rgba(242,161,30,0.2)]"
        animate={circle4Animation}
      />
    </main>
  );
}
