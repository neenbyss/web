import "server-only"

import { randomUUID } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { toSlug } from "@/lib/slug"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
])

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
}

export type SavedUpload = {
  url: string
  filename: string
  mime: string
  size: number
}

/** Guarda un archivo subido en public/uploads y devuelve su URL pública. */
export async function saveUpload(file: File): Promise<SavedUpload> {
  if (!ALLOWED.has(file.type)) {
    throw new Error("Tipo de archivo no permitido.")
  }
  if (file.size > MAX_SIZE) {
    throw new Error("El archivo supera el límite de 5 MB.")
  }

  await mkdir(UPLOAD_DIR, { recursive: true })

  const ext = EXT_BY_MIME[file.type] ?? "bin"
  const base = toSlug(file.name.replace(/\.[^.]+$/, "")) || "img"
  const filename = `${base}-${randomUUID().slice(0, 8)}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(UPLOAD_DIR, filename), buffer)

  return {
    url: `/uploads/${filename}`,
    filename,
    mime: file.type,
    size: file.size,
  }
}
