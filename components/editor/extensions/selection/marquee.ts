import { Extension } from "@tiptap/core"
import { Plugin, PluginKey, TextSelection } from "@tiptap/pm/state"

import { styledSelectionKey } from "./selection"

const key = new PluginKey("marqueeSelection")

/**
 * Selección tipo Windows: al arrastrar desde el margen/gutter del editor
 * (o desde una zona vacía) se dibuja un **rectángulo translúcido** que sigue
 * al ratón y va resaltando los bloques que toca (multi-bloque).
 *
 * Durante el arrastre NO se toca ProseMirror:
 *  - cambiar la selección en pleno gesto hace que Chromium lo cancele
 *    (los `pointermove` se "congelan" al pasar sobre texto),
 *  - y añadir clases al DOM de los bloques no sirve: el MutationObserver de PM
 *    las revierte.
 * Por eso el feedback en vivo se pinta con **overlays en `document.body`**
 * (`editor-block-overlay`), superpuestos a cada bloque. Al soltar se hace una
 * única `dispatch` con la selección real de texto en **modo bloque**, y a partir
 * de ahí el resaltado lo mantienen las decoraciones de `StyledSelection`.
 */
export const MarqueeSelection = Extension.create({
  name: "marqueeSelection",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key,
        view(view) {
          const dom = view.dom as HTMLElement
          const captureEl = document.documentElement
          const THRESHOLD = 4
          const EDGE = 56 // px del borde donde arranca el auto-scroll
          const MAX_SPEED = 16

          let startX = 0
          let startY = 0
          let lastX = 0
          let lastY = 0
          let pointerId = -1
          let pending = false
          let active = false
          let box: HTMLDivElement | null = null
          // Contenedor con scroll (o null = window) y su scroll al iniciar.
          let scrollEl: HTMLElement | null = null
          let startScrollTop = 0
          // Posición del documento donde arrancó la banda (ancla estable al hacer
          // scroll): la selección final va de aquí al punto actual.
          let anchorPos: number | null = null
          let autoRaf = 0
          // Pool de overlays (uno por bloque resaltado) montados en <body>.
          const overlays: HTMLDivElement[] = []

          // Solo iniciamos la banda si el pointerdown cae en el root del editor
          // (padding/gutter o zona vacía), no sobre texto real.
          const isGutter = (target: EventTarget | null) => target === dom

          function getScrollParent(el: HTMLElement): HTMLElement | null {
            let node = el.parentElement
            while (node) {
              const oy = getComputedStyle(node).overflowY
              if (/(auto|scroll|overlay)/.test(oy) && node.scrollHeight > node.clientHeight)
                return node
              node = node.parentElement
            }
            return null
          }
          const getScroll = () => (scrollEl ? scrollEl.scrollTop : window.scrollY)
          const applyScroll = (d: number) => {
            if (scrollEl) scrollEl.scrollTop += d
            else window.scrollBy(0, d)
          }
          const viewportRect = () =>
            scrollEl
              ? scrollEl.getBoundingClientRect()
              : new DOMRect(0, 0, window.innerWidth, window.innerHeight)
          const centerX = () => {
            const r = dom.getBoundingClientRect()
            return r.left + r.width / 2
          }

          function onPointerDown(e: PointerEvent) {
            if (e.button !== 0 || !isGutter(e.target)) return
            startX = e.clientX
            startY = e.clientY
            lastX = e.clientX
            lastY = e.clientY
            pointerId = e.pointerId
            pending = true
            active = false
            window.addEventListener("pointermove", onPointerMove, true)
            window.addEventListener("pointerup", onPointerUp, true)
          }

          function beginBox() {
            active = true
            scrollEl = getScrollParent(dom)
            startScrollTop = getScroll()
            anchorPos = view.posAtCoords({ left: centerX(), top: startY })?.pos ?? null
            box = document.createElement("div")
            box.className = "editor-marquee"
            document.body.appendChild(box)
            dom.style.userSelect = "none"
            try {
              captureEl.setPointerCapture(pointerId)
            } catch {
              /* noop */
            }
          }

          /** Dibuja la banda + overlays usando el ancla corregida por el scroll. */
          function update(clientX: number, clientY: number) {
            if (!box) return
            const anchorY = startY - (getScroll() - startScrollTop)
            const top = Math.min(anchorY, clientY)
            const bottom = Math.max(anchorY, clientY)
            box.style.left = `${Math.min(startX, clientX)}px`
            box.style.top = `${top}px`
            box.style.width = `${Math.abs(clientX - startX)}px`
            box.style.height = `${bottom - top}px`
            paintOverlays(top, bottom)
          }

          /** Auto-scroll continuo mientras el puntero está pegado a un borde. */
          function edgeSpeed(clientY: number) {
            const r = viewportRect()
            if (clientY < r.top + EDGE)
              return -Math.ceil(((r.top + EDGE - clientY) / EDGE) * MAX_SPEED)
            if (clientY > r.bottom - EDGE)
              return Math.ceil(((clientY - (r.bottom - EDGE)) / EDGE) * MAX_SPEED)
            return 0
          }
          function autoScrollTick() {
            autoRaf = 0
            if (!active) return
            const speed = edgeSpeed(lastY)
            if (speed === 0) return
            applyScroll(speed)
            update(lastX, lastY)
            autoRaf = requestAnimationFrame(autoScrollTick)
          }
          function maybeAutoScroll() {
            if (active && !autoRaf && edgeSpeed(lastY) !== 0)
              autoRaf = requestAnimationFrame(autoScrollTick)
          }

          function onPointerMove(e: PointerEvent) {
            if (!pending) return
            if (!active) {
              const dist = Math.hypot(e.clientX - startX, e.clientY - startY)
              if (dist < THRESHOLD) return
              beginBox()
            }
            lastX = e.clientX
            lastY = e.clientY
            update(lastX, lastY)
            maybeAutoScroll()
            e.preventDefault()
          }

          /** Overlays translúcidos sobre cada bloque que solapa la banda.
              La tolerancia (TOL) absorbe el jitter sub-píxel del borde para que
              el último bloque no parpadee al mantener la selección. */
          function paintOverlays(rectTop: number, rectBottom: number) {
            const TOL = 2
            const rects: DOMRect[] = []
            for (const child of Array.from(dom.children)) {
              if (!(child instanceof HTMLElement)) continue
              const r = child.getBoundingClientRect()
              if (r.bottom >= rectTop - TOL && r.top <= rectBottom + TOL) rects.push(r)
            }
            while (overlays.length < rects.length) {
              const o = document.createElement("div")
              o.className = "editor-block-overlay"
              document.body.appendChild(o)
              overlays.push(o)
            }
            overlays.forEach((o, i) => {
              const r = rects[i]
              if (!r) {
                o.style.display = "none"
                return
              }
              o.style.display = "block"
              o.style.left = `${r.left}px`
              o.style.top = `${r.top}px`
              o.style.width = `${r.width}px`
              o.style.height = `${r.height}px`
            })
          }

          function clearOverlays() {
            for (const o of overlays) o.remove()
            overlays.length = 0
          }

          /** Al soltar: una sola transacción con la selección real de texto.
              AJUSTA a los límites de los BLOQUES top-level (desde el inicio del
              primer bloque hasta el final del último): así el marquee selecciona
              bloques COMPLETOS y borrar/escribir afecta también al primero. */
          function commitSelection() {
            if (anchorPos == null) return
            const domRect = dom.getBoundingClientRect()
            const currentPos = view.posAtCoords({
              left: centerX(),
              top: Math.max(domRect.top + 1, Math.min(lastY, domRect.bottom - 1)),
            })?.pos
            if (currentPos == null) return
            const doc = view.state.doc
            const lo = Math.min(anchorPos, currentPos)
            const hi = Math.max(anchorPos, currentPos)
            const $lo = doc.resolve(lo)
            const $hi = doc.resolve(hi)
            // Ajuste a bloque completo (depth 1 = bloque top-level dentro del doc).
            const from = $lo.depth >= 1 ? $lo.start(1) : lo
            const to = $hi.depth >= 1 ? $hi.end(1) : hi
            if (from >= to) return
            const tr = view.state.tr.setSelection(TextSelection.create(doc, from, to))
            // Modo bloque → StyledSelection pinta los rectángulos translúcidos.
            tr.setMeta(styledSelectionKey, { blockMode: true })
            view.dispatch(tr.setMeta("addToHistory", false))
          }

          function cleanup() {
            window.removeEventListener("pointermove", onPointerMove, true)
            window.removeEventListener("pointerup", onPointerUp, true)
            if (autoRaf) cancelAnimationFrame(autoRaf)
            autoRaf = 0
            anchorPos = null
            clearOverlays()
            if (box) {
              box.remove()
              box = null
            }
            dom.style.userSelect = ""
            try {
              if (captureEl.hasPointerCapture(pointerId))
                captureEl.releasePointerCapture(pointerId)
            } catch {
              /* noop */
            }
            pending = false
            active = false
          }

          function onPointerUp() {
            const wasActive = active
            clearOverlays()
            if (wasActive) commitSelection()
            cleanup()
            if (wasActive) view.focus()
          }

          dom.addEventListener("pointerdown", onPointerDown, true)

          return {
            destroy() {
              dom.removeEventListener("pointerdown", onPointerDown, true)
              cleanup()
            },
          }
        },
      }),
    ]
  },
})
