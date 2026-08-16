import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

/** Devuelve la sesión actual o null. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
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
