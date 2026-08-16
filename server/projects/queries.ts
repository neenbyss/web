import "server-only"

import { db } from "@/lib/db"

export type ProjectListItem = Awaited<
  ReturnType<typeof getPublishedProjects>
>[number]

/** Proyectos publicados (sitio público), destacados primero. */
export async function getPublishedProjects() {
  return db.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { publishedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      coverImage: true,
      featured: true,
      liveUrl: true,
      repoUrl: true,
      techStack: true,
      tags: { select: { name: true, slug: true } },
    },
  })
}

export async function getPublishedProjectBySlug(slug: string) {
  return db.project.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { tags: true },
  })
}

/** Todos los proyectos (admin). */
export async function getAllProjects() {
  return db.project.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    include: { tags: { select: { name: true, slug: true } } },
  })
}

export async function getProjectById(id: string) {
  return db.project.findUnique({
    where: { id },
    include: { tags: true },
  })
}
