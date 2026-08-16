import { z } from "zod"

import { UPLOAD_CATEGORIES } from "@/lib/upload/categories"

/** Campos de metadata SEO editables desde el gestor. */
export const uploadMetadataUpdateSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(600).optional(),
  alt: z.string().max(300).optional(),
  figcaption: z.string().max(300).optional(),
  tags: z.array(z.string().min(1).max(40)).max(30).optional(),
  folderId: z.string().max(120).nullable().optional(),
})

export type UploadMetadataUpdate = z.infer<typeof uploadMetadataUpdateSchema>

/** Parámetros de consulta admitidos por el GET de listado. */
export const uploadListQuerySchema = z.object({
  category: z.enum(UPLOAD_CATEGORIES).optional(),
  search: z.string().max(120).optional(),
  sort: z.enum(["date", "name", "size"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
})

export type UploadListQuery = z.infer<typeof uploadListQuerySchema>
