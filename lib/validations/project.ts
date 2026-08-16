import { z } from "zod"

import { contentStatus } from "@/lib/validations/post"

export const projectInputSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(180),
  slug: z
    .string()
    .max(180)
    .regex(/^[a-z0-9-]*$/, "Slug inválido")
    .optional()
    .or(z.literal("")),
  summary: z.string().max(320).optional().or(z.literal("")),
  coverImage: z.string().url("URL inválida").optional().or(z.literal("")),
  status: contentStatus.default("DRAFT"),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0),
  liveUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  repoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  techStack: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  contentJson: z.unknown().default({}),
  contentMdx: z.string().default(""),
  contentHtml: z.string().default(""),
})

export type ProjectInput = z.infer<typeof projectInputSchema>
