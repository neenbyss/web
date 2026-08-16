import slugify from "slugify"

export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true })
}

/**
 * Garantiza un slug único consultando si ya existe.
 * `exists` debe devolver true si el slug ya está tomado.
 */
export async function uniqueSlug(
  input: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const base = toSlug(input) || "item"
  let slug = base
  let n = 1
  while (await exists(slug)) {
    n += 1
    slug = `${base}-${n}`
  }
  return slug
}
