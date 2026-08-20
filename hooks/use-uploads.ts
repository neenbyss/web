"use client"

import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { UploadCategory } from "@/lib/upload/categories"
import type { UploadMetadata, UploadPostResponse } from "@/lib/upload/types"
import type { UploadMetadataUpdate } from "@/lib/validations/upload"
import { useTRPC } from "@/trpc/client"

/** Subida del binario: fuera de tRPC para poder reportar progreso (XHR). */
const UPLOAD_ENDPOINT = "/api/uploads"

export interface UseUploadsOptions {
  category?: UploadCategory
  /** Lista precargada en el servidor: evita el parpadeo inicial. */
  initialItems?: UploadMetadata[]
  folderId?: string | null
  /** Pon `false` para no cargar hasta que haga falta (p.ej. diálogo cerrado). */
  enabled?: boolean
}

export interface UseUploadsReturn {
  items: UploadMetadata[]
  isLoading: boolean
  uploading: boolean
  progress: number
  error: string | null
  upload: (files: File[]) => Promise<UploadMetadata[]>
  remove: (id: string) => Promise<boolean>
  update: (id: string, data: UploadMetadataUpdate) => Promise<UploadMetadata | null>
  refresh: () => Promise<void>
  clearError: () => void
}

/**
 * Estado de la biblioteca de archivos.
 *
 * Lectura y escritura de metadata van por tRPC (caché compartida entre todos
 * los componentes que monten el hook con los mismos filtros); solo el POST del
 * binario usa XHR, porque es la única forma de tener barra de progreso.
 */
export function useUploads(options: UseUploadsOptions = {}): UseUploadsReturn {
  const { category, initialItems, folderId, enabled = true } = options

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const input = React.useMemo(() => (category ? { category } : {}), [category])
  const queryKey = React.useMemo(
    () => trpc.upload.list.queryKey(input),
    [trpc, input]
  )

  const list = useQuery(
    trpc.upload.list.queryOptions(input, { enabled, initialData: initialItems })
  )

  const [uploading, setUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [localError, setLocalError] = React.useState<string | null>(null)

  const clearError = React.useCallback(() => setLocalError(null), [])

  // Identidad estable: `UploadsList` la usa como dependencia de su intervalo de
  // polling, y un `refresh` nuevo en cada render lo recrearía sin parar.
  const refresh = React.useCallback(async () => {
    await queryClient.refetchQueries({ queryKey })
  }, [queryClient, queryKey])

  /** Escribe la lista en caché sin esperar a un refetch. */
  const writeList = React.useCallback(
    (fn: (prev: UploadMetadata[]) => UploadMetadata[]) => {
      queryClient.setQueryData(queryKey, (prev) => fn(prev ?? []))
    },
    [queryClient, queryKey]
  )

  const updateMutation = useMutation(
    trpc.upload.update.mutationOptions({
      onSuccess: (updated) => {
        writeList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      },
      onError: (e) => setLocalError(e.message || "No se pudo guardar."),
    })
  )

  const removeMutation = useMutation(
    trpc.upload.remove.mutationOptions({
      onSuccess: ({ id }) => {
        writeList((prev) => prev.filter((p) => p.id !== id))
      },
      onError: (e) => setLocalError(e.message || "No se pudo eliminar."),
    })
  )

  // `mutateAsync` sí es estable entre renders; el objeto de mutación no.
  const { mutateAsync: updateAsync } = updateMutation
  const { mutateAsync: removeAsync } = removeMutation

  const update = React.useCallback(
    async (id: string, data: UploadMetadataUpdate) => {
      setLocalError(null)
      try {
        return await updateAsync({ id, data })
      } catch {
        return null // el mensaje ya quedó en `error` vía onError
      }
    },
    [updateAsync]
  )

  const remove = React.useCallback(
    async (id: string) => {
      setLocalError(null)
      try {
        await removeAsync({ id })
        return true
      } catch {
        return false
      }
    },
    [removeAsync]
  )

  // Sube UN archivo reportando su fracción de progreso (0..1).
  const uploadOne = React.useCallback(
    (file: File, onFraction: (fraction: number) => void) =>
      new Promise<{ saved?: UploadMetadata; error?: string }>((resolve) => {
        const form = new FormData()
        form.append("file", file)
        if (folderId) form.append("folderId", folderId)

        const xhr = new XMLHttpRequest()
        xhr.open("POST", UPLOAD_ENDPOINT)

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onFraction(e.loaded / e.total)
        }

        xhr.onload = () => {
          let body: UploadPostResponse | null = null
          try {
            body = JSON.parse(xhr.responseText) as UploadPostResponse
          } catch {
            /* respuesta no JSON */
          }
          if (xhr.status >= 200 && xhr.status < 300 && body?.ok && body.data[0]) {
            resolve({ saved: body.data[0] })
          } else {
            const message =
              body && !body.ok ? body.error : `Error al subir "${file.name}" (${xhr.status}).`
            resolve({ error: message })
          }
        }

        xhr.onerror = () => resolve({ error: `Error de red al subir "${file.name}".` })
        xhr.send(form)
      }),
    [folderId]
  )

  // De uno en uno: memoria acotada en el servidor, progreso agregado y
  // tolerancia a fallos (un archivo con error no aborta el resto del lote).
  const upload = React.useCallback(
    async (files: File[]): Promise<UploadMetadata[]> => {
      if (files.length === 0) return []

      setUploading(true)
      setProgress(0)
      setLocalError(null)

      const total = files.length
      const saved: UploadMetadata[] = []
      const errors: string[] = []

      for (let i = 0; i < total; i++) {
        const result = await uploadOne(files[i], (fraction) => {
          setProgress(Math.round(((i + fraction) / total) * 100))
        })

        if (result.saved) {
          const item = result.saved
          writeList((prev) => (prev.some((p) => p.id === item.id) ? prev : [item, ...prev]))
          saved.push(item)
        } else if (result.error) {
          errors.push(result.error)
        }
        setProgress(Math.round(((i + 1) / total) * 100))
      }

      setUploading(false)

      if (saved.length > 0) {
        // Sincroniza cualquier otra vista de la biblioteca (otras categorías,
        // otros filtros) con lo que acaba de entrar.
        void queryClient.invalidateQueries({ queryKey: trpc.upload.pathKey() })
      }

      if (errors.length > 0) {
        setLocalError(
          errors.length === total
            ? errors[0]
            : `${saved.length} subido(s), ${errors.length} con error: ${errors[0]}`
        )
      }

      return saved
    },
    [uploadOne, writeList, queryClient, trpc]
  )

  const error = localError ?? (list.error ? list.error.message : null)

  return {
    items: list.data ?? [],
    isLoading: list.isFetching,
    uploading,
    progress,
    error,
    upload,
    remove,
    update,
    refresh,
    clearError,
  }
}
