import type { UploadCategory } from "./config"

export interface ImageSizeRecord {
  url: string
  width: number
  height: number
  size: number
  mime: string
}

export interface UploadMetadata {
  id: string
  originalName: string
  mime: string
  category: UploadCategory
  hash: string
  size: number
  width: number | null
  height: number | null
  /** URL pública del archivo original. */
  url: string
  title: string
  description: string
  /** Pie de foto / caption (útil para figuras en el contenido). */
  figcaption: string
  alt: string
  tags: string[]
  /** Carpeta lógica opcional a la que pertenece el archivo. */
  folderId: string | null
  sizes: Record<string, Record<string, ImageSizeRecord>> | null
  createdAt: string
  updatedAt: string
}
