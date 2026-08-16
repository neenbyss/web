import "server-only"

import { randomUUID, createHash } from "node:crypto"
import { mkdir, writeFile, readFile, readdir, rm } from "node:fs/promises"
import path from "node:path"

import {
  UPLOAD_DIR,
  UPLOAD_PUBLIC_PATH,
  EXT_BY_MIME,
  validateFile,
  type UploadCategory,
  type ValidationReason,
} from "./config"
import { processImage } from "./process"
import type { UploadMetadata } from "./types"

export interface ListOptions {
  search?: string
  category?: UploadCategory
  /** Filtro por mimes exactos (además de la categoría). */
  type?: string[]
  sort?: "date" | "name" | "size"
  order?: "asc" | "desc"
}

export interface SaveOptions {
  folderId?: string | null
  title?: string
  alt?: string
}

export type SaveResult =
  | { ok: true; data: UploadMetadata }
  | { ok: false; reason: ValidationReason; message: string }

export function computeHash(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex")
}

/** URL pública del archivo original a partir de su id + extensión. */
function publicUrl(id: string, ext: string): string {
  return `${UPLOAD_PUBLIC_PATH}/${id}/original.${ext}`
}

export async function findDuplicate(hash: string): Promise<UploadMetadata | null> {
  try {
    const entries = await readdir(UPLOAD_DIR, { withFileTypes: true })
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue
      try {
        const raw = await readFile(path.join(UPLOAD_DIR, entry.name, "metadata.json"), "utf-8")
        const meta: UploadMetadata = JSON.parse(raw)
        if (meta.hash === hash) return meta
      } catch {
        continue
      }
    }
  } catch {
    return null
  }
  return null
}

/**
 * Guarda un archivo tras validar mime y tamaño en servidor.
 * Devuelve un resultado tipado para poder responder 400 con el motivo.
 */
export async function saveUpload(file: File, opts?: SaveOptions): Promise<SaveResult> {
  const validation = validateFile({ mime: file.type, size: file.size })
  if (!validation.ok) {
    return { ok: false, reason: validation.reason, message: validation.message }
  }
  const category: UploadCategory = validation.category

  const buffer = Buffer.from(await file.arrayBuffer())
  const hash = computeHash(buffer)

  const duplicate = await findDuplicate(hash)
  if (duplicate) return { ok: true, data: duplicate }

  const id = randomUUID()
  const dir = path.join(UPLOAD_DIR, id)
  const sizesDir = path.join(dir, "sizes")
  await mkdir(sizesDir, { recursive: true })

  const ext = EXT_BY_MIME[file.type] ?? "bin"
  await writeFile(path.join(dir, `original.${ext}`), buffer)

  const { width, height, sizes } = await processImage(buffer, file.type, id, sizesDir)

  if (!sizes) {
    await rm(sizesDir, { recursive: true, force: true })
  }

  const now = new Date().toISOString()
  const metadata: UploadMetadata = {
    id,
    originalName: file.name,
    mime: file.type,
    category,
    hash,
    size: buffer.length,
    width,
    height,
    url: publicUrl(id, ext),
    title: opts?.title ?? "",
    description: "",
    figcaption: "",
    alt: opts?.alt ?? "",
    tags: [],
    folderId: opts?.folderId ?? null,
    sizes,
    createdAt: now,
    updatedAt: now,
  }

  await writeFile(path.join(dir, "metadata.json"), JSON.stringify(metadata, null, 2))
  return { ok: true, data: metadata }
}

export async function getUpload(id: string): Promise<UploadMetadata | null> {
  // Evita path traversal: el id debe ser un segmento simple.
  if (!id || id.includes("/") || id.includes("\\") || id.includes("..")) return null
  try {
    const raw = await readFile(path.join(UPLOAD_DIR, id, "metadata.json"), "utf-8")
    return JSON.parse(raw) as UploadMetadata
  } catch {
    return null
  }
}

export async function listUploads(opts?: ListOptions): Promise<UploadMetadata[]> {
  try {
    const entries = await readdir(UPLOAD_DIR, { withFileTypes: true })
    const results: UploadMetadata[] = []
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue
      const meta = await getUpload(entry.name)
      if (meta) results.push(meta)
    }

    let filtered = results

    if (opts?.category) {
      filtered = filtered.filter((f) => f.category === opts.category)
    }

    if (opts?.search) {
      const q = opts.search.toLowerCase()
      filtered = filtered.filter(
        (f) =>
          f.originalName.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    if (opts?.type && opts.type.length > 0) {
      filtered = filtered.filter((f) => opts.type!.includes(f.mime))
    }

    const sort = opts?.sort ?? "date"
    const order = opts?.order ?? "desc"
    filtered.sort((a, b) => {
      let cmp = 0
      if (sort === "date") cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      else if (sort === "name") cmp = a.originalName.localeCompare(b.originalName)
      else if (sort === "size") cmp = a.size - b.size
      return order === "desc" ? -cmp : cmp
    })

    return filtered
  } catch {
    return []
  }
}

export type MetadataPatch = Partial<
  Pick<UploadMetadata, "title" | "description" | "alt" | "figcaption" | "tags" | "folderId">
>

export async function updateMetadata(
  id: string,
  data: MetadataPatch,
): Promise<UploadMetadata | null> {
  const existing = await getUpload(id)
  if (!existing) return null

  const updated: UploadMetadata = { ...existing, ...data, updatedAt: new Date().toISOString() }
  await writeFile(path.join(UPLOAD_DIR, id, "metadata.json"), JSON.stringify(updated, null, 2))
  return updated
}

export async function deleteUpload(id: string): Promise<boolean> {
  if (!id || id.includes("/") || id.includes("\\") || id.includes("..")) return false
  try {
    await rm(path.join(UPLOAD_DIR, id), { recursive: true, force: true })
    return true
  } catch {
    return false
  }
}
