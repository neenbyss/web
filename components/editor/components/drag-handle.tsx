"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useTiptap, type Editor } from "@tiptap/react"
import { DragHandle as DragHandleReact } from "@tiptap/extension-drag-handle-react"
import { IconGripVertical, IconPlus } from "@tabler/icons-react"
import type { Node } from "@tiptap/pm/model"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BlockMenu } from "./block-menu"

// Ancho de la banda a la izquierda de la columna donde vive el handle. Con el
// puntero más a la izquierda que esto (gutter exterior) ocultamos el handle para
// que ahí solo funcione el seleccionador (marquee).
const HANDLE_ZONE = 80

// Constantes ESTABLES (fuera del render): si se pasan objetos/funciones nuevos
// en cada render, el useEffect de DragHandleReact re-registra su plugin y eso
// reconfigura el editor → resetea la Suggestion (el slash se cerraba al mover
// el ratón). `left` centra el handle verticalmente respecto al bloque.
const POSITION_CONFIG = { placement: "left" } as const

/**
 * Drag handle estilo Notion: aparece junto al bloque bajo el cursor con un botón
 * "＋" (inserta un bloque debajo y abre el menú "/") y un grip para arrastrar.
 * La extensión posiciona el elemento raíz vía `style.left/top`; el "deslizado"
 * entre bloques se anima con una transición CSS sobre esas propiedades
 * (ver `.editor-drag-handle` en globals.css). `motion` con `layout` no sirve
 * aquí porque quien se mueve es el elemento raíz que controla la extensión.
 */
export function EditorDragHandle() {
  const { editor } = useTiptap()
  const [current, setCurrent] = useState<{ node: Node | null; pos: number }>({
    node: null,
    pos: -1,
  })
  const [menuOpen, setMenuOpen] = useState(false)
  // Puntero en el gutter exterior (a la izquierda de la banda del handle o a la
  // derecha del contenido): ahí ocultamos el handle y solo funciona el marquee.
  const [inGutter, setInGutter] = useState(false)
  const gripRef = useRef<HTMLButtonElement>(null)
  // Detección de arrastre vs clic en el grip: si el puntero se mueve tras
  // presionar, es un DRAG (no abrimos el menú); si no, es un clic (abre el menú).
  const pressRef = useRef<{ x: number; y: number } | null>(null)
  const movedRef = useRef(false)
  // Con el menú abierto, congelamos el bloque objetivo: si el ratón se mueve, la
  // extensión reposiciona el handle, pero las acciones deben seguir apuntando al
  // bloque donde se abrió el menú (no al que quede debajo del cursor).
  const menuOpenRef = useRef(false)
  useEffect(() => {
    menuOpenRef.current = menuOpen
  }, [menuOpen])
  // pos del bloque actual accesible desde callbacks estables (virtual element).
  const currentPosRef = useRef(-1)

  // Estable entre renders para no re-registrar el plugin del drag handle.
  const handleNodeChange = useCallback(
    (data: { node: Node | null; editor: Editor; pos: number }) => {
      if (menuOpenRef.current) return
      currentPosRef.current = data.pos
      setCurrent({ node: data.node, pos: data.pos })
    },
    []
  )

  // La tabla vive en un `.tableWrapper` a TODO el ancho (para el scroll), pero la
  // `<table>` arranca alineada con la columna de lectura (padding-left). Anclamos
  // el handle a la `<table>` interna para que quede alineado como los demás
  // bloques (no al borde del wrapper, que está muy a la izquierda). Para el resto
  // de nodos devolvemos null → la extensión usa el rect del bloque (por defecto).
  const getReferencedVirtualElement = useCallback(() => {
    const pos = currentPosRef.current
    if (pos < 0 || !editor) return null
    const dom = editor.view.nodeDOM(pos)
    if (dom instanceof HTMLElement && dom.classList.contains("tableWrapper")) {
      const table = dom.querySelector("table")
      if (table) return { getBoundingClientRect: () => table.getBoundingClientRect() }
    }
    return null
  }, [editor])

  // Solo gating HORIZONTAL: la extensión ya decide la visibilidad vertical
  // (aparece a la altura del bloque bajo el cursor). Aquí únicamente ocultamos
  // cuando el puntero está en el margen exterior, por X. Escuchamos en document
  // porque el handle se pinta en un portal fuera de `.tiptap`.
  useEffect(() => {
    if (!editor) return
    const dom = editor.view.dom as HTMLElement
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const col = dom.firstElementChild?.getBoundingClientRect()
        if (!col) return
        setInGutter(
          e.clientX < col.left - HANDLE_ZONE || e.clientX > col.right + 40
        )
      })
    }
    document.addEventListener("pointermove", onMove)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      document.removeEventListener("pointermove", onMove)
    }
  }, [editor])

  if (!editor) return null

  const handleAdd = () => {
    const { node, pos } = current
    if (pos < 0) return
    const insertPos = node ? pos + node.nodeSize : pos
    editor
      .chain()
      .focus()
      .insertContentAt(insertPos, { type: "paragraph" })
      .setTextSelection(insertPos + 1)
      .insertContent("/")
      .run()
  }

  return (
    <DragHandleReact
      editor={editor}
      onNodeChange={handleNodeChange}
      getReferencedVirtualElement={getReferencedVirtualElement}
      computePositionConfig={POSITION_CONFIG}
      className={cn(
        "z-2 transition-[top,opacity] duration-300 ease-in-out",
        // En el margen exterior lo ocultamos (salvo con el menú abierto). Durante
        // el arrastre real la extensión pone data-dragging="true" y el CSS lo
        // fuerza visible, así que este opacity-0 no le afecta.
        inGutter && !menuOpen && "pointer-events-none opacity-0"
      )}
    >
      <div className="gap-0.55 flex items-center">
        <Button
          size="icon-xs"
          variant="ghost"
          title="Insertar bloque debajo"
          onClick={handleAdd}
        >
          <IconPlus className="size-3.5" />
        </Button>
        {/* Grip: es el TRIGGER de base-ui (para que `modal` funcione) SIN separar
            el botón. Pero IGNORAMOS la apertura que base-ui pide en mousedown (así
            no rompe el drag nativo ni tapa con el backdrop del modal). El menú lo
            abrimos en el CLICK real: un drag NO dispara `click`, y además llevamos
            un guard por si el puntero se movió (= arrastre). */}
        <DropdownMenu
          open={menuOpen}
          onOpenChange={(open, details) => {
            // La apertura la maneja nuestro onClick; ignoramos la de base-ui.
            if (open) return
            const r = details?.reason
            if (r === "sibling-open" || r === "focus-out") return
            setMenuOpen(false)
          }}
          modal
        >
          <DropdownMenuTrigger
            render={
              <Button
                ref={gripRef}
                size="icon-xs"
                variant="ghost"
                title="Opciones · arrastrar para mover"
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                  pressRef.current = { x: e.clientX, y: e.clientY }
                  movedRef.current = false
                  const onMove = (ev: PointerEvent) => {
                    const d = pressRef.current
                    if (d && Math.hypot(ev.clientX - d.x, ev.clientY - d.y) > 5)
                      movedRef.current = true
                  }
                  const onUp = () => {
                    document.removeEventListener("pointermove", onMove)
                    document.removeEventListener("pointerup", onUp)
                  }
                  document.addEventListener("pointermove", onMove)
                  document.addEventListener("pointerup", onUp)
                }}
                onClick={() => {
                  if (movedRef.current) return // fue un arrastre, no abrir
                  setMenuOpen((o) => !o)
                  if (current.pos >= 0) editor.commands.setNodeSelection(current.pos)
                }}
              >
                <IconGripVertical className="size-3.5" />
              </Button>
            }
          />
          <BlockMenu
            editor={editor}
            node={current.node}
            pos={current.pos}
            onClose={() => setMenuOpen(false)}
          />
        </DropdownMenu>
        <div className="pointer-events-none w-3" />
      </div>
    </DragHandleReact>
  )
}
