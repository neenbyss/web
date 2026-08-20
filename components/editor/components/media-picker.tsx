"use client"

import * as React from "react"
import { IconCloudUpload, IconPhoto, IconSearch, IconAlertTriangle } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { useUploads } from "@/hooks/use-uploads"
import { CATEGORY_META, formatBytes, type UploadCategory } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { UploadThumb } from "@/components/uploads"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress"
import {
  Dropzone,
  DropzoneDescription,
  DropzoneIcon,
  DropzoneTitle,
} from "@/components/ui/dropzone"

type SortField = "date" | "name" | "size"

export interface MediaPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: UploadCategory
  title?: string
  description?: string
  onSelect: (item: UploadMetadata) => void
}

/** Selector de media tipo Payload: subir nuevo o elegir de la biblioteca filtrable. */
export function MediaPicker({
  open,
  onOpenChange,
  category,
  title,
  description,
  onSelect,
}: MediaPickerProps) {
  const meta = category ? CATEGORY_META[category] : null
  // `enabled: open` evita cargar la biblioteca mientras el diálogo está cerrado.
  const { items, isLoading, uploading, progress, error, upload } = useUploads({
    category,
    enabled: open,
  })

  const [tab, setTab] = React.useState("library")
  const [search, setSearch] = React.useState("")
  const [format, setFormat] = React.useState("")
  const [sort, setSort] = React.useState<SortField>("date")
  const [clientError, setClientError] = React.useState<string | null>(null)

  const formats = React.useMemo(
    () => Array.from(new Set(items.map((i) => i.mime))).sort(),
    [items],
  )

  const visible = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = items.filter((i) => {
      if (format && i.mime !== format) return false
      if (!q) return true
      return (
        i.originalName.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
    return filtered.sort((a, b) => {
      if (sort === "name") return a.originalName.localeCompare(b.originalName)
      if (sort === "size") return b.size - a.size
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [items, search, format, sort])

  function choose(item: UploadMetadata) {
    onSelect(item)
    onOpenChange(false)
  }

  async function handleDrop(files: File[]) {
    setClientError(null)
    const saved = await upload(files)
    if (saved[0]) choose(saved[0])
    else setTab("upload")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title ?? `Insertar ${meta?.label.toLowerCase() ?? "archivo"}`}</DialogTitle>
          <DialogDescription>
            {description ?? "Sube un archivo nuevo o elige uno de tu biblioteca."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as string)} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="library">
              <IconPhoto />
              Biblioteca
            </TabsTrigger>
            <TabsTrigger value="upload">
              <IconCloudUpload />
              Subir
            </TabsTrigger>
          </TabsList>

          {/* Biblioteca filtrable */}
          <TabsContent value="library" className="flex flex-col gap-3 pt-3">
            <div className="flex flex-wrap items-end gap-2">
              <div className="relative flex-1 min-w-40">
                <IconSearch className="absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre, título o etiqueta…"
                  className="pl-6"
                />
              </div>
              <NativeSelect size="sm" value={format} onChange={(e) => setFormat(e.target.value)}>
                <NativeSelectOption value="">Todos los formatos</NativeSelectOption>
                {formats.map((f) => (
                  <NativeSelectOption key={f} value={f}>
                    {f}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect size="sm" value={sort} onChange={(e) => setSort(e.target.value as SortField)}>
                <NativeSelectOption value="date">Más recientes</NativeSelectOption>
                <NativeSelectOption value="name">Nombre</NativeSelectOption>
                <NativeSelectOption value="size">Tamaño</NativeSelectOption>
              </NativeSelect>
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <IconAlertTriangle className="size-3.5 shrink-0" />
                {error}
              </p>
            )}

            <div className="grid max-h-[46vh] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
              {visible.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => choose(item)}
                  className="group/media flex flex-col overflow-hidden rounded-md border border-border bg-card text-left transition-colors outline-none hover:border-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  title={item.originalName}
                >
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-muted">
                    <UploadThumb item={item} />
                  </div>
                  <div className="flex flex-col gap-0.5 p-2">
                    <span className="truncate text-[0.7rem] font-medium text-foreground">
                      {item.title || item.originalName}
                    </span>
                    <span className="text-[0.65rem] text-muted-foreground">
                      {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
                      {formatBytes(item.size)}
                    </span>
                  </div>
                </button>
              ))}
              {!isLoading && visible.length === 0 && (
                <p className="col-span-full py-10 text-center text-xs text-muted-foreground">
                  No hay archivos que coincidan.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Subir nuevo */}
          <TabsContent value="upload" className="flex flex-col gap-3 pt-3">
            <Dropzone
              accept={meta?.accept ?? undefined}
              maxSize={meta?.maxSize}
              disabled={uploading}
              onDrop={handleDrop}
              onError={(errs) => setClientError(errs.map((e) => e.message).join(" "))}
              className={cn("p-10")}
            >
              <DropzoneIcon>
                <IconCloudUpload />
              </DropzoneIcon>
              <DropzoneTitle>Arrastra, pega o haz clic para subir</DropzoneTitle>
              <DropzoneDescription>
                {meta ? `${meta.description} Máx. ${formatBytes(meta.maxSize)}.` : "Cualquier archivo."}
              </DropzoneDescription>
            </Dropzone>

            {uploading && (
              <Progress value={progress}>
                <ProgressTrack size="sm">
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            )}
            {(clientError || error) && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <IconAlertTriangle className="size-3.5 shrink-0" />
                {clientError || error}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
