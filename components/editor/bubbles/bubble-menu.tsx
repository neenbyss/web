"use client"

import { BubbleMenu } from "@tiptap/react/menus"
import { useTiptap } from "@tiptap/react"
import { TextSelection } from "@tiptap/pm/state"

import { styledSelectionKey } from "../extensions/selection/selection"
import { Bold } from "../toolbar/bold"
import { Italic } from "../toolbar/italic"
import { Underline } from "../toolbar/underline"
import { Strike } from "../toolbar/strike"
import { Code } from "../toolbar/code"
import { ColorMenu } from "../toolbar/color"
import { LinkButton } from "../toolbar/link"

/**
 * Menú flotante sobre la selección de texto (accesos rápidos de formato).
 * Se oculta en selecciones vacías, dentro de bloques de código y en nodos
 * atómicos (imagen, embed, archivo) que tienen su propia barra.
 */
export function EditorBubbleMenu() {
  const { editor } = useTiptap()

  if (!editor) return null

  // Acotamos flip/shift al área de contenido del editor (no al viewport): así,
  // cuando la selección está arriba, el menú NO se mete sobre el toolbar sino
  // que se voltea abajo, y en horizontal se desliza dentro del editor.
  const boundary = editor.view.dom as HTMLElement

  return (
    <BubbleMenu
      editor={editor}
      options={{
        placement: "top",
        offset: 8,
        flip: { boundary, padding: 8 },
        shift: { boundary, padding: 8 },
        // Anclado correctamente a selecciones que abarcan varias líneas.
        inline: true,
      }}
      shouldShow={({ editor, state, from, to }) => {
        // Solo en selección de TEXTO real: las selecciones de nodo (separador,
        // imagen, embed…) NO deben abrir el bubble de texto.
        if (!(state.selection instanceof TextSelection)) return false
        // Selección de BLOQUES (banda/marquee): es una selección de bloques, no
        // de texto → no mostramos el bubble.
        if (styledSelectionKey.getState(state)?.blockMode) return false
        // Con el cursor dentro de un enlace mostramos el bubble aunque no haya
        // selección (para editar/quitar el enlace desde aquí, unificado).
        if (from === to && !editor.isActive("link")) return false
        if (editor.isActive("codeBlock")) return false
        // La tabla tiene su propio bubble.
        if (editor.isActive("table")) return false
        return true
      }}
    >
      <div className="flex items-center gap-0.5 rounded-md border border-border bg-popover p-0.5 shadow-md">
        <Bold />
        <Italic />
        <Underline />
        <Strike />
        <Code />
        <LinkButton />
        <div className="mx-0.5 h-5 w-px bg-border" />
        <ColorMenu />
      </div>
    </BubbleMenu>
  )
}
