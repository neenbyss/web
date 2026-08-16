"use client"

import * as React from "react"
import { useTiptap } from "@tiptap/react"
import type { Node as PMNode } from "@tiptap/pm/model"
import { CellSelection } from "@tiptap/pm/tables"
import { IconPlus } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { TableGripButton } from "./table-grip-button"
import { TableToolsButton } from "./table-tools-button"
import { TableWarningDialog } from "./table-warning-dialog"

type Rect = { left: number; top: number; width: number; height: number }
type Geo = {
  table: Rect
  // Caja VISIBLE del `.tableWrapper` (con overflow-x). `client*` excluyen la
  // barra de scroll; `height` (bounding) la incluye → así colocamos los "+"
  // por DEBAJO/DERECHA del scroll y no encima.
  wrap: Rect & { clientWidth: number; clientHeight: number }
  cols: { left: number; width: number }[]
  rows: { top: number; height: number }[]
}

/**
 * Marca en <body> que la selección de celdas proviene de un grip (no de un
 * arrastre). El bubble de tabla lo consulta para no aparecer en ese caso.
 */
function setGripSelFlag(active: boolean) {
  if (typeof document === "undefined") return
  if (active) document.body.dataset.tableGripSel = "1"
  else delete document.body.dataset.tableGripSel
}

/**
 * Controles de tabla tipo Notion. Los grips (columna arriba / fila a la
 * izquierda) NO aparecen todos a la vez: solo el de la columna/fila que está
 * bajo el ratón. El "+" para añadir columna aparece al pasar por la última
 * columna, y el de fila por la última fila. Al pulsar un grip se selecciona la
 * columna/fila y se abre el menú contextual.
 */
export function TableControls() {
  const { editor } = useTiptap()
  const [geo, setGeo] = React.useState<Geo | null>(null)
  const [hover, setHover] = React.useState<{ col: number | null; row: number | null }>({
    col: null,
    row: null,
  })
  const [menu, setMenu] = React.useState<{
    kind: "col" | "row"
    index: number
    cellPos: number
  } | null>(null)
  // Borde único de la selección de celdas + botón de herramientas.
  const [selRect, setSelRect] = React.useState<Rect | null>(null)
  const [tools, setTools] = React.useState<{ mode: "cells" | "cell"; x: number; y: number } | null>(
    null,
  )
  const [toolsOpen, setToolsOpen] = React.useState(false)
  // Advertencia modal (p.ej. encabezado con celdas combinadas cruzando).
  const [warning, setWarning] = React.useState<string | null>(null)
  // Simulación tipo Notion: al seleccionar por grip una columna/fila con celdas
  // combinadas cruzando, en vez de resaltar toda el área (que se derrama a la
  // vecina) pintamos SOLO la franja de esa columna/fila → `selRect` con relleno.
  const [simFill, setSimFill] = React.useState(false)
  // Reordenado (arrastrar grip): línea de destino + resalte de la columna/fila
  // ORIGEN (seleccionada) + "fantasma" que se DESLIZA con el puntero (según eje).
  const [dropLine, setDropLine] = React.useState<Rect | null>(null)
  const [dragSource, setDragSource] = React.useState<Rect | null>(null)
  const [dragGhost, setDragGhost] = React.useState<Rect | null>(null)
  const reorderRef = React.useRef<{ kind: "col" | "row"; from: number; target: number } | null>(
    null,
  )
  const tableRef = React.useRef<HTMLElement | null>(null)
  const menuRef = React.useRef(false)
  // Geometría de la tabla accesible desde callbacks (para pintar la franja de la
  // simulación) y la columna/fila "intencionada" por el grip.
  const geoRef = React.useRef<Geo | null>(null)
  const simRef = React.useRef<{ kind: "col" | "row"; index: number } | null>(null)
  React.useEffect(() => {
    menuRef.current = !!menu
  }, [menu])

  React.useEffect(() => {
    if (!editor) return

    const measure = (table: HTMLElement): Geo => {
      const tr = table.getBoundingClientRect()
      const wrapEl = (table.closest(".tableWrapper") as HTMLElement) ?? table.parentElement
      const wrapBox = (wrapEl ?? table).getBoundingClientRect()
      const firstRow = table.querySelector("tr")
      const cols = firstRow
        ? Array.from(firstRow.children).map((c) => {
            const r = c.getBoundingClientRect()
            return { left: r.left, width: r.width }
          })
        : []
      const rows = Array.from(table.querySelectorAll("tr")).map((r) => {
        const b = r.getBoundingClientRect()
        return { top: b.top, height: b.height }
      })
      return {
        table: { left: tr.left, top: tr.top, width: tr.width, height: tr.height },
        wrap: {
          left: wrapBox.left,
          top: wrapBox.top,
          width: wrapBox.width,
          height: wrapBox.height,
          clientWidth: (wrapEl ?? table).clientWidth,
          clientHeight: (wrapEl ?? table).clientHeight,
        },
        cols,
        rows,
      }
    }

    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (menuRef.current || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const target = (e.target as HTMLElement).closest?.("table") as HTMLElement | null
        if (target && editor.view.dom.contains(target)) {
          tableRef.current = target
          const g = measure(target)
          geoRef.current = g
          setGeo(g)
          const col = g.cols.findIndex((c) => e.clientX >= c.left && e.clientX <= c.left + c.width)
          const row = g.rows.findIndex((r) => e.clientY >= r.top && e.clientY <= r.top + r.height)
          setHover({ col: col >= 0 ? col : null, row: row >= 0 ? row : null })
        } else {
          const t = tableRef.current
          if (!t) return
          const r = t.getBoundingClientRect()
          const m = 26
          if (
            e.clientX < r.left - m ||
            e.clientX > r.right + m ||
            e.clientY < r.top - m ||
            e.clientY > r.bottom + m
          ) {
            tableRef.current = null
            geoRef.current = null
            setGeo(null)
            setHover({ col: null, row: null })
          }
        }
      })
    }
    const reflow = () => {
      const t = tableRef.current
      if (t?.isConnected) {
        const g = measure(t)
        geoRef.current = g
        setGeo(g)
      } else {
        tableRef.current = null
        geoRef.current = null
        setGeo(null)
      }
      computeSel()
    }

    // Activa/desactiva el modo simulación: oculta el relleno por-celda (que se
    // derramaría a la columna/fila vecina en celdas combinadas) vía el flag en
    // <body> (ver editor.css) y hace que `selRect` se pinte relleno.
    const setSim = (on: boolean) => {
      setSimFill(on)
      if (typeof document !== "undefined") {
        if (on) document.body.dataset.tableSim = "1"
        else delete document.body.dataset.tableSim
      }
    }

    // Borde único de la selección + posición del botón de herramientas.
    const computeSel = () => {
      const dom = editor.view.dom
      const sel = editor.state.selection
      const sim = simRef.current
      const g = geoRef.current

      // SIMULACIÓN (tipo Notion): columna/fila seleccionada por grip. Pintamos SOLO
      // la franja de esa columna/fila (aunque una celda combinada cruce a la
      // vecina, no la resaltamos). Requiere geometría (`geoRef`).
      if (
        sel instanceof CellSelection &&
        sim &&
        g &&
        ((sim.kind === "col" && sel.isColSelection() && g.cols[sim.index]) ||
          (sim.kind === "row" && sel.isRowSelection() && g.rows[sim.index]))
      ) {
        if (sim.kind === "col") {
          const c = g.cols[sim.index]
          setSelRect({ left: c.left, top: g.table.top, width: c.width, height: g.table.height })
        } else {
          const rw = g.rows[sim.index]
          setSelRect({ left: g.table.left, top: rw.top, width: g.table.width, height: rw.height })
        }
        setSim(true)
        setTools(null) // col/fila completa: sus herramientas están en el grip
        return
      }

      // Sin simulación: selección normal de celdas → borde único alrededor del
      // rango (union de `.selectedCell`).
      simRef.current = null
      setSim(false)
      const cells = Array.from(dom.querySelectorAll(".selectedCell")) as HTMLElement[]
      if (cells.length >= 1) {
        let l = Infinity,
          t = Infinity,
          r = -Infinity,
          b = -Infinity
        for (const c of cells) {
          const box = c.getBoundingClientRect()
          l = Math.min(l, box.left)
          t = Math.min(t, box.top)
          r = Math.max(r, box.right)
          b = Math.max(b, box.bottom)
        }
        setSelRect({ left: l, top: t, width: r - l, height: b - t })
        // Si es una COLUMNA o FILA completa, NO mostramos el botón "⋮": esas
        // herramientas ya están en el menú del grip (seleccionar columna/fila).
        const isFullColOrRow =
          sel instanceof CellSelection && (sel.isColSelection() || sel.isRowSelection())
        if (isFullColOrRow) setTools(null)
        // Herramientas a la DERECHA de la selección (siempre).
        else setTools({ mode: "cells", x: r, y: t + (b - t) / 2 })
        return
      }
      // Celda única (cursor dentro): borde de selección alrededor de esa celda +
      // botón "⋮" a su derecha.
      const active = dom.querySelector(".active-cell") as HTMLElement | null
      if (active && editor.isActive("table")) {
        const r2 = active.getBoundingClientRect()
        setSelRect({ left: r2.left, top: r2.top, width: r2.width, height: r2.height })
        setTools({ mode: "cell", x: r2.right, y: r2.top + r2.height / 2 })
      } else {
        setSelRect(null)
        setTools(null)
      }
    }

    const clearGripSel = () => {
      setGripSelFlag(false)
      simRef.current = null
      computeSel()
    }

    document.addEventListener("mousemove", onMove)
    editor.view.dom.addEventListener("pointerdown", clearGripSel)
    window.addEventListener("scroll", reflow, true)
    window.addEventListener("resize", reflow)
    editor.on("update", reflow)
    editor.on("selectionUpdate", computeSel)
    computeSel()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMove)
      editor.view.dom.removeEventListener("pointerdown", clearGripSel)
      window.removeEventListener("scroll", reflow, true)
      window.removeEventListener("resize", reflow)
      editor.off("update", reflow)
      editor.off("selectionUpdate", computeSel)
      setGripSelFlag(false)
      if (typeof document !== "undefined") delete document.body.dataset.tableSim
    }
  }, [editor])

  if (!editor) return null

  const cellPosBefore = (cellDom: Element | null): number | null => {
    if (!cellDom) return null
    try {
      const pos = editor.view.posAtDOM(cellDom, 0)
      const $pos = editor.state.doc.resolve(pos)
      for (let d = $pos.depth; d > 0; d--) {
        const role = $pos.node(d).type.spec.tableRole
        if (role === "cell" || role === "header_cell") return $pos.before(d)
      }
    } catch {
      /* noop */
    }
    return null
  }
  const cellAt = (selector: string) =>
    (tableRef.current?.querySelector(selector) as HTMLElement | null) ?? null

  // Click en la barrita-grip: fija la CellSelection de la columna/fila y abre el
  // menú (el propio botón es el trigger; base-ui ancla el menú a él).
  const openGrip = (kind: "col" | "row", index: number) => {
    const cell =
      kind === "col"
        ? cellAt(`tr:first-child > *:nth-child(${index + 1})`)
        : cellAt(`tr:nth-child(${index + 1}) > *:first-child`)
    const cellPos = cellPosBefore(cell)
    if (cellPos == null) return
    // Marca "modo grip" ANTES de dispatchar, para que el bubble no aparezca.
    setGripSelFlag(true)
    const $cell = editor.state.doc.resolve(cellPos)
    const sel =
      kind === "col" ? CellSelection.colSelection($cell) : CellSelection.rowSelection($cell)
    // Marca la columna/fila "intencionada" para la simulación (resaltar solo esta,
    // no la vecina aunque haya celdas combinadas cruzando).
    simRef.current = { kind, index }
    editor.view.dispatch(editor.state.tr.setSelection(sel))
    setMenu({ kind, index, cellPos })
  }

  // ── Reordenado de columnas/filas arrastrando el grip (tipo Notion) ──
  const getTable = (): { node: PMNode; pos: number } | null => {
    const dom = tableRef.current
    if (!dom) return null
    try {
      const $pos = editor.state.doc.resolve(editor.view.posAtDOM(dom, 0))
      for (let d = $pos.depth; d >= 0; d--) {
        if ($pos.node(d).type.spec.tableRole === "table")
          return { node: $pos.node(d), pos: $pos.before(d) }
      }
    } catch {
      /* noop */
    }
    return null
  }

  // Mientras se arrastra el grip: calcula el destino (índice de inserción) según
  // la posición del puntero y dibuja la línea indicadora en ese borde.
  const onReorderMove = (kind: "col" | "row", from: number, x: number, y: number) => {
    const g = geoRef.current
    if (!g) return
    if (kind === "col") {
      const src = g.cols[from]
      if (!src) return
      // Origen resaltado (columna "seleccionada") + fantasma que sigue el puntero
      // en HORIZONTAL (se desliza de izq a der).
      setDragSource({ left: src.left, top: g.table.top, width: src.width, height: g.table.height })
      setDragGhost({ left: x - src.width / 2, top: g.table.top, width: src.width, height: g.table.height })
      let target = g.cols.length
      for (let i = 0; i < g.cols.length; i++)
        if (x < g.cols[i].left + g.cols[i].width / 2) {
          target = i
          break
        }
      reorderRef.current = { kind, from, target }
      const last = g.cols[g.cols.length - 1]
      const bx = target < g.cols.length ? g.cols[target].left : last.left + last.width
      setDropLine({ left: bx - 1, top: g.table.top, width: 2, height: g.table.height })
    } else {
      const src = g.rows[from]
      if (!src) return
      // Origen resaltado (fila) + fantasma que sigue el puntero en VERTICAL.
      setDragSource({ left: g.table.left, top: src.top, width: g.table.width, height: src.height })
      setDragGhost({ left: g.table.left, top: y - src.height / 2, width: g.table.width, height: src.height })
      let target = g.rows.length
      for (let i = 0; i < g.rows.length; i++)
        if (y < g.rows[i].top + g.rows[i].height / 2) {
          target = i
          break
        }
      reorderRef.current = { kind, from, target }
      const last = g.rows[g.rows.length - 1]
      const by = target < g.rows.length ? g.rows[target].top : last.top + last.height
      setDropLine({ left: g.table.left, top: by - 1, width: g.table.width, height: 2 })
    }
  }

  const onReorderEnd = () => {
    const r = reorderRef.current
    reorderRef.current = null
    setDropLine(null)
    setDragSource(null)
    setDragGhost(null)
    if (!r) return
    const to = r.target > r.from ? r.target - 1 : r.target
    if (to === r.from) return

    const info = getTable()
    if (!info) return
    const { node: table, pos: tablePos } = info

    // Con celdas combinadas el reordenado rectangular no es válido → avisamos.
    let hasMerge = false
    table.descendants((n) => {
      if ((n.attrs.colspan ?? 1) > 1 || (n.attrs.rowspan ?? 1) > 1) hasMerge = true
      return !hasMerge
    })
    if (hasMerge) {
      setWarning(
        r.kind === "col"
          ? "No se pueden reordenar columnas con celdas combinadas. Sepáralas primero."
          : "No se pueden reordenar filas con celdas combinadas. Sepáralas primero.",
      )
      return
    }

    const rows: PMNode[] = []
    if (r.kind === "col") {
      table.forEach((row) => {
        const cells: PMNode[] = []
        row.forEach((c) => cells.push(c))
        const [moved] = cells.splice(r.from, 1)
        cells.splice(to, 0, moved)
        rows.push(row.type.create(row.attrs, cells))
      })
    } else {
      table.forEach((row) => rows.push(row))
      const [moved] = rows.splice(r.from, 1)
      rows.splice(to, 0, moved)
    }
    const newTable = table.type.create(table.attrs, rows)
    const tr = editor.state.tr.replaceWith(tablePos, tablePos + table.nodeSize, newTable)
    editor.view.dispatch(tr)
    editor.commands.focus()
  }

  const addColumn = () => {
    const p = cellPosBefore(cellAt("tr:first-child > *:last-child"))
    if (p == null) return
    editor.chain().focus().setTextSelection(p + 1).addColumnAfter().run()
  }
  const addRow = () => {
    const p = cellPosBefore(cellAt("tr:last-child > *:last-child"))
    if (p == null) return
    editor.chain().focus().setTextSelection(p + 1).addRowAfter().run()
  }

  const lastCol = geo ? geo.cols.length - 1 : -1
  const lastRow = geo ? geo.rows.length - 1 : -1

  // Extremos VISIBLES de la tabla dentro del área con scroll del wrapper: los
  // botones "+" se alinean con la tabla (no con el ancho completo del wrapper).
  const visLeft = geo ? Math.max(geo.table.left, geo.wrap.left) : 0
  const visRight = geo
    ? Math.min(geo.table.left + geo.table.width, geo.wrap.left + geo.wrap.clientWidth)
    : 0

  // Al hacer hover en una CELDA aparece SOLO la barrita de su columna (arriba)
  // y la de su fila (izquierda). También la del menú abierto.
  const showCol = new Set<number>()
  if (hover.col != null) showCol.add(hover.col)
  if (menu?.kind === "col") showCol.add(menu.index)
  const showRow = new Set<number>()
  if (hover.row != null) showRow.add(hover.row)
  if (menu?.kind === "row") showRow.add(menu.index)

  const gripCls = "editor-table-grip"
  const addCls =
    "fixed z-30 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"

  const closeMenu = () => setMenu(null)

  return (
    <>
      {geo && (
        <>
          {[...showCol].map(
            (i) =>
              geo.cols[i] && (
                <TableGripButton
                  key={`c${i}`}
                  editor={editor}
                  kind="col"
                  index={i}
                  open={menu?.kind === "col" && menu.index === i}
                  cellPos={menu?.kind === "col" && menu.index === i ? menu.cellPos : null}
                  onActivate={() => openGrip("col", i)}
                  onClose={closeMenu}
                  onWarn={setWarning}
                  onReorderMove={(x, y) => onReorderMove("col", i, x, y)}
                  onReorderEnd={onReorderEnd}
                  className={gripCls}
                  style={{
                    // Centrado en la columna (horizontal) y sobre el borde superior
                    // de la tabla (vertical).
                    left: geo.cols[i].left + geo.cols[i].width / 2 - 17,
                    // -6 (no -7): el borde visible cae ~1px bajo `table.top` por el
                    // border-collapse, así queda centrado en la rayita.
                    top: geo.table.top - 6,
                    width: 34,
                    height: 14,
                  }}
                />
              ),
          )}
          {[...showRow].map(
            (i) =>
              geo.rows[i] && (
                <TableGripButton
                  key={`r${i}`}
                  editor={editor}
                  kind="row"
                  index={i}
                  open={menu?.kind === "row" && menu.index === i}
                  cellPos={menu?.kind === "row" && menu.index === i ? menu.cellPos : null}
                  onActivate={() => openGrip("row", i)}
                  onClose={closeMenu}
                  onWarn={setWarning}
                  onReorderMove={(x, y) => onReorderMove("row", i, x, y)}
                  onReorderEnd={onReorderEnd}
                  className={gripCls}
                  style={{
                    // Centrado en la fila (vertical) y sobre el borde izquierdo.
                    left: geo.table.left - 7,
                    top: geo.rows[i].top + geo.rows[i].height / 2 - 17,
                    width: 14,
                    height: 34,
                  }}
                />
              ),
          )}

          {/* "+" columna: al borde DERECHO visible de la tabla, pero SIEMPRE dentro
              del área visible (si la tabla llega al borde, se ancla justo dentro). */}
          {hover.col === lastCol && lastCol >= 0 && (
            <button
              type="button"
              title="Añadir columna"
              onMouseDown={(e) => e.preventDefault()}
              onClick={addColumn}
              className={addCls}
              style={{
                left: Math.min(visRight + 4, geo.wrap.left + geo.wrap.clientWidth - 21),
                top: geo.table.top,
                width: 15,
                height: geo.table.height,
              }}
            >
              <IconPlus className="size-3" />
            </button>
          )}
          {/* "+" fila: JUSTO debajo de la tabla (en el hueco del padding-bottom
              del wrapper), ENCIMA de la barra de scroll → orden tabla → botón →
              scroll (como Notion). Ancho = tabla visible. */}
          {hover.row === lastRow && lastRow >= 0 && (
            <button
              type="button"
              title="Añadir fila"
              onMouseDown={(e) => e.preventDefault()}
              onClick={addRow}
              className={addCls}
              style={{
                left: visLeft,
                top: geo.table.top + geo.table.height + 5,
                width: Math.max(0, visRight - visLeft),
                height: 13,
              }}
            >
              <IconPlus className="size-3" />
            </button>
          )}
        </>
      )}

      {/* Borde único alrededor de la selección de celdas */}
      {selRect && (
        <div
          className={cn("editor-table-selection", simFill && "is-fill")}
          style={{
            left: selRect.left,
            top: selRect.top,
            width: selRect.width,
            height: selRect.height,
          }}
        />
      )}

      {/* Botón de herramientas: SIEMPRE a la derecha (de la selección o la celda). */}
      {tools && (
        <TableToolsButton
          editor={editor}
          mode={tools.mode}
          open={toolsOpen}
          onActivate={() => setToolsOpen(true)}
          onClose={() => setToolsOpen(false)}
          className="editor-table-grip--tools"
          style={{
            // Centrado sobre la rayita del borde derecho de la celda/selección.
            left: tools.x - 7,
            top: tools.y - 17,
            width: 14,
            height: 34,
          }}
        />
      )}

      {/* Reordenado: origen resaltado (columna/fila "seleccionada"). */}
      {dragSource && (
        <div
          className="editor-table-drag-source"
          style={{
            left: dragSource.left,
            top: dragSource.top,
            width: dragSource.width,
            height: dragSource.height,
          }}
        />
      )}
      {/* Reordenado: fantasma que se desliza con el puntero (según eje). */}
      {dragGhost && (
        <div
          className="editor-table-drag-ghost"
          style={{
            left: dragGhost.left,
            top: dragGhost.top,
            width: dragGhost.width,
            height: dragGhost.height,
          }}
        />
      )}
      {/* Línea indicadora de destino al reordenar columnas/filas. */}
      {dropLine && (
        <div
          className="editor-table-drop"
          style={{
            left: dropLine.left,
            top: dropLine.top,
            width: dropLine.width,
            height: dropLine.height,
          }}
        />
      )}

      <TableWarningDialog message={warning} onClose={() => setWarning(null)} />
    </>
  )
}
