"use client"

import * as React from "react"
import {
  IconFolderOpen,
  IconRefresh,
  IconAlertTriangle,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import type { UploadMetadata } from "@/lib/upload/types"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { UploadItem } from "./upload-item"
import { UploadDetail } from "./upload-detail"
import { useUploadsContext } from "./uploads-context"

type SortField = "date" | "name" | "size"
type SortOrder = "asc" | "desc"

const SORT_LABELS: Record<SortField, string> = {
  date: "Fecha",
  name: "Nombre",
  size: "Tamaño",
}

function sortItems(items: UploadMetadata[], field: SortField, order: SortOrder): UploadMetadata[] {
  const sorted = [...items].sort((a, b) => {
    let cmp = 0
    if (field === "date") cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    else if (field === "name") cmp = a.originalName.localeCompare(b.originalName)
    else cmp = a.size - b.size
    return order === "desc" ? -cmp : cmp
  })
  return sorted
}

export interface UploadsListProps {
  className?: string
  /** Intervalo de auto-refresco en ms (0 = desactivado). Por defecto 10s. */
  pollInterval?: number
}

/** Galería con orden, vista de detalle al hacer clic y refresco en tiempo real. */
export function UploadsList({ className, pollInterval = 10_000 }: UploadsListProps) {
  const { items, isLoading, error, refresh } = useUploadsContext()

  const [field, setField] = React.useState<SortField>("date")
  const [order, setOrder] = React.useState<SortOrder>("desc")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const sorted = React.useMemo(() => sortItems(items, field, order), [items, field, order])
  const selected = selectedId ? items.find((i) => i.id === selectedId) ?? null : null

  // Refresco en tiempo real: solo en la galería (no mientras se ve el detalle,
  // para no reordenar bajo el usuario).
  React.useEffect(() => {
    if (!pollInterval || selected) return
    const id = setInterval(() => void refresh(), pollInterval)
    return () => clearInterval(id)
  }, [pollInterval, selected, refresh])

  if (selected) {
    return (
      <UploadDetail
        className={className}
        item={selected}
        items={sorted}
        onNavigate={setSelectedId}
        onClose={() => setSelectedId(null)}
      />
    )
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[0.7rem] text-muted-foreground">Ordenar</span>
          {(Object.keys(SORT_LABELS) as SortField[]).map((f) => (
            <Button
              key={f}
              variant={field === f ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setField(f)}
            >
              {SORT_LABELS[f]}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon-xs"
            title={order === "desc" ? "Descendente" : "Ascendente"}
            onClick={() => setOrder((o) => (o === "desc" ? "asc" : "desc"))}
          >
            {order === "desc" ? <IconArrowDown /> : <IconArrowUp />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {items.length} archivo{items.length === 1 ? "" : "s"}
          </span>
          <Button variant="ghost" size="xs" onClick={() => void refresh()} disabled={isLoading}>
            <IconRefresh className={isLoading ? "animate-spin" : undefined} />
            Actualizar
          </Button>
        </div>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <IconAlertTriangle className="size-3.5 shrink-0" />
          {error}
        </p>
      )}

      {isLoading && items.length === 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-4/3 rounded-md" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Empty className="rounded-md border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconFolderOpen />
            </EmptyMedia>
            <EmptyTitle>Sin archivos</EmptyTitle>
            <EmptyDescription>Sube tu primer archivo desde la pestaña «Subir».</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sorted.map((item) => (
            <UploadItem key={item.id} item={item} onOpen={(it) => setSelectedId(it.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
