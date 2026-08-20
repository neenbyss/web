import { z } from "zod"

/** Identificador opaco de un recurso (cuid de Prisma o uuid de un upload). */
export const idSchema = z.object({
  id: z.string().min(1, "Identificador requerido"),
})

/** Slug público de un contenido. */
export const slugSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug requerido")
    .max(180)
    .regex(/^[a-z0-9-]+$/, "Slug inválido"),
})

export type IdInput = z.infer<typeof idSchema>
export type SlugInput = z.infer<typeof slugSchema>
