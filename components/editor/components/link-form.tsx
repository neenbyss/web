"use client"

import * as React from "react"
import { IconExternalLink, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useEditor } from "../core/useEditor"

/**
 * Formulario de enlace: URL + texto visible + "abrir en nueva pestaña".
 * Sirve para crear (toolbar, sin selección o sobre la selección) y editar
 * (bubble, cursor dentro del enlace). El texto se precarga de la selección o
 * del enlace existente; el checkbox por defecto va marcado.
 */
export function LinkForm({ onDone }: { onDone?: () => void }) {
  const { editor } = useEditor()
  const [href, setHref] = React.useState(() => editor.getLinkHref())
  const [text, setText] = React.useState(() => editor.getLinkText())
  const [newTab, setNewTab] = React.useState(() => editor.getLinkNewTab())

  function apply(e: React.FormEvent) {
    e.preventDefault()
    const url = href.trim()
    if (!url) {
      editor.runUnsetLink()
    } else {
      editor.runApplyLink({ href: url, text: text.trim(), newTab })
    }
    onDone?.()
  }

  return (
    <form onSubmit={apply} className="flex w-72 flex-col gap-2.5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="link-url" className="text-xs">
          Enlace
        </Label>
        <InputGroup>
          <InputGroupInput
            id="link-url"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="https://…"
            autoFocus
          />
          <InputGroupAddon align="inline-end">
            {href.trim() && (
              <a href={href.trim()} target="_blank" rel="noreferrer">
                <Button type="button" size="icon-xs" variant="ghost" title="Abrir enlace">
                  <IconExternalLink />
                </Button>
              </a>
            )}
            {editor.isLink && (
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="text-destructive"
                title="Quitar enlace"
                onClick={() => {
                  editor.runUnsetLink()
                  onDone?.()
                }}
              >
                <IconTrash />
              </Button>
            )}
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="link-text" className="text-xs">
          Texto
        </Label>
        <InputGroup>
          <InputGroupInput
            id="link-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Texto del enlace"
          />
        </InputGroup>
      </div>

      <Label className="flex items-center gap-2 text-sm font-normal">
        <Checkbox
          checked={newTab}
          onCheckedChange={(v) => setNewTab(v === true)}
        />
        Abrir en una pestaña nueva
      </Label>

      <Button type="submit" size="sm" className="w-full">
        {editor.isLink ? "Actualizar enlace" : "Añadir enlace"}
      </Button>
    </form>
  )
}
