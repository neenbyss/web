import "server-only"

import { db } from "@/lib/db"
import { toSlug } from "@/lib/slug"

/**
 * Convierte una lista de nombres de tags en operaciones connectOrCreate
 * para usar en `data.tags` de Post/Project.
 */
export function connectTags(names: string[]) {
  const unique = Array.from(
    new Map(
      names
        .map((n) => n.trim())
        .filter(Boolean)
        .map((name) => [toSlug(name), name])
    ).entries()
  )

  return unique.map(([slug, name]) => ({
    where: { slug },
    create: { name, slug },
  }))
}

export async function getAllTags() {
  return db.tag.findMany({ orderBy: { name: "asc" } })
}
