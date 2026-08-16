import type { UploadMetadata } from "@/lib/upload/types"

/** URL de visualización preferida (variante 1280/640 webp o el original). */
export function displaySrc(item: UploadMetadata): string {
  return item.sizes?.["1280"]?.webp?.url ?? item.sizes?.["640"]?.webp?.url ?? item.url
}

/** `srcset` responsivo a partir de las variantes webp del upload. */
export function buildSrcset(item: UploadMetadata): string | null {
  if (!item.sizes) return null
  const entries = Object.values(item.sizes)
    .map((formats) => formats.webp)
    .filter(Boolean)
    .map((r) => `${r.url} ${r.width}w`)
  return entries.length ? entries.join(", ") : null
}
