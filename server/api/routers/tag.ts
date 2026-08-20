import { getAllTags } from "@/lib/tags"
import { publicProcedure, router } from "@/server/api/trpc"

/** Etiquetas compartidas por posts y proyectos. */
export const tagRouter = router({
  list: publicProcedure.query(() => getAllTags()),
})
