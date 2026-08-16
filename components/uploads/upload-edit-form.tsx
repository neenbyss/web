"use client"

import * as React from "react"

import type { UploadMetadata } from "@/lib/upload/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUploadsContext } from "./uploads-context"

export interface UploadEditFormProps {
  item: UploadMetadata
  onDone?: () => void
}

/** Formulario de metadata SEO (title, alt, description, figcaption, tags). */
export function UploadEditForm({ item, onDone }: UploadEditFormProps) {
  const { update } = useUploadsContext()
  const [saving, setSaving] = React.useState(false)
  const [values, setValues] = React.useState({
    title: item.title,
    alt: item.alt,
    description: item.description,
    figcaption: item.figcaption,
    tags: item.tags.join(", "),
  })

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const result = await update(item.id, {
      title: values.title,
      alt: values.alt,
      description: values.description,
      figcaption: values.figcaption,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    })
    setSaving(false)
    if (result) onDone?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`title-${item.id}`}>Título</Label>
        <Input id={`title-${item.id}`} value={values.title} onChange={set("title")} placeholder="Título del recurso" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`alt-${item.id}`}>Texto alternativo (alt)</Label>
        <Input id={`alt-${item.id}`} value={values.alt} onChange={set("alt")} placeholder="Descripción accesible para SEO" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`desc-${item.id}`}>Descripción</Label>
        <Textarea id={`desc-${item.id}`} value={values.description} onChange={set("description")} placeholder="Descripción larga" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`fig-${item.id}`}>Pie de foto</Label>
        <Input id={`fig-${item.id}`} value={values.figcaption} onChange={set("figcaption")} placeholder="Caption / figcaption" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`tags-${item.id}`}>Etiquetas</Label>
        <Input id={`tags-${item.id}`} value={values.tags} onChange={set("tags")} placeholder="separadas, por, comas" />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        {onDone && (
          <Button type="button" variant="ghost" size="xs" onClick={onDone} disabled={saving}>
            Cancelar
          </Button>
        )}
        <Button type="submit" size="xs" disabled={saving}>
          {saving ? "Guardando…" : "Guardar"}
        </Button>
      </div>
    </form>
  )
}
