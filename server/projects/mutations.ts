import "server-only"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { Prisma } from "@/lib/generated/prisma/client"
import { toSlug, uniqueSlug } from "@/lib/slug"
import { connectTags } from "@/lib/tags"
import type { ProjectInput } from "@/lib/validations/project"

/**
 * Escrituras de proyectos. Misma forma que `server/posts/mutations.ts`:
 * devuelve `null` si el proyecto no existe y deja la traducción a HTTP al router.
 */

/** Invalida las rutas que muestran proyectos. */
function revalidateProject(slug?: string) {
  revalidatePath("/admin/projects")
  revalidatePath("/portfolio")
  revalidatePath("/")
  if (slug) revalidatePath(`/portfolio/${slug}`)
}

/** Campos comunes a create/update (todo menos slug, autor y publishedAt). */
function contentFields(input: ProjectInput) {
  return {
    title: input.title,
    summary: input.summary || null,
    coverImage: input.coverImage || null,
    status: input.status,
    featured: input.featured,
    order: input.order,
    liveUrl: input.liveUrl || null,
    repoUrl: input.repoUrl || null,
    techStack: input.techStack,
    contentJson: (input.contentJson ?? {}) as Prisma.InputJsonValue,
    contentMdx: input.contentMdx,
    contentHtml: input.contentHtml,
  }
}

export async function createProject(input: ProjectInput, authorId: string) {
  const slug = await uniqueSlug(input.slug || input.title, async (s) =>
    Boolean(await db.project.findUnique({ where: { slug: s }, select: { id: true } }))
  )

  const project = await db.project.create({
    data: {
      ...contentFields(input),
      slug,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      authorId,
      tags: { connectOrCreate: connectTags(input.tags) },
    },
    select: { id: true, slug: true },
  })

  revalidateProject(slug)
  return project
}

export async function updateProject(id: string, input: ProjectInput) {
  const current = await db.project.findUnique({
    where: { id },
    select: { slug: true, status: true, publishedAt: true },
  })
  if (!current) return null

  let slug = current.slug
  const desired = input.slug ? toSlug(input.slug) : toSlug(input.title)
  if (desired && desired !== current.slug) {
    slug = await uniqueSlug(desired, async (s) =>
      Boolean(
        await db.project.findFirst({ where: { slug: s, NOT: { id } }, select: { id: true } })
      )
    )
  }

  const becomingPublished = input.status === "PUBLISHED" && current.status !== "PUBLISHED"

  const project = await db.project.update({
    where: { id },
    data: {
      ...contentFields(input),
      slug,
      publishedAt: becomingPublished
        ? new Date()
        : input.status === "DRAFT"
          ? null
          : current.publishedAt,
      tags: { set: [], connectOrCreate: connectTags(input.tags) },
    },
    select: { id: true, slug: true },
  })

  revalidateProject(slug)
  revalidateProject(current.slug)
  return project
}

export async function deleteProject(id: string) {
  const project = await db.project
    .delete({ where: { id }, select: { id: true, slug: true } })
    .catch(() => null)
  if (!project) return null

  revalidateProject(project.slug)
  return project
}
