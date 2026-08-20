import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"

// La biblioteca de uploads usa `node:fs` y `sharp`: runtime Node obligatorio.
export const runtime = "nodejs"

/** Único endpoint HTTP de la API: `/api/trpc/<router>.<procedimiento>`. */
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: req.headers }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`[trpc] ${path ?? "<sin ruta>"}: ${error.message}`)
          }
        : undefined,
  })
}

export { handler as GET, handler as POST }
