"use client"

import { useMemo, type ComponentProps, type ReactNode } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { clipUpVariants, fadeUpVariants } from "./variants"
import { useReveal } from "./use-reveal"

type RevealProps = {
  as?: keyof React.JSX.IntrinsicElements
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  /** Distancia (px) que recorre hacia arriba al aparecer. */
  y?: number
  /**
   * Si es `true`, el contenido sube desde dentro de una caja `overflow-clip`
   * (efecto "recortado" tipo encabezado). Si es `false`, solo desvanece +
   * desplaza. Nunca usa blur.
   */
  clip?: boolean
} & Omit<ComponentProps<typeof motion.div>, "children" | "ref">

/**
 * Revelado de bloque por scroll. Pensado para descripciones y subtítulos.
 * Con `clip`, recrea el efecto caja del encabezado pero a nivel de bloque.
 */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 16,
  clip = false,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as React.ElementType
  const { ref, state } = useReveal()
  // Variants memoizados + animate por ETIQUETA: identidades estables, así un
  // re-render de la sección no reinicia la entrada.
  const clipVariants = useMemo(
    () => clipUpVariants(duration, delay),
    [duration, delay]
  )
  const blockVariants = useMemo(
    () => fadeUpVariants(y, duration, delay),
    [y, duration, delay]
  )

  if (clip) {
    return (
      <MotionTag ref={ref} className={cn("overflow-clip", className)} {...rest}>
        <motion.span
          className="block will-change-transform"
          variants={clipVariants}
          initial="hidden"
          animate={state}
        >
          {children}
        </motion.span>
      </MotionTag>
    )
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={blockVariants}
      initial="hidden"
      animate={state}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

Reveal.displayName = "Reveal"
