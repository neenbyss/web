import { cn } from "@/lib/utils"

export interface RichContentProps {
  /** HTML serializado por el editor Tiptap (campo `contentHtml`). */
  html: string
  className?: string
}

/**
 * Pinta el contenido de un post/proyecto.
 *
 * El HTML lo genera nuestro propio editor y solo lo escriben administradores
 * autenticados, así que se inyecta tal cual. Si algún día se acepta contenido
 * de terceros, sanear aquí (un único punto).
 */
export function RichContent({ html, className }: RichContentProps) {
  return (
    <div
      className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
