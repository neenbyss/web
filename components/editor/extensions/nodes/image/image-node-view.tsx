"use client"

import * as React from "react"
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react"
import {
  IconPhotoPlus,
  IconPencil,
  IconReplace,
  IconTrash,
  IconX,
  IconCheck,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MediaPicker } from "../../../components/media-picker"
import { UploadMetaDialog } from "../../../components/upload-meta-dialog"
import { displaySrc, buildSrcset } from "../../../utils/upload"
import type { ImageAlign, ImageFit, ImageRatio, ImageObjectPosition } from "./image-block"

/** Presets de tamaño (reemplazan al slider). "Full" ocupa todo el ancho. */
const SIZE_PRESETS: { label: string; title: string; width?: number; full?: boolean }[] = [
  { label: "S", title: "Pequeña (30%)", width: 30 },
  { label: "M", title: "Mediana (50%)", width: 50 },
  { label: "L", title: "Grande (75%)", width: 75 },
  { label: "Full", title: "Ancho completo", full: true },
]

interface ImageAttrs {
  uploadId: string | null
  src: string | null
  srcset: string | null
  alt: string | null
  title: string | null
  figcaption: string
  width: number
  align: ImageAlign
  fit: ImageFit
  ratio: ImageRatio
  fullWidth: boolean
  objectPosition: ImageObjectPosition
  name: string | null
  size: number | null
}

export function ImageNodeView({ node, updateAttributes, deleteNode, selected, editor }: NodeViewProps) {
  const a = node.attrs as ImageAttrs
  const editable = editor.isEditable
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [metaOpen, setMetaOpen] = React.useState(false)
  const [editing, setEditing] = React.useState(false)

  const applyItem = (item: UploadMetadata) =>
    updateAttributes({
      uploadId: item.id,
      src: displaySrc(item),
      srcset: buildSrcset(item),
      alt: item.alt || item.originalName,
      title: item.title || null,
      figcaption: item.figcaption || a.figcaption,
      name: item.originalName,
      size: item.size,
    })

  const onMetaSaved = (m: UploadMetadata) =>
    updateAttributes({ alt: m.alt || null, title: m.title || null, figcaption: m.figcaption || "" })

  const picker = (
    <MediaPicker
      open={pickerOpen}
      onOpenChange={setPickerOpen}
      category="image"
      title={a.src ? "Reemplazar imagen" : undefined}
      onSelect={applyItem}
    />
  )

  // ── Redimensionado por asas (ancho libre tipo Word) ──
  const startResize = (e: React.PointerEvent, side: "left" | "right") => {
    e.preventDefault()
    e.stopPropagation()
    const containerW = editor.view.dom.clientWidth || 1
    const startX = e.clientX
    const startPct = a.fullWidth ? 100 : a.width
    const dir = side === "right" ? 1 : -1
    const factor = a.align === "center" ? 2 : 1
    const onMove = (ev: PointerEvent) => {
      const dxPct = ((ev.clientX - startX) / containerW) * 100 * dir * factor
      const pct = Math.max(10, Math.min(100, Math.round(startPct + dxPct)))
      updateAttributes({ width: pct, fullWidth: false })
    }
    const onUp = () => {
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerup", onUp)
    }
    document.addEventListener("pointermove", onMove)
    document.addEventListener("pointerup", onUp)
  }

  // ── Estado vacío ──
  if (!a.src) {
    return (
      <NodeViewWrapper as="figure" data-type="image-block" className="my-4">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="flex w-full items-center gap-3 rounded-md border border-dashed border-input bg-muted/30 p-3 text-left transition-colors hover:border-primary/60 hover:bg-accent/40"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <IconPhotoPlus className="size-5" />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Elegir imagen</span>
            <span className="text-xs text-muted-foreground">Sube una nueva o elige de tu biblioteca</span>
          </span>
        </button>
        {picker}
      </NodeViewWrapper>
    )
  }

  // ── Estado card (por defecto) ──
  if (!editing) {
    const name = a.name || a.src.split("/").pop() || "imagen"
    return (
      <NodeViewWrapper as="figure" data-type="image-block" className="my-4">
        <div
          className={cn(
            "flex items-center gap-3 rounded-md border border-border bg-card p-2.5",
            selected && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.src} alt={a.alt ?? ""} className="size-14 shrink-0 rounded object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{a.size ? formatBytes(a.size) : "imagen"}</p>
          </div>
          {editable && (
            <div className="flex shrink-0 items-center gap-1">
              <Button size="xs" variant="outline" onClick={() => setEditing(true)}>
                <IconPencil />
                Editar
              </Button>
              <Button
                size="xs"
                variant="ghost"
                className="text-destructive"
                onClick={() => deleteNode()}
              >
                <IconTrash />
                Eliminar
              </Button>
            </div>
          )}
        </div>
        {picker}
      </NodeViewWrapper>
    )
  }

  // ── Estado editar (imagen completa + herramientas) ──
  const marginX = a.align === "left" ? "0 auto 0 0" : a.align === "right" ? "0 0 0 auto" : "0 auto"

  return (
    <NodeViewWrapper
      as="figure"
      data-type="image-block"
      className="my-4 flex flex-col gap-2"
      style={{ width: `${a.fullWidth ? 100 : a.width}%`, margin: marginX }}
    >
      <div className="group/img relative">
        {/* Imagen recortada (overflow-hidden) — separada del toolbar para que
            el bubble NO se corte cuando la imagen es pequeña. */}
        <div className="relative overflow-hidden rounded-md ring-2 ring-primary/50 ring-offset-2 ring-offset-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.src}
          srcSet={a.srcset ?? undefined}
          sizes={a.srcset ? `${a.fullWidth ? 100 : a.width}vw` : undefined}
          alt={a.alt ?? ""}
          title={a.title ?? undefined}
          draggable={false}
          style={{
            width: "100%",
            objectFit: a.fit,
            objectPosition: a.objectPosition,
            ...(a.ratio !== "auto" ? { aspectRatio: a.ratio, height: "100%" } : { height: "auto" }),
          }}
        />

        {/* Asas de resize: todo el borde izquierdo/derecho es arrastrable */}
        {editable && (
          <>
            <span
              onPointerDown={(e) => startResize(e, "left")}
              className="absolute inset-y-0 left-0 z-10 flex w-3 cursor-ew-resize items-center justify-center"
            >
              <span className="h-12 max-h-[60%] w-1.5 rounded-full bg-primary/70 opacity-0 ring-1 ring-background transition-opacity group-hover/img:opacity-100" />
            </span>
            <span
              onPointerDown={(e) => startResize(e, "right")}
              className="absolute inset-y-0 right-0 z-10 flex w-3 cursor-ew-resize items-center justify-center"
            >
              <span className="h-12 max-h-[60%] w-1.5 rounded-full bg-primary/70 opacity-0 ring-1 ring-background transition-opacity group-hover/img:opacity-100" />
            </span>
          </>
        )}
        </div>

        {/* Barra de herramientas flotante (bubble) — FUERA del overflow-hidden
            para que no se recorte; flota sobre la parte superior de la imagen. */}
        {editable && (
          <div className="absolute top-2 left-1/2 z-20 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-xl border border-border bg-popover/95 p-1.5 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/img:opacity-100 data-open:opacity-100">
            {/* Alineación */}
            <Button
              size="icon-sm"
              variant={a.align === "left" ? "secondary" : "ghost"}
              title="Alinear a la izquierda"
              onClick={() => updateAttributes({ align: "left" })}
            >
              <IconAlignLeft />
            </Button>
            <Button
              size="icon-sm"
              variant={a.align === "center" ? "secondary" : "ghost"}
              title="Centrar"
              onClick={() => updateAttributes({ align: "center" })}
            >
              <IconAlignCenter />
            </Button>
            <Button
              size="icon-sm"
              variant={a.align === "right" ? "secondary" : "ghost"}
              title="Alinear a la derecha"
              onClick={() => updateAttributes({ align: "right" })}
            >
              <IconAlignRight />
            </Button>

            <span className="mx-1 h-5 w-px bg-border" />

            {/* Tamaño (presets, sin slider) */}
            {SIZE_PRESETS.map((p) => {
              const isActive = p.full
                ? a.fullWidth
                : !a.fullWidth && a.width === p.width
              return (
                <Button
                  key={p.label}
                  size="sm"
                  variant={isActive ? "secondary" : "ghost"}
                  className="min-w-9 px-2 font-medium"
                  title={p.title}
                  onClick={() =>
                    p.full
                      ? updateAttributes({ fullWidth: true })
                      : updateAttributes({ width: p.width, fullWidth: false })
                  }
                >
                  {p.label}
                </Button>
              )
            })}

            <span className="mx-1 h-5 w-px bg-border" />

            {/* Ajuste fino (object-fit / position / ratio) */}
            <Popover>
              <PopoverTrigger
                render={
                  <Button size="icon-sm" variant="ghost" title="Ajuste y recorte" />
                }
              >
                <IconAdjustmentsHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-72 space-y-3 p-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Ajuste (object-fit)</Label>
                  <NativeSelect
                    size="sm"
                    value={a.fit}
                    onChange={(e) => updateAttributes({ fit: e.target.value as ImageFit })}
                  >
                    <NativeSelectOption value="contain">Contener</NativeSelectOption>
                    <NativeSelectOption value="cover">Cubrir</NativeSelectOption>
                    <NativeSelectOption value="fill">Rellenar</NativeSelectOption>
                  </NativeSelect>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Posición (object-position)</Label>
                  <NativeSelect
                    size="sm"
                    value={a.objectPosition}
                    onChange={(e) =>
                      updateAttributes({ objectPosition: e.target.value as ImageObjectPosition })
                    }
                  >
                    <NativeSelectOption value="center">Centro</NativeSelectOption>
                    <NativeSelectOption value="top">Arriba</NativeSelectOption>
                    <NativeSelectOption value="bottom">Abajo</NativeSelectOption>
                    <NativeSelectOption value="left">Izquierda</NativeSelectOption>
                    <NativeSelectOption value="right">Derecha</NativeSelectOption>
                    <NativeSelectOption value="top left">Arriba izq.</NativeSelectOption>
                    <NativeSelectOption value="top right">Arriba der.</NativeSelectOption>
                    <NativeSelectOption value="bottom left">Abajo izq.</NativeSelectOption>
                    <NativeSelectOption value="bottom right">Abajo der.</NativeSelectOption>
                  </NativeSelect>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Relación de aspecto</Label>
                  <NativeSelect
                    size="sm"
                    value={a.ratio}
                    onChange={(e) => updateAttributes({ ratio: e.target.value as ImageRatio })}
                  >
                    <NativeSelectOption value="auto">Automática</NativeSelectOption>
                    <NativeSelectOption value="16/9">16:9</NativeSelectOption>
                    <NativeSelectOption value="4/3">4:3</NativeSelectOption>
                    <NativeSelectOption value="1/1">1:1</NativeSelectOption>
                    <NativeSelectOption value="3/4">3:4</NativeSelectOption>
                  </NativeSelect>
                </div>
              </PopoverContent>
            </Popover>

            <Button size="icon-sm" variant="ghost" title="Metadatos y alt" onClick={() => setMetaOpen(true)}>
              <IconPencil />
            </Button>
            <Button size="icon-sm" variant="ghost" title="Reemplazar imagen" onClick={() => setPickerOpen(true)}>
              <IconReplace />
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              title="Quitar imagen"
              className="text-destructive"
              onClick={() => deleteNode()}
            >
              <IconX />
            </Button>

            <span className="mx-1 h-5 w-px bg-border" />

            <Button size="sm" variant="secondary" title="Listo" onClick={() => setEditing(false)}>
              <IconCheck />
              Listo
            </Button>
          </div>
        )}
      </div>

      <figcaption>
        <input
          value={a.figcaption}
          disabled={!editable}
          onChange={(e) => updateAttributes({ figcaption: e.target.value })}
          onKeyDown={(e) => e.stopPropagation()}
          placeholder="Añade un pie de foto (opcional)…"
          className="w-full bg-transparent text-center text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </figcaption>

      {picker}
      <UploadMetaDialog uploadId={a.uploadId} open={metaOpen} onOpenChange={setMetaOpen} onSaved={onMetaSaved} />
    </NodeViewWrapper>
  )
}
