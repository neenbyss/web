"use client"

import * as React from "react"
import { IconAlertTriangle } from "@tabler/icons-react"

import { formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import type { UploadMetadataUpdate } from "@/lib/validations/upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Values {
  title: string
  alt: string
  description: string
  figcaption: string
  tags: string
}

const EMPTY: Values = { title: "", alt: "", description: "", figcaption: "", tags: "" }

export interface UploadMetaDialogProps {
  uploadId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Se llama con la metadata actualizada tras guardar en la API. */
  onSaved?: (updated: UploadMetadata) => void
}

/**
 * Edita los metadatos SEO del archivo subido (persisten en su metadata.json vía
 * PATCH /api/uploads/:id). Carga los valores actuales al abrir.
 */
export function UploadMetaDialog({ uploadId, open, onOpenChange, onSaved }: UploadMetaDialogProps) {
  const [values, setValues] = React.useState<Values>(EMPTY)
  const [meta, setMeta] = React.useState<UploadMetadata | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open || !uploadId) return
    let active = true

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/uploads/${uploadId}`, { cache: "no-store" })
        const json = await res.json()
        if (!active) return
        if (json.ok) {
          const m = json.data as UploadMetadata
          setMeta(m)
          setValues({
            title: m.title,
            alt: m.alt,
            description: m.description,
            figcaption: m.figcaption,
            tags: m.tags.join(", "),
          })
        } else {
          setError(json.error ?? "No se pudo cargar la metadata.")
        }
      } catch {
        if (active) setError("Error de red al cargar la metadata.")
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [open, uploadId])

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!uploadId) return
    setSaving(true)
    setError(null)
    const body: UploadMetadataUpdate = {
      title: values.title,
      alt: values.alt,
      description: values.description,
      figcaption: values.figcaption,
      tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
    }
    try {
      const res = await fetch(`/api/uploads/${uploadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError(json.error ?? "No se pudo guardar.")
        return
      }
      onSaved?.(json.data as UploadMetadata)
      onOpenChange(false)
    } catch {
      setError("Error de red al guardar.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar imagen</DialogTitle>
          <DialogDescription>
            Los metadatos se guardan en el archivo y se reutilizan en cada inserción.
          </DialogDescription>
        </DialogHeader>

        {meta && (
          <div className="flex items-center gap-3 rounded-md border border-border bg-muted/30 p-3">
            {meta.category === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={meta.sizes?.["320"]?.webp?.url ?? meta.url}
                alt={meta.alt || meta.originalName}
                className="size-14 shrink-0 rounded object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{meta.originalName}</p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(meta.size)}
                {meta.width && meta.height ? ` · ${meta.width}×${meta.height}` : ""} · {meta.mime}
              </p>
            </div>
          </div>
        )}

        {meta?.sizes && (
          <details className="rounded-md border border-border">
            <summary className="cursor-pointer px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase select-none">
              Tamaños generados
            </summary>
            <div className="max-h-40 space-y-1 overflow-y-auto border-t border-border p-2 text-xs">
              {Object.entries(meta.sizes).map(([bp, formats]) => (
                <div key={bp} className="flex items-center justify-between gap-2">
                  <span className="text-foreground">{bp}px</span>
                  <span className="flex gap-3 text-muted-foreground">
                    {Object.entries(formats).map(([fmt, rec]) => (
                      <a key={fmt} href={rec.url} target="_blank" rel="noreferrer" className="hover:text-primary">
                        {fmt} · {formatBytes(rec.size)}
                      </a>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}

        {!uploadId ? (
          <p className="text-sm text-muted-foreground">
            Este bloque no está enlazado a un archivo de la biblioteca.
          </p>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="meta-title">Título</Label>
              <Input id="meta-title" value={values.title} onChange={set("title")} disabled={loading} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="meta-alt">Texto alternativo (alt)</Label>
              <Input id="meta-alt" value={values.alt} onChange={set("alt")} disabled={loading} placeholder="Descripción accesible para SEO" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="meta-desc">Descripción</Label>
              <Textarea id="meta-desc" value={values.description} onChange={set("description")} disabled={loading} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="meta-fig">Pie de foto</Label>
              <Input id="meta-fig" value={values.figcaption} onChange={set("figcaption")} disabled={loading} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="meta-tags">Etiquetas</Label>
              <Input id="meta-tags" value={values.tags} onChange={set("tags")} disabled={loading} placeholder="separadas, por, comas" />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <IconAlertTriangle className="size-3.5 shrink-0" />
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost" size="xs" onClick={() => onOpenChange(false)} disabled={saving}>
                Cancelar
              </Button>
              <Button type="submit" size="xs" disabled={saving || loading}>
                {saving ? "Guardando…" : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
