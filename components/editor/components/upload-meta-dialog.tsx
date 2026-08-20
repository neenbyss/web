"use client"

import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IconAlertTriangle } from "@tabler/icons-react"

import { formatBytes } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { useTRPC } from "@/trpc/client"
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

function toValues(meta: UploadMetadata): Values {
  return {
    title: meta.title,
    alt: meta.alt,
    description: meta.description,
    figcaption: meta.figcaption,
    tags: meta.tags.join(", "),
  }
}

export interface UploadMetaDialogProps {
  uploadId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Se llama con la metadata actualizada tras guardar. */
  onSaved?: (updated: UploadMetadata) => void
}

/**
 * Edita los metadatos SEO del archivo subido (`upload.byId` / `upload.update`).
 * Persisten en su `metadata.json` y se reutilizan en cada inserción.
 */
export function UploadMetaDialog({ uploadId, open, onOpenChange, onSaved }: UploadMetaDialogProps) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const metaQuery = useQuery(
    trpc.upload.byId.queryOptions(
      { id: uploadId ?? "" },
      { enabled: open && Boolean(uploadId) }
    )
  )
  const meta = metaQuery.data ?? null
  const loading = metaQuery.isFetching

  // Rellena el formulario cuando llega (o cambia) la metadata del archivo.
  // Ajuste en render en vez de efecto: sin renders en cascada.
  const [values, setValues] = React.useState<Values>(EMPTY)
  const stamp = meta ? `${meta.id}:${meta.updatedAt}` : null
  const [syncedFrom, setSyncedFrom] = React.useState<string | null>(stamp)
  if (stamp !== syncedFrom) {
    setSyncedFrom(stamp)
    setValues(meta ? toValues(meta) : EMPTY)
  }

  const save = useMutation(
    trpc.upload.update.mutationOptions({
      onSuccess: (updated) => {
        // Refresca cualquier lista de la biblioteca que esté montada.
        void queryClient.invalidateQueries({ queryKey: trpc.upload.pathKey() })
        onSaved?.(updated)
        onOpenChange(false)
      },
    })
  )

  const error = save.error?.message ?? metaQuery.error?.message ?? null

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!uploadId) return
    save.mutate({
      id: uploadId,
      data: {
        title: values.title,
        alt: values.alt,
        description: values.description,
        figcaption: values.figcaption,
        tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
      },
    })
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
              <Button type="button" variant="ghost" size="xs" onClick={() => onOpenChange(false)} disabled={save.isPending}>
                Cancelar
              </Button>
              <Button type="submit" size="xs" disabled={save.isPending || loading}>
                {save.isPending ? "Guardando…" : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
