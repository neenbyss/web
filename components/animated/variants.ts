import type { Transition, Variants } from "motion/react"

/**
 * Easing principal: easeOutQuad suavizado. Curva moderna y sutil — entra sin
 * "latigazo" ni frenado brusco al final (evita el efecto quieto→salto).
 */
export const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/** Variante un pelín más expresiva para revelados de bloque. */
export const EASE_OUT: [number, number, number, number] = [0.33, 1, 0.68, 1]

/** Viewport por defecto: se dispara una sola vez al entrar en pantalla. */
export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const

/** Transición base reutilizable. */
export const baseTransition: Transition = {
  duration: 0.7,
  ease: EASE,
}

/**
 * Variants para revelado palabra-por-palabra dentro de una caja con
 * overflow-clip (encabezados). El contenedor escalona; cada palabra sube
 * desde abajo dando el efecto de "salir cortada", ahora más sutil.
 */
export const wordContainer = (
  stagger = 0.045,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const wordChild: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

/**
 * Variants para revelado palabra-por-palabra en modo "fade" (párrafos y
 * descripciones): cada palabra aparece con opacidad y sube apenas unos px,
 * de forma progresiva, sutil y moderna. Sin clip, sin blur.
 */
export const wordChildFade: Variants = {
  hidden: { opacity: 0, y: 9 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

/**
 * Fábrica de variants "fade + subida" para bloques (botones, cards, divs).
 * Se usan como ETIQUETAS ("hidden"/"visible") y se memoizan en el componente:
 * así un re-render de la sección NO reinicia la animación de entrada (que es
 * justo lo que pasaba al pasar un objeto `animate` nuevo en cada render).
 */
export const fadeUpVariants = (
  y: number,
  duration: number,
  delay: number
): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: EASE },
  },
})

/** Igual que `fadeUpVariants` pero para el efecto "caja recortada" (clip). */
export const clipUpVariants = (duration: number, delay: number): Variants => ({
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration, delay, ease: EASE },
  },
})
