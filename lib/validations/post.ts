import { z } from "zod"

export const contentStatus = z.enum(["DRAFT", "PUBLISHED"])

/** Payload que envía el editor al guardar (contenido serializado). */
export const postInputSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(180),
  slug: z
    .string()
    .max(180)
    .regex(/^[a-z0-9-]*$/, "Slug inválido")
    .optional()
    .or(z.literal("")),
  excerpt: z.string().max(320).optional().or(z.literal("")),
  coverImage: z.string().url("URL inválida").optional().or(z.literal("")),
  status: contentStatus.default("DRAFT"),
  tags: z.array(z.string().min(1)).default([]),
  // Contenido del editor Tiptap
  contentJson: z.unknown().default({}),
  contentMdx: z.string().default(""),
  contentHtml: z.string().default(""),
})

export type PostInput = z.infer<typeof postInputSchema>
