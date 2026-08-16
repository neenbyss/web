"use client"

import { useRef } from "react"
import { useInView } from "motion/react"

import { useTransitionReady } from "@/components/transition/transition-context"

/**
 * Devuelve un `ref` y el estado de variante a aplicar ("visible"/"hidden").
 * Solo pasa a "visible" cuando el elemento entra en pantalla Y la cortina de
 * transición ya reveló — así las animaciones de entrada no se "gastan"
 * detrás del loading en la primera carga.
 */
export function useReveal<T extends Element = HTMLElement>(opts?: {
  amount?: number
  once?: boolean
}) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, {
    once: opts?.once ?? true,
    amount: opts?.amount ?? 0.3,
  })
  const ready = useTransitionReady()

  return { ref, state: inView && ready ? "visible" : "hidden" } as const
}
