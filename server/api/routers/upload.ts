import { TRPCError } from "@trpc/server"

import {
  deleteUpload,
  getUpload,
  listUploads,
  updateMetadata,
} from "@/lib/upload/storage"
import { idSchema } from "@/lib/validations/common"
import {
  uploadListQuerySchema,
  uploadUpdateInputSchema,
} from "@/lib/validations/upload"
import { publicProcedure, router } from "@/server/api/trpc"

/**
 * Biblioteca de archivos (almacenamiento en disco, metadata en JSON).
 *
 * La *subida* del binario no vive aquí: sigue en `POST /api/uploads` porque
 * necesita multipart + progreso de subida (XHR), algo que el transporte JSON de
 * tRPC no puede reportar. Todo lo demás (listar, leer, editar, borrar) es tRPC.
 *
 * TODO(auth): `update`/`remove` son públicos mientras el auth no esté activo;
 * cambiar a `adminProcedure` en cuanto lo esté.
 */
export const uploadRouter = router({
  /** Lista la biblioteca con filtros y orden opcionales. */
  list: publicProcedure
    .input(uploadListQuerySchema.optional())
    .query(({ input }) => listUploads(input)),

  /** Metadata de un archivo concreto. */
  byId: publicProcedure.input(idSchema).query(async ({ input }) => {
    const meta = await getUpload(input.id)
    if (!meta) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Archivo no encontrado." })
    }
    return meta
  }),

  /** Actualiza la metadata SEO (título, alt, descripción, caption, tags…). */
  update: publicProcedure.input(uploadUpdateInputSchema).mutation(async ({ input }) => {
    const updated = await updateMetadata(input.id, input.data)
    if (!updated) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Archivo no encontrado." })
    }
    return updated
  }),

  /** Elimina el archivo, sus variantes y su metadata. */
  remove: publicProcedure.input(idSchema).mutation(async ({ input }) => {
    const done = await deleteUpload(input.id)
    if (!done) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No se pudo eliminar el archivo.",
      })
    }
    return { id: input.id }
  }),
})
