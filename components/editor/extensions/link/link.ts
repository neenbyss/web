import { Link as TiptapLink } from "@tiptap/extension-link"

/**
 * Enlaces. `openOnClick: false` para poder editar el enlace desde el bubble en
 * vez de navegar dentro del editor. `autolink`/`linkOnPaste` detectan URLs.
 */
export const Link = TiptapLink.configure({
  openOnClick: false,
  autolink: true,
  linkOnPaste: true,
  defaultProtocol: "https",
  HTMLAttributes: {
    rel: "noopener noreferrer nofollow",
    target: "_blank",
  },
})
