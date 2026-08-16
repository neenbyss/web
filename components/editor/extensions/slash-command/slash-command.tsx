import { Extension } from "@tiptap/core"
import type { Editor, Range } from "@tiptap/core"
import {
  Suggestion,
  SuggestionProps,
  type SuggestionKeyDownProps,
} from "@tiptap/suggestion"
import { ReactRenderer } from "@tiptap/react"
import {
  SlashCommandMenu,
  createSlashStore,
  type SlashCommandMenuHandle,
  type SlashStore,
} from "./slash-command-menu"
import type { JSX } from "react"
import {
  IconLetterT,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconList,
  IconListNumbers,
  IconListCheck,
  IconQuote,
  IconCode,
  IconSourceCode,
  IconSeparatorHorizontal,
  IconPhoto,
  IconMovie,
  IconPaperclip,
  IconTable,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
} from "@tabler/icons-react"

import { insertFilledTable } from "../nodes/table/insert-table"

export interface SlashCommandItem {
  title: string
  description: string
  icon?: JSX.Element
  /** Atajo/pista mostrado a la derecha (ej. "#", "##", ">"). */
  hint?: string
  searchTerms: string[]
  command: (props: { editor: Editor; range: Range }) => void
}

export interface SlashCommandCategory {
  type: string
  items: SlashCommandItem[]
}

export const SlashCommandItems: SlashCommandCategory[] = [
  {
    type: "Bloques básicos",
    items: [
      {
        title: "Texto",
        description: "Párrafo normal",
        icon: <IconLetterT />,
        searchTerms: ["paragraph", "texto", "normal", "parrafo"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setParagraph().run()
        },
      },
      {
        title: "Encabezado 1",
        description: "Título principal",
        icon: <IconH1 />,
        hint: "#",
        searchTerms: ["h1", "heading1", "titulo", "título"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run()
        },
      },
      {
        title: "Encabezado 2",
        description: "Subtítulo",
        icon: <IconH2 />,
        hint: "##",
        searchTerms: ["h2", "heading2", "subtitulo", "subtítulo"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run()
        },
      },
      {
        title: "Encabezado 3",
        description: "Sub-sección",
        icon: <IconH3 />,
        hint: "###",
        searchTerms: ["h3", "heading3", "subseccion", "subsección"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run()
        },
      },
      {
        title: "Encabezado 4",
        description: "Título menor",
        icon: <IconH4 />,
        hint: "####",
        searchTerms: ["h4", "heading4"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 4 }).run()
        },
      },
    ],
  },
  {
    type: "Listas",
    items: [
      {
        title: "Lista",
        description: "Lista con viñetas",
        icon: <IconList />,
        hint: "-",
        searchTerms: ["bullet", "lista", "viñetas", "viñeta"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        title: "Lista numerada",
        description: "Lista ordenada",
        icon: <IconListNumbers />,
        hint: "1.",
        searchTerms: ["ordered", "numbered", "numerada", "enumerar"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
      },
      {
        title: "Lista de tareas",
        description: "Checklist",
        icon: <IconListCheck />,
        hint: "[]",
        searchTerms: ["task", "todo", "checklist", "tareas"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run()
        },
      },
    ],
  },
  {
    type: "Bloques",
    items: [
      {
        title: "Cita",
        description: "Cita en bloque",
        icon: <IconQuote />,
        hint: ">",
        searchTerms: ["quote", "blockquote", "cita", "block"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run()
        },
      },
      {
        title: "Código",
        description: "Bloque de código",
        icon: <IconSourceCode />,
        hint: "```",
        searchTerms: ["code", "codigo", "código", "bloque", "snippet"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
        },
      },
      {
        title: "Código en línea",
        description: "Texto monoespaciado",
        icon: <IconCode />,
        hint: "`",
        searchTerms: ["inline code", "codigo en linea", "mono"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCode().run()
        },
      },
      {
        title: "Separador",
        description: "Línea horizontal",
        icon: <IconSeparatorHorizontal />,
        hint: "---",
        searchTerms: ["hr", "separador", "linea", "horizontal", "divider"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run()
        },
      },
    ],
  },
  {
    type: "Media",
    items: [
      {
        title: "Imagen",
        description: "Subir o elegir de la biblioteca",
        icon: <IconPhoto />,
        searchTerms: ["image", "imagen", "foto", "picture", "media"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertImageBlock().run()
        },
      },
      {
        title: "Embed",
        description: "YouTube, Vimeo o iframe",
        icon: <IconMovie />,
        searchTerms: ["embed", "iframe", "video", "youtube", "vimeo"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertEmbed().run()
        },
      },
      {
        title: "Archivo",
        description: "Adjuntar un archivo",
        icon: <IconPaperclip />,
        searchTerms: ["file", "archivo", "adjunto", "documento", "pdf"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertFileBlock().run()
        },
      },
      {
        title: "Tabla",
        description: "Insertar una tabla 3×3",
        icon: <IconTable />,
        searchTerms: ["table", "tabla", "cuadro", "grid"],
        command: ({ editor, range }) => {
          insertFilledTable(editor, 3, 3, range)
        },
      },
    ],
  },
  {
    type: "Alineación",
    items: [
      {
        title: "Alinear a la izquierda",
        description: "Texto a la izquierda",
        icon: <IconAlignLeft />,
        searchTerms: ["left", "izquierda", "alinear", "align"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setTextAlign("left").run()
        },
      },
      {
        title: "Centrar",
        description: "Texto centrado",
        icon: <IconAlignCenter />,
        searchTerms: ["center", "centro", "centrar", "align"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setTextAlign("center").run()
        },
      },
      {
        title: "Alinear a la derecha",
        description: "Texto a la derecha",
        icon: <IconAlignRight />,
        searchTerms: ["right", "derecha", "alinear", "align"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setTextAlign("right").run()
        },
      },
      {
        title: "Justificar",
        description: "Texto justificado",
        icon: <IconAlignJustified />,
        searchTerms: ["justify", "justificar", "alinear", "align"],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setTextAlign("justify").run()
        },
      },
    ],
  },
]

export const SlashCommand = Extension.create({
  name: "slashCommand",

  addProseMirrorPlugins() {
    return [
      // Añadimos <any> aquí para que TypeScript no se vuelva loco
      // al mezclar Categorías en el 'items' e Items en el 'command'
      Suggestion<SlashCommandCategory, SlashCommandItem>({
        editor: this.editor,
        char: "/",
        // Detección inteligente: solo dispara al inicio de un bloque o tras un
        // espacio; así "a/b", "http://" o "youtube.com/" NO abren el menú.
        startOfLine: false,
        allowSpaces: false,
        allowedPrefixes: [" "],
        // Nunca en código ni dentro de un enlace (las URLs llevan "/").
        allow: ({ editor }) => !editor.isActive("codeBlock") && !editor.isActive("link"),
        // Placeholder/resaltado acoplado a la detección REAL de la Suggestion:
        // envuelve "/query" en un pill; cuando está vacío muestra el placeholder
        // vía `data-decoration-content` (ver .slash-active en globals.css).
        decorationTag: "span",
        decorationClass: "slash-active",
        decorationEmptyClass: "slash-empty",
        decorationContent: "Escribe un comando…",
        items: ({ query }) => {
          if (query.length === 0) return SlashCommandItems

          const lowerQuery = query.toLowerCase()

          return SlashCommandItems.map((category) => ({
            ...category,
            items: category.items.filter((item) => {
              return (
                item.title.toLowerCase().includes(lowerQuery) ||
                item.searchTerms.some((term) => term.includes(lowerQuery))
              )
            }),
          })).filter((category) => category.items.length > 0)
        },
        command: ({ editor, range, props }) => {
          const commandItem = props as SlashCommandItem
          commandItem.command({ editor, range })
        },
        render: () => {
          let component: ReactRenderer<SlashCommandMenuHandle> | null = null
          let unmount: (() => void) | null = null
          let store: SlashStore | null = null

          const destroy = () => {
            unmount?.()
            unmount = null
            component?.destroy()
            component = null
            store = null
          }

          // Se monta UNA vez con un store externo; los updates solo actualizan el
          // store (useSyncExternalStore → re-render garantizado, sin re-montar).
          // La posición se mantiene porque la Suggestion re-consulta el nodo de
          // decoración en vivo.
          const mount = (
            props: SuggestionProps<SlashCommandCategory, SlashCommandItem>
          ) => {
            store = createSlashStore({ items: props.items, command: props.command })
            component = new ReactRenderer(SlashCommandMenu, {
              editor: props.editor,
              props: { store },
            })
            if (props.mount) {
              unmount = props.mount(component.element)
            }
          }

          return {
            onStart: (
              props: SuggestionProps<SlashCommandCategory, SlashCommandItem>
            ) => {
              // El dispatch inicial llega con items vacíos + loading; esperamos al resuelto.
              if ((props as { loading?: boolean }).loading) return
              mount(props)
            },
            onUpdate: (
              props: SuggestionProps<SlashCommandCategory, SlashCommandItem>
            ) => {
              if ((props as { loading?: boolean }).loading) return
              if (!store) mount(props)
              else store.set({ items: props.items, command: props.command })
            },
            onKeyDown: (props: SuggestionKeyDownProps) => {
              if (props.event.key === "Escape") {
                destroy()
                return true
              }
              return component?.ref?.onKeyDown(props) ?? false
            },
            onExit: () => destroy(),
          }
        },
      }),
    ]
  },
})
