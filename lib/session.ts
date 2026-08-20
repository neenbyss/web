import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

/**
 * Devuelve la sesión actual o null.
 *
 * Acepta unas cabeceras explícitas (contexto tRPC / route handlers, donde ya
 * tenemos el `Request`); si se omiten, las toma de `next/headers`.
 */
export async function getSession(reqHeaders?: Headers) {
  return auth.api.getSession({ headers: reqHeaders ?? (await headers()) })
}

/**
 * Exige una sesión válida. Redirige a /admin/login si no hay sesión.
 * Devuelve la sesión para usar el usuario autenticado.
 */
export async function requireAdmin() {
  const session = await getSession()
  if (!session) redirect("/admin/login")
  return session
}
