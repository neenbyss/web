"use server"

import { revalidatePath } from "next/cache"
import { Prisma } from "@/lib/generated/prisma/client"

import { ActionResult, fail, ok } from "@/lib/action-result"
import { db } from "@/lib/db"
import { getSession } from "@/lib/session"
import { toSlug, uniqueSlug } from "@/lib/slug"
import { connectTags } from "@/lib/tags"
import { projectInputSchema, type ProjectInput } from "@/lib/validations/project"

function revalidateProject(slug?: string) {
  revalidatePath("/admin/projects")
  revalidatePath("/portfolio")
  revalidatePath("/")
  if (slug) revalidatePath(`/portfolio/${slug}`)
}

export async function createProject(
  raw: ProjectInput
): Promise<ActionResult<{ id: string }>> {
  const session = await getSession()
  if (!session) return fail("No autorizado.")

  const parsed = projectInputSchema.safeParse(raw)
  if (!parsed.success) {
    return fail("Datos inválidos.", parsed.error.flatten().fieldErrors)
  }
  const input = parsed.data

  const slug = await uniqueSlug(input.slug || input.title, async (s) =>
    Boolean(
      await db.project.findUnique({ where: { slug: s }, select: { id: true } })
    )
  )

  const project = await db.project.create({
    data: {
      slug,
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
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      authorId: session.user.id,
      tags: { connectOrCreate: connectTags(input.tags) },
    },
  })

  revalidateProject(slug)
  return ok({ id: project.id })
}

export async function updateProject(
  id: string,
  raw: ProjectInput
): Promise<ActionResult<{ id: string }>> {
  const session = await getSession()
  if (!session) return fail("No autorizado.")

  const parsed = projectInputSchema.safeParse(raw)
  if (!parsed.success) {
    return fail("Datos inválidos.", parsed.error.flatten().fieldErrors)
  }
  const input = parsed.data

  const current = await db.project.findUnique({ where: { id } })
  if (!current) return fail("Proyecto no encontrado.")

  let slug = current.slug
  const desired = input.slug ? toSlug(input.slug) : toSlug(input.title)
  if (desired && desired !== current.slug) {
    slug = await uniqueSlug(desired, async (s) =>
      Boolean(
        await db.project.findFirst({
          where: { slug: s, NOT: { id } },
          select: { id: true },
        })
      )
    )
  }

  const becomingPublished =
    input.status === "PUBLISHED" && current.status !== "PUBLISHED"

  const project = await db.project.update({
    where: { id },
    data: {
      slug,
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
      publishedAt: becomingPublished
        ? new Date()
        : input.status === "DRAFT"
          ? null
          : current.publishedAt,
      tags: { set: [], connectOrCreate: connectTags(input.tags) },
    },
  })

  revalidateProject(slug)
  revalidateProject(current.slug)
  return ok({ id: project.id })
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const session = await getSession()
  if (!session) return fail("No autorizado.")

  const project = await db.project.delete({ where: { id } }).catch(() => null)
  if (!project) return fail("No se pudo eliminar el proyecto.")

  revalidateProject(project.slug)
  return ok(undefined)
}
