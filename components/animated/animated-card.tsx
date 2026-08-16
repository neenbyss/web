"use client"

import { useMemo, type ComponentProps } from "react"
import { motion } from "motion/react"

import { Card } from "@/components/ui/card"
import { fadeUpVariants } from "./variants"
import { useReveal } from "./use-reveal"

/**
 * `Card` convertido en componente motion. Aparece con desvanecimiento +
 * ligero desplazamiento, sin blur. Usa `delay` para escalonar grids/listas.
 */
const MotionCard = motion.create(Card)

type AnimatedCardProps = ComponentProps<typeof MotionCard> & {
  delay?: number
  y?: number
  duration?: number
}

export function AnimatedCard({
  delay = 0,
  y = 18,
  duration = 0.75,
  ...props
}: AnimatedCardProps) {
  const { ref, state } = useReveal<HTMLDivElement>({ amount: 0.3 })
  const variants = useMemo(
    () => fadeUpVariants(y, duration, delay),
    [y, duration, delay]
  )
  return (
    <MotionCard
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={state}
      {...props}
    />
  )
}

AnimatedCard.displayName = "AnimatedCard"
