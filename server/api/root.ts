import { postRouter } from "@/server/api/routers/post"
import { projectRouter } from "@/server/api/routers/project"
import { tagRouter } from "@/server/api/routers/tag"
import { uploadRouter } from "@/server/api/routers/upload"
import { createCallerFactory, router } from "@/server/api/trpc"

/**
 * Router raíz: el único punto de entrada de la API.
 * Añadir un dominio nuevo = añadir una línea aquí.
 */
export const appRouter = router({
  post: postRouter,
  project: projectRouter,
  tag: tagRouter,
  upload: uploadRouter,
})

export type AppRouter = typeof appRouter

/** Caller directo (sin HTTP) para Server Components y scripts. */
export const createCaller = createCallerFactory(appRouter)
