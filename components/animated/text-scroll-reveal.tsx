"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

type TextScrollRevealProps = {
  children: string
  className?: string
  /** Etiqueta contenedora (por defecto un párrafo). */
  as?: "p" | "h2" | "h3" | "span"
}

/**
 * Revelado ligado al scroll: cada palabra aumenta su opacidad (de tenue a
 * plena) y sube ligeramente a medida que la sección atraviesa el viewport.
 * Tipo "text reveal" editorial.
 */
export function TextScrollReveal({
  children,
  className,
  as = "p",
}: TextScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  })

  const words = children.split(" ")
  const Tag = motion[as]

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </Tag>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const y = useTransform(progress, range, [8, 0])

  return (
    <span className="mr-[0.25em] inline-block">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  )
}

TextScrollReveal.displayName = "TextScrollReveal"
