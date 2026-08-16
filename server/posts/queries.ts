import "server-only"

import { db } from "@/lib/db"

export type PostListItem = Awaited<ReturnType<typeof getPublishedPosts>>[number]

/** Posts publicados (sitio público). */
export async function getPublishedPosts() {
  return db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      readingTime: true,
      publishedAt: true,
      tags: { select: { name: true, slug: true } },
    },
  })
}

/** Post publicado por slug (detalle público). */
export async function getPublishedPostBySlug(slug: string) {
  return db.post.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { tags: true, author: { select: { name: true, image: true } } },
  })
}

/** Todos los posts (admin). */
export async function getAllPosts() {
  return db.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { tags: { select: { name: true, slug: true } } },
  })
}

/** Post por id (admin, para editar). */
export async function getPostById(id: string) {
  return db.post.findUnique({
    where: { id },
    include: { tags: true },
  })
}
