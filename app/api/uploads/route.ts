import { NextResponse, type NextRequest } from "next/server"

// TODO(auth): reactivar cuando el auth esté listo (ver `adminProcedure`).
// import { getSession } from "@/lib/session"
import { MAX_FILES_PER_REQUEST } from "@/lib/upload/config"
import { saveUpload } from "@/lib/upload/storage"
import type {
  UploadFileError,
  UploadMetadata,
  UploadPostResponse,
} from "@/lib/upload/types"

export const runtime = "nodejs"

function json(body: UploadPostResponse, status: number) {
  return NextResponse.json(body, { status })
}

/**
 * Subida de archivos (multipart/form-data, campo "file").
 *
 * Es el **único** endpoint REST que queda: tRPC viaja sobre JSON y no puede
 * reportar progreso de subida, así que el binario sigue por aquí y todo lo
 * demás (listar / leer / editar / borrar) vive en el router `upload` de tRPC.
 */
export async function POST(request: NextRequest) {
  // TODO(auth): reactivar la comprobación de sesión cuando el auth esté listo.
  // const session = await getSession()
  // if (!session) return json({ ok: false, error: "No autorizado." }, 401)

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ ok: false, error: "Se esperaba multipart/form-data." }, 400)
  }

  const files = form.getAll("file").filter((f): f is File => f instanceof File)
  if (files.length === 0) {
    return json({ ok: false, error: "No se recibió ningún archivo." }, 400)
  }

  if (files.length > MAX_FILES_PER_REQUEST) {
    return json(
      { ok: false, error: `Máximo ${MAX_FILES_PER_REQUEST} archivos por petición.` },
      413
    )
  }

  const folderId = (form.get("folderId") as string | null) || null
  const saved: UploadMetadata[] = []
  const errors: UploadFileError[] = []

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
    return json(
      { ok: false, error: errors[0]?.error ?? "No se pudo subir ningún archivo.", errors },
      400
    )
  }

  return json({ ok: true, data: saved, errors }, 201)
}
