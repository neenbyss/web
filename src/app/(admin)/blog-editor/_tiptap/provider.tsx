'use client';

import type { Editor } from '@tiptap/react';
import React from 'react';

export interface ContextProps {
  editor: Editor;
}

export const EditorContext = React.createContext<ContextProps | null>(null);

interface EditorProviderProps {
  editor: Editor;
  children: React.ReactNode;
}

export const EditorProvider = ({ editor, children }: EditorProviderProps) => {
  return <EditorContext.Provider value={{ editor }}>{children}</EditorContext.Provider>;
};

export const useEditor = () => {
  const context = React.useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within a editorProvider');
  }

  return context;
};
