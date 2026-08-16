import "server-only"

import sharp from "sharp"
import path from "node:path"
import { writeFile } from "node:fs/promises"
import { IMAGE_BREAKPOINTS, IMAGE_FORMATS } from "./config"
import type { ImageSizeRecord } from "./types"

export interface ProcessResult {
  width: number | null
  height: number | null
  sizes: Record<string, Record<string, ImageSizeRecord>> | null
}

export async function processImage(
  buffer: Buffer,
  mime: string,
  uploadId: string,
  sizesDir: string,
): Promise<ProcessResult> {
  if (!mime.startsWith("image/") || mime === "image/svg+xml" || mime === "image/gif") {
    return { width: null, height: null, sizes: null }
  }

  try {
    const metadata = await sharp(buffer).metadata()
    const originalWidth = metadata.width ?? 0
    const originalHeight = metadata.height ?? 0

    if (originalWidth === 0) {
      return { width: null, height: null, sizes: null }
    }

    const sizes: Record<string, Record<string, ImageSizeRecord>> = {}
    const relevantBreakpoints = [...IMAGE_BREAKPOINTS.filter((bp) => bp < originalWidth), originalWidth] as number[]

    for (const bp of relevantBreakpoints) {
      const ratio = bp / originalWidth
      const height = Math.round((originalHeight ?? 0) * ratio)

      // Los dos formatos de un mismo breakpoint se codifican en paralelo
      // (memoria acotada a ~2 encodes a la vez, la mitad de tiempo de pared).
      const entries = await Promise.all(
        IMAGE_FORMATS.map(async (fmt) => {
          // `toColourspace("srgb")` normaliza el espacio de color: salida
          // consistente y evita el aviso de libvips con perfiles atípicos.
          let img = sharp(buffer)
            .resize(bp, undefined, { fit: "outside", withoutEnlargement: true })
            .toColourspace("srgb")

          if (fmt === "webp") {
            img = img.webp({ quality: 80 })
          } else {
            // AVIF es el códec más caro: `effort` bajo reduce mucho el tiempo.
            img = img.avif({ quality: 60, effort: 2 })
          }

          const outputBuffer = await img.toBuffer()
          const filename = `${bp}.${fmt}`
          await writeFile(path.join(sizesDir, filename), outputBuffer)

          const record: ImageSizeRecord = {
            url: `/uploads/${uploadId}/sizes/${filename}`,
            width: Math.min(bp, originalWidth),
            height,
            size: outputBuffer.length,
            mime: `image/${fmt}`,
          }
          return [fmt, record] as const
        }),
      )

      sizes[String(bp)] = Object.fromEntries(entries)
    }

    return { width: originalWidth, height: originalHeight, sizes }
  } catch {
    return { width: null, height: null, sizes: null }
  }
}
