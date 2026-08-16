"use client"

import * as React from "react"

import { CATEGORY_META, type UploadCategory } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UploadsPanel } from "./uploads-panel"

export interface UploadsDialogProps {
  category: UploadCategory
  initialItems?: UploadMetadata[]
  /** Contenido del botón que abre el diálogo. Por defecto usa la etiqueta de la categoría. */
  trigger?: React.ReactNode
}

/** Diálogo con el panel de gestión (Subir / Lista) de una categoría. */
export function UploadsDialog({ category, initialItems, trigger }: UploadsDialogProps) {
  const meta = CATEGORY_META[category]

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" />}
      >
        {trigger ?? `Gestionar ${meta.label.toLowerCase()}`}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{meta.label}</DialogTitle>
          <DialogDescription>{meta.description}</DialogDescription>
        </DialogHeader>
        <UploadsPanel category={category} initialItems={initialItems} />
      </DialogContent>
    </Dialog>
  )
}
