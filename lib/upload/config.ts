import path from "node:path"
import process from "node:process"

// Reexporta los datos/funciones puros de categorías (seguros para cliente).
export {
  UPLOAD_CATEGORIES,
  CATEGORY_META,
  resolveCategory,
  validateFile,
  formatBytes,
} from "./categories"
export type {
  UploadCategory,
  CategoryMeta,
  ValidationReason,
  FileValidation,
} from "./categories"

/**
 * Raíz de almacenamiento. Por defecto `public/uploads`, configurable con la
 * variable de entorno `UPLOAD_DIR` (ruta absoluta o relativa al cwd).
 */
export const UPLOAD_ROOT = process.env.UPLOAD_DIR
  ? path.isAbsolute(process.env.UPLOAD_DIR)
    ? process.env.UPLOAD_DIR
    : path.join(process.cwd(), process.env.UPLOAD_DIR)
  : path.join(process.cwd(), "public", "uploads")

/** URL pública base desde la que se sirven los archivos guardados. */
export const UPLOAD_PUBLIC_PATH = process.env.UPLOAD_PUBLIC_PATH ?? "/uploads"

/** Compat: alias histórico usado por el resto del módulo. */
export const UPLOAD_DIR = UPLOAD_ROOT

export const IMAGE_BREAKPOINTS = [320, 640, 1280, 1920] as const
export const IMAGE_FORMATS = ["webp", "avif"] as const

export const DEFAULT_MAX_SIZE = 500 * 1024 * 1024

/**
 * Nº máximo de archivos aceptados en una sola petición POST. Red de seguridad
 * frente a lotes enormes (el cliente además sube de uno en uno).
 */
export const MAX_FILES_PER_REQUEST = 12

export const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
  "video/quicktime": "mov",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "application/pdf": "pdf",
  "application/zip": "zip",
  "application/x-rar-compressed": "rar",
  "application/gzip": "gz",
  "text/plain": "txt",
  "text/csv": "csv",
  "application/json": "json",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
}
