import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { LinkExtension } from './extensions/link-extension';

export const extensions = [
  Underline,
  LinkExtension,
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: 'text',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'bg-muted rounded px-1 py-px',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-4',
      },
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        class: '__heading',
      },
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    // Use a placeholder:
    placeholder: '¿En que estás pensando?...',
    // Use different placeholders depending on the node type:
    // placeholder: ({ node }) => {
    //   if (node.type.name === 'heading') {
    //     return 'What’s the title?'
    //   }

    //   return 'Can you add some further context?'
    // },
  }),
];
