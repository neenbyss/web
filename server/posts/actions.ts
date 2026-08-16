"use server"

import { revalidatePath } from "next/cache"
import readingTime from "reading-time"
import { Prisma } from "@/lib/generated/prisma/client"

import { ActionResult, fail, ok } from "@/lib/action-result"
import { db } from "@/lib/db"
import { getSession } from "@/lib/session"
import { toSlug, uniqueSlug } from "@/lib/slug"
import { connectTags } from "@/lib/tags"
import { postInputSchema, type PostInput } from "@/lib/validations/post"

function revalidatePost(slug?: string) {
  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  if (slug) revalidatePath(`/blog/${slug}`)
}

export async function createPost(
  raw: PostInput
): Promise<ActionResult<{ id: string }>> {
  const session = await getSession()
  if (!session) return fail("No autorizado.")

  const parsed = postInputSchema.safeParse(raw)
  if (!parsed.success) {
    return fail("Datos inválidos.", parsed.error.flatten().fieldErrors)
  }
  const input = parsed.data

  const slug = await uniqueSlug(input.slug || input.title, async (s) =>
    Boolean(await db.post.findUnique({ where: { slug: s }, select: { id: true } }))
  )

  const post = await db.post.create({
    data: {
      slug,
      title: input.title,
      excerpt: input.excerpt || null,
      coverImage: input.coverImage || null,
      status: input.status,
      contentJson: (input.contentJson ?? {}) as Prisma.InputJsonValue,
      contentMdx: input.contentMdx,
      contentHtml: input.contentHtml,
      readingTime: Math.max(1, Math.round(readingTime(input.contentMdx).minutes)),
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      authorId: session.user.id,
      tags: { connectOrCreate: connectTags(input.tags) },
    },
  })

  revalidatePost(slug)
  return ok({ id: post.id })
}

export async function updatePost(
  id: string,
  raw: PostInput
): Promise<ActionResult<{ id: string }>> {
  const session = await getSession()
  if (!session) return fail("No autorizado.")

  const parsed = postInputSchema.safeParse(raw)
  if (!parsed.success) {
    return fail("Datos inválidos.", parsed.error.flatten().fieldErrors)
  }
  const input = parsed.data

  const current = await db.post.findUnique({ where: { id } })
  if (!current) return fail("Post no encontrado.")

  // Si el usuario fijó slug, normalízalo y asegúralo único (excepto el actual).
  let slug = current.slug
  const desired = input.slug ? toSlug(input.slug) : toSlug(input.title)
  if (desired && desired !== current.slug) {
    slug = await uniqueSlug(desired, async (s) =>
      Boolean(
        await db.post.findFirst({
          where: { slug: s, NOT: { id } },
          select: { id: true },
        })
      )
    )
  }

  const becomingPublished =
    input.status === "PUBLISHED" && current.status !== "PUBLISHED"

  const post = await db.post.update({
    where: { id },
    data: {
      slug,
      title: input.title,
      excerpt: input.excerpt || null,
      coverImage: input.coverImage || null,
      status: input.status,
      contentJson: (input.contentJson ?? {}) as Prisma.InputJsonValue,
      contentMdx: input.contentMdx,
      contentHtml: input.contentHtml,
      readingTime: Math.max(1, Math.round(readingTime(input.contentMdx).minutes)),
      publishedAt: becomingPublished
        ? new Date()
        : input.status === "DRAFT"
          ? null
          : current.publishedAt,
      tags: { set: [], connectOrCreate: connectTags(input.tags) },
    },
  })

  revalidatePost(slug)
  revalidatePost(current.slug)
  return ok({ id: post.id })
}

export async function deletePost(id: string): Promise<ActionResult> {
  const session = await getSession()
  if (!session) return fail("No autorizado.")

  const post = await db.post.delete({ where: { id } }).catch(() => null)
  if (!post) return fail("No se pudo eliminar el post.")

  revalidatePost(post.slug)
  return ok(undefined)
}
