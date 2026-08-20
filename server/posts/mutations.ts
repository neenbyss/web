import "server-only"

import { revalidatePath } from "next/cache"
import readingTime from "reading-time"

import { db } from "@/lib/db"
import { Prisma } from "@/lib/generated/prisma/client"
import { toSlug, uniqueSlug } from "@/lib/slug"
import { connectTags } from "@/lib/tags"
import type { PostInput } from "@/lib/validations/post"

/**
 * Escrituras de posts. Capa agnóstica del transporte: no lanza `TRPCError` ni
 * conoce HTTP — devuelve `null` cuando el post no existe y el router traduce.
 */

/** Invalida las rutas que muestran posts. */
function revalidatePost(slug?: string) {
  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  if (slug) revalidatePath(`/blog/${slug}`)
}

/** Minutos de lectura estimados a partir del texto plano/MDX. */
function estimateReadingTime(contentMdx: string): number {
  return Math.max(1, Math.round(readingTime(contentMdx).minutes))
}

/** Campos comunes a create/update (todo menos slug, autor y publishedAt). */
function contentFields(input: PostInput) {
  return {
    title: input.title,
    excerpt: input.excerpt || null,
    coverImage: input.coverImage || null,
    status: input.status,
    contentJson: (input.contentJson ?? {}) as Prisma.InputJsonValue,
    contentMdx: input.contentMdx,
    contentHtml: input.contentHtml,
    readingTime: estimateReadingTime(input.contentMdx),
  }
}

export async function createPost(input: PostInput, authorId: string) {
  const slug = await uniqueSlug(input.slug || input.title, async (s) =>
    Boolean(await db.post.findUnique({ where: { slug: s }, select: { id: true } }))
  )

  const post = await db.post.create({
    data: {
      ...contentFields(input),
      slug,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      authorId,
      tags: { connectOrCreate: connectTags(input.tags) },
    },
    select: { id: true, slug: true },
  })

  revalidatePost(slug)
  return post
}

export async function updatePost(id: string, input: PostInput) {
  const current = await db.post.findUnique({
    where: { id },
    select: { slug: true, status: true, publishedAt: true },
  })
  if (!current) return null

  // Si el usuario fijó slug, normalízalo y asegúralo único (excepto el actual).
  let slug = current.slug
  const desired = input.slug ? toSlug(input.slug) : toSlug(input.title)
  if (desired && desired !== current.slug) {
    slug = await uniqueSlug(desired, async (s) =>
      Boolean(
        await db.post.findFirst({ where: { slug: s, NOT: { id } }, select: { id: true } })
      )
    )
  }

  const becomingPublished = input.status === "PUBLISHED" && current.status !== "PUBLISHED"

  const post = await db.post.update({
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

  revalidatePost(slug)
  revalidatePost(current.slug)
  return post
}

export async function deletePost(id: string) {
  const post = await db.post
    .delete({ where: { id }, select: { id: true, slug: true } })
    .catch(() => null)
  if (!post) return null

  revalidatePost(post.slug)
  return post
}
