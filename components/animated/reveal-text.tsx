"use client"

import {
  Fragment,
  cloneElement,
  isValidElement,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react"
import { motion } from "motion/react"

import { wordChild, wordChildFade, wordContainer } from "./variants"
import { useReveal } from "./use-reveal"

type Wrap = (node: ReactNode) => ReactNode

type Token =
  | { type: "word"; text: string; wrap?: Wrap }
  | { type: "break" }

/**
 * Recorre los children (string, arrays, elementos JSX) y los descompone en
 * tokens "palabra" o "salto de línea". Conserva los wrappers de estilo
 * (p.ej. <span className="text-primary">) aplicándolos a cada palabra, de
 * modo que un encabezado con palabras de colores sigue funcionando.
 */
function tokenize(node: ReactNode, wrap: Wrap | undefined, acc: Token[]): Token[] {
  if (node === null || node === undefined || typeof node === "boolean") return acc

  if (typeof node === "string" || typeof node === "number") {
    for (const part of String(node).split(/(\s+)/)) {
      if (part.length === 0 || /^\s+$/.test(part)) continue
      acc.push({ type: "word", text: part, wrap })
    }
    return acc
  }

  if (Array.isArray(node)) {
    node.forEach((child) => tokenize(child, wrap, acc))
    return acc
  }

  if (isValidElement(node)) {
    if (node.type === "br") {
      acc.push({ type: "break" })
      return acc
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = node as any
    const nextWrap: Wrap = (inner) => {
      const wrapped = cloneElement(el, { ...el.props }, inner)
      return wrap ? wrap(wrapped) : wrapped
    }
    tokenize(el.props?.children, nextWrap, acc)
    return acc
  }

  return acc
}

type RevealTextProps = {
  /** Etiqueta a renderizar (hereda la semántica del encabezado original). */
  as?: keyof React.JSX.IntrinsicElements
  children: ReactNode
  className?: string
  /** Retardo antes de empezar el escalonado. */
  delay?: number
  /** Separación entre palabras. */
  stagger?: number
  /**
   * `clip` (por defecto): cada palabra sube desde una caja recortada
   * (encabezados). `fade`: cada palabra aparece con opacidad + leve subida,
   * progresivo y sutil (párrafos / descripciones). Nunca usa blur.
   */
  variant?: "clip" | "fade"
} & Omit<ComponentProps<typeof motion.div>, "children">

/**
 * Revelado de texto palabra-por-palabra. Se renderiza como la etiqueta
 * indicada (sin divs extra) y conserva los wrappers de color del original.
 */
export function RevealText({
  as = "h2",
  children,
  className,
  delay = 0,
  variant = "clip",
  stagger,
  ...rest
}: RevealTextProps) {
  const tokens = useMemo(() => tokenize(children, undefined, []), [children])
  // motion expone un componente por cada etiqueta intrínseca.
  const MotionTag = motion[as as keyof typeof motion] as React.ElementType

  const isFade = variant === "fade"
  const step = stagger ?? (isFade ? 0.03 : 0.045)
  const childVariants = isFade ? wordChildFade : wordChild
  const { ref, state } = useReveal()
  // Memoizado: si se recrea en cada render, motion vuelve a disparar el
  // stagger cuando la sección se re-renderiza (p.ej. al inicializar carousels).
  const containerVariants = useMemo(
    () => wordContainer(step, delay),
    [step, delay]
  )

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={state}
      {...rest}
    >
      {tokens.map((token, i) => {
        if (token.type === "break") return <br key={`br-${i}`} />
        const inner = token.wrap ? token.wrap(token.text) : token.text
        if (isFade) {
          return (
            <Fragment key={`w-${i}`}>
              <motion.span
                variants={childVariants}
                className="inline-block will-change-[transform,opacity]"
              >
                {inner}
              </motion.span>{" "}
            </Fragment>
          )
        }
        return (
          <Fragment key={`w-${i}`}>
            <span className="inline-block overflow-clip">
              <motion.span
                variants={childVariants}
                className="inline-block will-change-transform"
              >
                {inner}
              </motion.span>
            </span>{" "}
          </Fragment>
        )
      })}
    </MotionTag>
  )
}

RevealText.displayName = "RevealText"
