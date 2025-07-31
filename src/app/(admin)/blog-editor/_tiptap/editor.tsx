'use client';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import { EditorProvider } from './provider';
import { Toolbar } from './toolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { extensions } from './extensions';
import { BubbleMenu } from './bubble';
import { LinkBubbleMenu } from './bubble/link';

export function Editor() {
  const initEditor = useEditor({
    extensions: extensions as Extension[],
    immediatelyRender: false,
  });

  if (!initEditor) {
    return null;
  }

  return (
    <TooltipProvider>
      <EditorProvider editor={initEditor}>
        <div className='bg-content rounded-t-lg border p-1.5'>
          <Toolbar />
        </div>
        <div className=''>
          <EditorContent
            className='bg-content blog h-full rounded-b-lg border-x border-b p-2 [&_>_div]:min-h-40 [&_div]:outline-none'
            editor={initEditor}
          />
          <BubbleMenu />
          <LinkBubbleMenu />
        </div>
      </EditorProvider>
      <div className='bg-content mt-8 p-4'>{initEditor.getHTML()}</div>
    </TooltipProvider>
  );
}
