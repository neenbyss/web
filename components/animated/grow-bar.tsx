"use client"

import { useMemo, type ComponentProps } from "react"
import { motion, type Variants } from "motion/react"

import { cn } from "@/lib/utils"
import { EASE } from "./variants"
import { useReveal } from "./use-reveal"

type GrowBarProps = ComponentProps<typeof motion.div> & {
  delay?: number
  duration?: number
}

/**
 * Barra que "crece" desde abajo (scaleY 0 → 1, origen inferior) al entrar en
 * pantalla. Pensada para el gráfico de fondo de la sección de stats: con un
 * `delay` incremental las barras suben una tras otra.
 */
export function GrowBar({
  delay = 0,
  duration = 0.9,
  className,
  ...props
}: GrowBarProps) {
  const { ref, state } = useReveal<HTMLDivElement>({ amount: 0.4 })
  const variants = useMemo<Variants>(
    () => ({
      hidden: { scaleY: 0 },
      visible: { scaleY: 1, transition: { duration, delay, ease: EASE } },
    }),
    [duration, delay]
  )
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={state}
      style={{ transformOrigin: "bottom" }}
      className={cn("will-change-transform", className)}
      {...props}
    />
  )
}

GrowBar.displayName = "GrowBar"
