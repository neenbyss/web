import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { LinkExtension } from './extensions/link-extension';
import { TextStyleKit } from '@tiptap/extension-text-style';

export const extensions = [
  Underline,
  LinkExtension,
  TextStyleKit,
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: 'text',
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
];
