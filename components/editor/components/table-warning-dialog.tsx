"use client"

import { IconAlertTriangle } from "@tabler/icons-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface TableWarningDialogProps {
  /** Mensaje a mostrar; `null` = cerrado. */
  message: string | null
  onClose: () => void
}

/**
 * Modal de advertencia para acciones de tabla que no se pueden completar (p.ej.
 * activar encabezado con celdas combinadas cruzando la primera fila/columna).
 * Sustituye a los avisos inline dentro del dropdown: el usuario quiere un modal.
 */
export function TableWarningDialog({ message, onClose }: TableWarningDialogProps) {
  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconAlertTriangle className="size-4 text-destructive" />
            No se puede completar
          </DialogTitle>
          <DialogDescription className="normal-case">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button size="sm" />}>Entendido</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
