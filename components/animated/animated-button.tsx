"use client"

import { useMemo, type ComponentProps } from "react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { fadeUpVariants } from "./variants"
import { useReveal } from "./use-reveal"

/**
 * `Button` convertido en componente motion (no es un <motion.div> envolviendo
 * un <button>, sino el propio botón animado). Aparece con desvanecimiento +
 * ligero desplazamiento, sin blur.
 */
const MotionButton = motion.create(Button)

type AnimatedButtonProps = ComponentProps<typeof MotionButton> & {
  delay?: number
  y?: number
  duration?: number
}

export function AnimatedButton({
  delay = 0,
  y = 35,
  duration = 0.6,
  ...props
}: AnimatedButtonProps) {
  const { ref, state } = useReveal<HTMLButtonElement>({ amount: 0.4 })
  const variants = useMemo(
    () => fadeUpVariants(y, duration, delay),
    [y, duration, delay]
  )
  return (
    <MotionButton
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={state}
      {...props}
    />
  )
}

AnimatedButton.displayName = "AnimatedButton"
