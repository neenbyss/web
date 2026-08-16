"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"

import { useTransitionReady } from "@/components/transition/transition-context"
import { EASE } from "./variants"

type CountUpProps = {
  to: number
  from?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

/**
 * Número que cuenta hacia arriba cuando entra en pantalla (una sola vez).
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const ready = useTransitionReady()
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView || !ready) return
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, ready, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

CountUp.displayName = "CountUp"
