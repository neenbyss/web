"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { motion, stagger, useAnimate } from "motion/react"

import { EASE_OUT } from "@/components/animated"
import { TransitionReadyContext } from "./transition-context"

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/** Normaliza una ruta para comparar (ignora la barra final). */
const normalize = (p: string) => {
  const clean = p.split("#")[0].split("?")[0]
  return clean.length > 1 ? clean.replace(/\/+$/, "") : clean
}

/** Tiempo que se muestra el logo en el intro de la PRIMERA carga. */
const INTRO_LOGO_MS = 500
/** Espera tras confirmar la carga para que la nueva ruta pinte bajo la cortina. */
const PAINT_DELAY_MS = 60
/** Tope de seguridad: nunca dejar la cortina puesta más de esto esperando la ruta. */
const MAX_WAIT_MS = 6000

type PageTransitionProps = { children: ReactNode }

/**
 * Transición de página tipo "cortina" de 3 bandas que se deslizan en
 * horizontal (derecha → izquierda) en ola.
 *
 *  - PRIMERA CARGA: arranca cubierta y muestra el isotipo (intro de marca,
 *    mientras se "calienta" todo); luego revela. Las animaciones de entrada
 *    de la web se sincronizan con el reveal (no se gastan detrás).
 *  - NAVEGACIÓN entre rutas: SOLO el wipe (sin logo ni espera artificial).
 *    Se apoya en la navegación instantánea de Next: cubre → navega de verdad
 *    → espera a que la ruta esté lista (normalmente inmediato) → revela. Así
 *    no se ve el contenido antes de tiempo pero tampoco un "loading" en cada
 *    clic.
 *
 * SEO: no afecta al indexado — los bots piden cada URL por SSR (no hacen clic)
 * y los enlaces son <Link> reales con prefetch. La cortina es una capa `fixed`
 * puramente visual con `aria-hidden`; sin JS se oculta vía <noscript>.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const [scope, animate] = useAnimate()
  const router = useRouter()
  const pathname = usePathname()

  // `false` mientras la cortina cubre: gatea las animaciones de entrada de la
  // web para que no se "gasten" detrás del loading en la primera carga.
  const [ready, setReady] = useState(false)

  const busyRef = useRef(false)
  const pathnameRef = useRef(pathname)
  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])
  // Resolver pendiente que se cumple cuando la ruta destino queda confirmada.
  const pendingRef = useRef<{ href: string; resolve: () => void } | null>(null)

  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  // Cuando cambia el pathname y coincide con el destino pendiente → cargado.
  useEffect(() => {
    const pending = pendingRef.current
    if (pending && normalize(pathname) === normalize(pending.href)) {
      pending.resolve()
      pendingRef.current = null
    }
  }, [pathname])

  const waitForRoute = useCallback((href: string) => {
    if (normalize(pathnameRef.current) === normalize(href)) return Promise.resolve()
    return new Promise<void>((resolve) => {
      pendingRef.current = { href, resolve }
    })
  }, [])

  // Cierra la cortina: las bandas entran de DERECHA a IZQUIERDA escalonadas
  // (efecto ola). Solo las bandas — el logo es exclusivo del intro.
  const cover = useCallback(async () => {
    if (!scope.current) return
    await animate(
      "[data-panel]",
      { x: ["110%", "0%"] },
      { duration: 0.55, ease: EASE_OUT, delay: stagger(0.08, { from: "last" }) }
    )
  }, [animate, scope])

  // Abre la cortina: las bandas salen hacia la izquierda revelando la web.
  const reveal = useCallback(async () => {
    if (!scope.current) return
    await animate(
      "[data-panel]",
      { x: "-110%" },
      { duration: 0.55, ease: EASE_OUT, delay: stagger(0.08, { from: "last" }) }
    )
  }, [animate, scope])

  // SOLO PRIMERA CARGA: arranca cubierto → muestra el logo (intro de marca,
  // mientras se "calienta" todo) → revela. `ready` se activa justo al empezar
  // el reveal para que las animaciones de entrada de la web no se gasten
  // detrás de la cortina. En navegaciones posteriores NO se repite el logo.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!scope.current) return
      if (prefersReduced.current) {
        setReady(true)
        await animate("[data-panel]", { x: "-110%" }, { duration: 0 })
        await animate("[data-logo]", { opacity: 0 }, { duration: 0 })
        return
      }
      await animate("[data-logo]", { opacity: 1, scale: 1 }, { duration: 0.3 })
      await wait(INTRO_LOGO_MS)
      if (cancelled) return
      setReady(true)
      // Oculta el logo y revela las bandas a la vez.
      animate("[data-logo]", { opacity: 0, scale: 0.92 }, { duration: 0.25 })
      await reveal()
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // NAVEGACIÓN ENTRE RUTAS: solo el wipe bonito, sin logo ni espera artificial.
  // Aprovecha la navegación instantánea de Next: cubre, navega de verdad,
  // espera únicamente a que la ruta esté lista (suele ser inmediato) y revela.
  const navigate = useCallback(
    async (href: string) => {
      if (busyRef.current) return
      if (normalize(href) === normalize(pathnameRef.current)) return

      if (prefersReduced.current) {
        router.push(href)
        return
      }

      busyRef.current = true
      await cover()
      router.push(href)
      await Promise.race([waitForRoute(href), wait(MAX_WAIT_MS)])
      await wait(PAINT_DELAY_MS)
      await reveal()
      busyRef.current = false
    },
    [cover, reveal, router, waitForRoute]
  )

  // Mantiene una referencia estable para el listener global de clics.
  const navigateRef = useRef(navigate)
  useEffect(() => {
    navigateRef.current = navigate
  }, [navigate])

  // Intercepta los clics en enlaces internos para ejecutar la transición real.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return

      const anchor = (e.target as HTMLElement | null)?.closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      const target = anchor.getAttribute("target")
      if (
        !href ||
        anchor.hasAttribute("download") ||
        (target && target !== "_self") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (normalize(url.pathname) === normalize(pathnameRef.current)) return

      e.preventDefault()
      navigateRef.current(url.pathname + url.search + url.hash)
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return (
    <TransitionReadyContext.Provider value={ready}>
      {children}

      <div
        ref={scope}
        aria-hidden="true"
        role="presentation"
        className="nb-page-transition pointer-events-none fixed inset-0 z-100 overflow-hidden"
      >
        <noscript>
          <style>{`.nb-page-transition{display:none!important}`}</style>
        </noscript>

        {/* 3 bandas monocolor (fondo) que se deslizan en horizontal. El borde
            primary lidera el movimiento (ola) y solo se ve mientras se mueven;
            las bandas se solapan un poco para que no quede línea de costura. */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            data-panel
            className="absolute left-0 w-full bg-secondary will-change-transform"
            style={{ top: `${i * 33.34}%`, height: "34%" }}
          >
            {/* borde de avance (cubrir: va hacia la izquierda) */}
            <div className="absolute top-0 right-full h-full w-16 bg-primary/80" />
            {/* borde de avance (revelar: sale hacia la izquierda) */}
            <div className="absolute top-0 left-full h-full w-16 bg-primary/80" />
          </div>
        ))}

        {/* Logo de carga centrado (se adapta al tema) */}
        <div
          data-logo
          className="absolute inset-0 z-10 grid place-items-center will-change-[transform,opacity]"
        >
          <motion.div
            animate={{ scale: [1, 1.07, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logos/Isotipo - Neenbyss Studios.svg"
              alt="Neenbyss Studios"
              width={400}
              height={120}
              priority
              className="hidden h-14 w-56 object-contain dark:block"
            />
            <Image
              src="/logos/Isotipo black - Neenbyss Studios.svg"
              alt="Neenbyss Studios"
              width={400}
              height={120}
              priority
              className="h-14 w-56 object-contain dark:hidden"
            />
          </motion.div>
        </div>
      </div>
    </TransitionReadyContext.Provider>
  )
}

PageTransition.displayName = "PageTransition"
