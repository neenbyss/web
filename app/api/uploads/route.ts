import { NextResponse, type NextRequest } from "next/server"

// TODO(auth): reactivar cuando el auth esté listo.
// import { getSession } from "@/lib/session"
import { MAX_FILES_PER_REQUEST } from "@/lib/upload/config"
import { listUploads, saveUpload } from "@/lib/upload/storage"
import type { UploadMetadata } from "@/lib/upload/types"
import { uploadListQuerySchema } from "@/lib/validations/upload"

export const runtime = "nodejs"

/** GET público: lista los uploads con filtros opcionales. */
export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams)
  const parsed = uploadListQuerySchema.safeParse(params)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Parámetros inválidos.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const data = await listUploads(parsed.data)
  return NextResponse.json({ ok: true, data })
}

/** POST: sube uno o varios archivos (multipart/form-data, campo "file"). */
export async function POST(request: NextRequest) {
  // TODO(auth): reactivar la comprobación de sesión cuando el auth esté listo.
  // const session = await getSession()
  // if (!session) {
  //   return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 })
  // }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Se esperaba multipart/form-data." },
      { status: 400 },
    )
  }

  const files = form.getAll("file").filter((f): f is File => f instanceof File)
  if (files.length === 0) {
    return NextResponse.json({ ok: false, error: "No se recibió ningún archivo." }, { status: 400 })
  }

  if (files.length > MAX_FILES_PER_REQUEST) {
    return NextResponse.json(
      { ok: false, error: `Máximo ${MAX_FILES_PER_REQUEST} archivos por petición.` },
      { status: 413 },
    )
  }

  const folderId = (form.get("folderId") as string | null) || null
  const saved: UploadMetadata[] = []
  const errors: { file: string; error: string }[] = []

  // Secuencial y tolerante a fallos: un archivo problemático no tumba el lote.
  for (const file of files) {
    try {
      const result = await saveUpload(file, { folderId })
      if (result.ok) saved.push(result.data)
      else errors.push({ file: file.name, error: result.message })
    } catch (e) {
      errors.push({
        file: file.name,
        error: e instanceof Error ? e.message : "Error al procesar el archivo.",
      })
    }
  }

  // Éxito parcial: 201 si se guardó algo; 400 solo si fallaron todos.
  if (saved.length === 0) {
    return NextResponse.json(
      { ok: false, error: errors[0]?.error ?? "No se pudo subir ningún archivo.", errors },
      { status: 400 },
    )
  }

  return NextResponse.json({ ok: true, data: saved, errors }, { status: 201 })
}
