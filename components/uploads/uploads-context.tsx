"use client"

import * as React from "react"

import { useUploads, type UseUploadsReturn } from "@/hooks/use-uploads"
import type { UploadCategory } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"

interface UploadsContextValue extends UseUploadsReturn {
  category?: UploadCategory
}

const UploadsContext = React.createContext<UploadsContextValue | null>(null)

/** Acceso al estado del gestor de uploads. */
export function useUploadsContext(): UploadsContextValue {
  const ctx = React.useContext(UploadsContext)
  if (!ctx) throw new Error("useUploadsContext debe usarse dentro de <UploadsProvider>.")
  return ctx
}

export interface UploadsProviderProps {
  category?: UploadCategory
  initialItems?: UploadMetadata[]
  folderId?: string | null
  /** Pon `false` para no cargar la biblioteca hasta que sea visible. */
  enabled?: boolean
  children: React.ReactNode
}

/** Provee un `useUploads` compartido para dropzone + lista de una misma categoría. */
export function UploadsProvider({
  category,
  initialItems,
  folderId,
  enabled,
  children,
}: UploadsProviderProps) {
  const uploads = useUploads({ category, initialItems, folderId, enabled })
  const value = React.useMemo(() => ({ ...uploads, category }), [uploads, category])
  return <UploadsContext.Provider value={value}>{children}</UploadsContext.Provider>
}
