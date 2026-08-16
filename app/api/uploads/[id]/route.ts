import { NextResponse } from "next/server"

// TODO(auth): reactivar cuando el auth esté listo.
// import { getSession } from "@/lib/session"
import { deleteUpload, getUpload, updateMetadata } from "@/lib/upload/storage"
import { uploadMetadataUpdateSchema } from "@/lib/validations/upload"

export const runtime = "nodejs"

type Params = { params: Promise<{ id: string }> }

/** GET público: metadata de un archivo concreto. */
export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const meta = await getUpload(id)
  if (!meta) {
    return NextResponse.json({ ok: false, error: "No encontrado." }, { status: 404 })
  }
  return NextResponse.json({ ok: true, data: meta })
}

/** PATCH: actualiza la metadata SEO. */
export async function PATCH(request: Request, { params }: Params) {
  // TODO(auth): reactivar la comprobación de sesión cuando el auth esté listo.
  // const session = await getSession()
  // if (!session) {
  //   return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 })
  // }

  const { id } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 })
  }

  const parsed = uploadMetadataUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const updated = await updateMetadata(id, parsed.data)
  if (!updated) {
    return NextResponse.json({ ok: false, error: "No encontrado." }, { status: 404 })
  }
  return NextResponse.json({ ok: true, data: updated })
}

/** DELETE: elimina el archivo y su metadata. */
export async function DELETE(_request: Request, { params }: Params) {
  // TODO(auth): reactivar la comprobación de sesión cuando el auth esté listo.
  // const session = await getSession()
  // if (!session) {
  //   return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 })
  // }

  const { id } = await params
  const done = await deleteUpload(id)
  if (!done) {
    return NextResponse.json({ ok: false, error: "No se pudo eliminar." }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: { id } })
}
