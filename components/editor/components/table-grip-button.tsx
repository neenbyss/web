"use client"

import * as React from "react"
import type { Editor } from "@tiptap/react"
import { IconGripHorizontal, IconGripVertical } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableGripMenu } from "./table-grip-menu"

export interface TableGripButtonProps {
  editor: Editor
  kind: "col" | "row"
  index: number
  /** Posición fija de la barrita (viewport coords). */
  style: React.CSSProperties
  className: string
  open: boolean
  /** cellPos de la columna/fila; sólo se necesita mientras el menú está abierto. */
  cellPos: number | null
  /** Click en la barrita: selecciona la columna/fila y abre el menú. */
  onActivate: () => void
  onClose: () => void
  /** Muestra una advertencia modal (acción imposible). */
  onWarn: (message: string) => void
  /** Arrastre en curso (reordenar): puntero movido a estas coords de viewport. */
  onReorderMove: (clientX: number, clientY: number) => void
  /** Fin del arrastre. `moved` = hubo arrastre real (soltar en destino). */
  onReorderEnd: (moved: boolean) => void
}

/**
 * Barrita-grip de columna/fila (tipo Notion) que ES el `DropdownMenuTrigger`
 * de base-ui (con `modal`), SIN separar el botón del disparador ni usar refs de
 * anclaje. Mismo patrón que el drag-handle: ignoramos la apertura que base-ui
 * pide en mousedown y abrimos nosotros en el `onClick` (tras fijar la selección
 * de celdas), así el menú se ancla al propio botón y `modal` funciona bien.
 */
export function TableGripButton({
  editor,
  kind,
  index,
  style,
  className,
  open,
  cellPos,
  onActivate,
  onClose,
  onWarn,
  onReorderMove,
  onReorderEnd,
}: TableGripButtonProps) {
  // Detección arrastrar-vs-clic (igual patrón que el drag-handle): si el puntero
  // se mueve tras pulsar, es un REORDENADO (no abrimos el menú); si no, es clic.
  const pressRef = React.useRef<{ x: number; y: number } | null>(null)
  const movedRef = React.useRef(false)

  const onPointerDown = (e: React.PointerEvent) => {
    pressRef.current = { x: e.clientX, y: e.clientY }
    movedRef.current = false
    const move = (ev: PointerEvent) => {
      const p = pressRef.current
      if (!p) return
      if (!movedRef.current && Math.hypot(ev.clientX - p.x, ev.clientY - p.y) < 5) return
      movedRef.current = true
      onReorderMove(ev.clientX, ev.clientY)
    }
    const up = () => {
      document.removeEventListener("pointermove", move, true)
      document.removeEventListener("pointerup", up, true)
      if (movedRef.current) onReorderEnd(true)
    }
    document.addEventListener("pointermove", move, true)
    document.addEventListener("pointerup", up, true)
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next, details) => {
        // La apertura la maneja nuestro onClick; ignoramos la de base-ui.
        if (next) return
        const r = details?.reason
        if (r === "sibling-open" || r === "focus-out") return
        onClose()
      }}
      modal
    >
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            title={
              kind === "col"
                ? "Opciones de columna · arrastra para mover"
                : "Opciones de fila · arrastra para mover"
            }
            data-kind={kind}
            // Evita que el mousedown mueva la selección/foco del editor antes de
            // que fijemos la CellSelection en el click.
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={onPointerDown}
            onClick={() => {
              if (movedRef.current) return // fue arrastre (reordenar), no menú
              onActivate()
            }}
            className={cn("editor-table-grip", className)}
            style={style}
          >
            {/* Por defecto: una LÍNEA con borde (aspecto "cortado"). Al hover / con
                el menú abierto se transforma en una PASTILLA con grip de arrastre
                (y en primario cuando está abierta). */}
            <span className="editor-table-grip-line" aria-hidden />
            <span className="editor-table-grip-dots" aria-hidden>
              {kind === "col" ? <IconGripHorizontal /> : <IconGripVertical />}
            </span>
          </button>
        }
      />
      {open && cellPos != null && (
        <TableGripMenu
          editor={editor}
          kind={kind}
          index={index}
          cellPos={cellPos}
          onClose={onClose}
          onWarn={onWarn}
        />
      )}
    </DropdownMenu>
  )
}
