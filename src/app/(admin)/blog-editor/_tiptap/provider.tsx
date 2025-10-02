'use client';

import { useEditorState, type Editor } from '@tiptap/react';
import React from 'react';

export interface ContextProps extends ReturnType<typeof EditorState> {
  editor: Editor;
}

export const EditorContext = React.createContext<ContextProps | null>(null);

interface EditorProviderProps {
  editor: Editor;
  children: React.ReactNode;
}

const EditorState = (editor: Editor) => {
  const editor_state = useEditorState({
    editor,
    selector(ctx) {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: !ctx.editor.can().chain().toggleBold().run(),
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: !ctx.editor.can().chain().toggleItalic().run(),
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: !ctx.editor.can().chain().toggleStrike().run(),
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: !ctx.editor.can().chain().toggleCode().run(),
        canClearMarks: !ctx.editor.can().chain().unsetAllMarks().run(),

        canTextAlign: (align: 'left' | 'center' | 'right' | 'justify') =>
          !ctx.editor.can().chain().toggleTextAlign(align).run(),
        isTextAlign: (align: 'left' | 'center' | 'right' | 'justify') =>
          ctx.editor.isActive({ textAlign: align }),
        activeTextAlign: (['left', 'center', 'right', 'justify'] as const).find((x) =>
          ctx.editor.isActive({ textAlign: x }),
        ),

        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeadingActive: (level: 1 | 2 | 3 | 4 | 5 | 6) =>
          ctx.editor.isActive('heading', { level }) ?? false,
        activeHeading: [1, 2, 3, 4, 5, 6].find((level) =>
          ctx.editor.isActive('heading', { level }),
        ),
        canHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) =>
          !editor?.can().chain().focus().toggleHeading({ level: level }).run(),

        canOrderedList: !ctx.editor?.can().chain().focus().toggleOrderedList().run(),
        canBulletList: !ctx.editor?.can().chain().focus().toggleBulletList().run(),
        activeList: (['bulletList', 'orderedList'] as const).find((x) => ctx.editor.isActive(x)),
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,

        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canBlockquote: !ctx.editor?.can().chain().focus().toggleBlockquote().run(),

        canUndo: !ctx.editor.can().chain().undo().run(),
        canRedo: !ctx.editor.can().chain().redo().run(),

        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: !ctx.editor.can().chain().toggleUnderline().run(),
      };
    },
  });
  return editor_state;
};

export const EditorProvider = (props: EditorProviderProps) => {
  const editor_state = EditorState(props.editor);

  return (
    <EditorContext.Provider value={{ editor: props.editor, ...editor_state }}>
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = React.useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within a editorProvider');
  }

  return context;
};
