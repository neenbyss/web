import type { Extensions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import { ListKeymap } from '@tiptap/extension-list-keymap'
import { SlashCommand } from '../extensions/slash-command'
import { TextColor } from '../extensions/marks/text-color'
import { TextBackground } from '../extensions/marks/text-background'
import { FontSize } from '../extensions/marks/font-size'
import { TextTransform } from '../extensions/marks/text-transform'
import { ImageBlock, InlineImage } from '../extensions/nodes/image'
import { Embed } from '../extensions/nodes/embed'
import { FileBlock } from '../extensions/nodes/file'
import { Link } from '../extensions/link/link'
import { StyledSelection } from '../extensions/selection/selection'
import { MarqueeSelection } from '../extensions/selection/marquee'
import { tableExtensions } from '../extensions/nodes/table'
import { HorizontalRule } from '../extensions/nodes/separator'

export const extensions: Extensions = [
    // Desactivamos el hr de StarterKit para usar nuestro separador seleccionable.
    StarterKit.configure({ horizontalRule: false }),
    Underline,
    TextStyle,
    Superscript,
    Subscript,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    ListKeymap,
    Placeholder.configure({
        // Placeholder distinto según el tipo de bloque donde está el cursor.
        placeholder: ({ node }) => {
            switch (node.type.name) {
                case 'heading':
                    return `Encabezado ${node.attrs.level}`
                case 'blockquote':
                    return 'Escribe una cita…'
                case 'codeBlock':
                    return ''
                case 'paragraph':
                    return 'Escribe "/" para comandos…'
                default:
                    return 'Escribe algo…'
            }
        },
    }),
    SlashCommand,
    TextColor,
    TextBackground,
    FontSize,
    TextTransform,
    ImageBlock,
    InlineImage,
    Embed,
    FileBlock,
    Link,
    StyledSelection,
    MarqueeSelection,
    HorizontalRule,
    ...tableExtensions,
]

export type Level = 1 | 2 | 3 | 4 | 5 | 6;
export const levels : Level[] = [1, 2, 3];

export type Align = 'left' | 'center' | 'right' | 'justify';
export const aligns: Align[] = ['left', 'center', 'right', 'justify'];
