/**
 * Datos puros de categorías, **seguros para cliente** (sin imports de node).
 * Fuente de verdad de mimes permitidos y tamaños; `config.ts` los reexporta
 * y añade lo específico de servidor (rutas, validación).
 */

const KB = 1024
const MB = 1024 * KB
const GB = 1024 * MB

export const UPLOAD_CATEGORIES = ["image", "video", "file"] as const
export type UploadCategory = (typeof UPLOAD_CATEGORIES)[number]

export type ValidationReason = "type" | "size"

export interface CategoryMeta {
  label: string
  description: string
  /** Valor `accept` para el `<input type="file">`. */
  inputAccept: string
  /** Lista blanca de mimes; `null` = comodín (cualquier mime). */
  accept: readonly string[] | null
  /** Tamaño máximo por archivo (bytes). */
  maxSize: number
}

/**
 * Metadatos por categoría. Edita aquí los mimes permitidos y tamaños máximos.
 */
export const CATEGORY_META: Record<UploadCategory, CategoryMeta> = {
  image: {
    label: "Imágenes",
    description: "JPG, PNG, WebP, AVIF, GIF o SVG.",
    inputAccept: "image/*",
    accept: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
      "image/svg+xml",
    ],
    maxSize: 25 * MB,
  },
  video: {
    label: "Videos",
    description: "MP4, WebM, OGG o MOV.",
    inputAccept: "video/*",
    accept: ["video/mp4", "video/webm", "video/ogg", "video/quicktime"],
    maxSize: 500 * MB,
  },
  file: {
    label: "Archivos",
    description: "PDF, documentos, hojas de cálculo, comprimidos, etc.",
    inputAccept: "*/*",
    accept: null,
    maxSize: 100 * MB,
  },
}

const CATEGORY_ORDER: UploadCategory[] = ["image", "video", "file"]

function matchCategory(category: UploadCategory, mime: string): boolean {
  if (category === "image") return mime.startsWith("image/")
  if (category === "video") return mime.startsWith("video/")
  return true // "file" es comodín
}

/** Devuelve la categoría a la que pertenece un mime. */
export function resolveCategory(mime: string): UploadCategory {
  for (const category of CATEGORY_ORDER) {
    if (matchCategory(category, mime)) return category
  }
  return "file"
}

export type FileValidation =
  | { ok: true; category: UploadCategory }
  | { ok: false; reason: ValidationReason; message: string; category: UploadCategory }

/**
 * Valida mime + tamaño contra las reglas de su categoría.
 * Pura: se usa tanto en servidor (fuente de verdad) como en cliente (UX).
 */
export function validateFile(input: { mime: string; size: number }): FileValidation {
  const category = resolveCategory(input.mime)
  const meta = CATEGORY_META[category]

  if (meta.accept && !meta.accept.includes(input.mime)) {
    return {
      ok: false,
      reason: "type",
      category,
      message: `Tipo de archivo no permitido: ${input.mime || "desconocido"}.`,
    }
  }

  if (input.size > meta.maxSize) {
    return {
      ok: false,
      reason: "size",
      category,
      message: `El archivo supera el tamaño máximo (${formatBytes(meta.maxSize)}).`,
    }
  }

  return { ok: true, category }
}

/** Formatea bytes a una cadena legible (KB / MB / GB). */
export function formatBytes(bytes: number): string {
  if (bytes < KB) return `${bytes} B`
  if (bytes < MB) return `${(bytes / KB).toFixed(0)} KB`
  if (bytes < GB) return `${(bytes / MB).toFixed(bytes % MB === 0 ? 0 : 1)} MB`
  return `${(bytes / GB).toFixed(1)} GB`
}
