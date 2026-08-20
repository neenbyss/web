import { TRPCError } from "@trpc/server"

import { idSchema, slugSchema } from "@/lib/validations/common"
import { postInputSchema } from "@/lib/validations/post"
import { adminProcedure, publicProcedure, router } from "@/server/api/trpc"
import { createPost, deletePost, updatePost } from "@/server/posts/mutations"
import {
  getAllPosts,
  getPostById,
  getPublishedPostBySlug,
  getPublishedPosts,
} from "@/server/posts/queries"

const notFound = () =>
  new TRPCError({ code: "NOT_FOUND", message: "Post no encontrado." })

/**
 * Posts del blog.
 *
 * Lecturas públicas (`list`, `bySlug`) para el sitio; el resto exige sesión.
 */
export const postRouter = router({
  /** Posts publicados, del más reciente al más antiguo. */
  list: publicProcedure.query(() => getPublishedPosts()),

  /** Detalle público por slug. */
  bySlug: publicProcedure.input(slugSchema).query(async ({ input }) => {
    const post = await getPublishedPostBySlug(input.slug)
    if (!post) throw notFound()
    return post
  }),

  /** Todos los posts, borradores incluidos (panel). */
  all: adminProcedure.query(() => getAllPosts()),

  /** Detalle por id para el editor. */
  byId: adminProcedure.input(idSchema).query(async ({ input }) => {
    const post = await getPostById(input.id)
    if (!post) throw notFound()
    return post
  }),

  create: adminProcedure
    .input(postInputSchema)
    .mutation(({ ctx, input }) => createPost(input, ctx.session.user.id)),

  update: adminProcedure
    .input(idSchema.extend({ data: postInputSchema }))
    .mutation(async ({ input }) => {
      const post = await updatePost(input.id, input.data)
      if (!post) throw notFound()
      return post
    }),

  remove: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const post = await deletePost(input.id)
    if (!post) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No se pudo eliminar el post.",
      })
    }
    return post
  }),
})
