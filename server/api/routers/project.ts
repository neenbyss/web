import { TRPCError } from "@trpc/server"

import { idSchema, slugSchema } from "@/lib/validations/common"
import { projectInputSchema } from "@/lib/validations/project"
import { adminProcedure, publicProcedure, router } from "@/server/api/trpc"
import { createProject, deleteProject, updateProject } from "@/server/projects/mutations"
import {
  getAllProjects,
  getProjectById,
  getPublishedProjectBySlug,
  getPublishedProjects,
} from "@/server/projects/queries"

const notFound = () =>
  new TRPCError({ code: "NOT_FOUND", message: "Proyecto no encontrado." })

/** Proyectos del portafolio. Mismo contrato que `postRouter`. */
export const projectRouter = router({
  /** Proyectos publicados: destacados primero, luego por orden manual. */
  list: publicProcedure.query(() => getPublishedProjects()),

  bySlug: publicProcedure.input(slugSchema).query(async ({ input }) => {
    const project = await getPublishedProjectBySlug(input.slug)
    if (!project) throw notFound()
    return project
  }),

  all: adminProcedure.query(() => getAllProjects()),

  byId: adminProcedure.input(idSchema).query(async ({ input }) => {
    const project = await getProjectById(input.id)
    if (!project) throw notFound()
    return project
  }),

  create: adminProcedure
    .input(projectInputSchema)
    .mutation(({ ctx, input }) => createProject(input, ctx.session.user.id)),

  update: adminProcedure
    .input(idSchema.extend({ data: projectInputSchema }))
    .mutation(async ({ input }) => {
      const project = await updateProject(input.id, input.data)
      if (!project) throw notFound()
      return project
    }),

  remove: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const project = await deleteProject(input.id)
    if (!project) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No se pudo eliminar el proyecto.",
      })
    }
    return project
  }),
})
