import "server-only"

import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError, flattenError } from "zod"

import { db } from "@/lib/db"
import { getSession } from "@/lib/session"

/**
 * Contexto de cada petición tRPC.
 *
 * Se construye una vez por request (route handler) o por render (RSC caller) y
 * queda disponible en todos los procedimientos.
 */
export async function createTRPCContext(opts: { headers: Headers }) {
  // Tolerante a fallos: si el auth todavía no está configurado (o la BD no
  // responde) la sesión queda a null y las rutas públicas siguen sirviendo.
  const session = await getSession(opts.headers).catch(() => null)

  return { db, session, headers: opts.headers }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<TRPCContext>().create({
  // superjson conserva Date/Map/Set/undefined a través del cable: los modelos
  // de Prisma llegan al cliente con sus tipos reales.
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        // Errores por campo listos para pintar en formularios.
        fieldErrors:
          error.cause instanceof ZodError ? flattenError(error.cause).fieldErrors : null,
      },
    }
  },
})

export const router = t.router
export const middleware = t.middleware
export const createCallerFactory = t.createCallerFactory

/** Procedimiento abierto: no exige sesión. */
export const publicProcedure = t.procedure

/**
 * Procedimiento protegido: exige sesión válida y estrecha `ctx.session` a
 * no-nulo para los resolvers.
 */
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No autorizado." })
  }
  return next({ ctx: { ...ctx, session: ctx.session } })
})
