import * as React from 'react';
import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';
import { useEditor } from '../../provider';
import { TooltipBtn } from '../../toolbar/_tooltip';
import { EditIcon } from '../../icons/edit';
import { UnlinkIcon } from '../../icons/unlink';
import { Link } from '../../toolbar/link';
import { Separator } from '@/components/ui/separator';
import { ExternalLinkIcon } from '../../icons/external-link';

interface LinkAttributes {
  href: string;
  target: string;
}

export const LinkBubbleMenu = () => {
  const { editor } = useEditor();
  const ref = React.useRef<HTMLDivElement>(null);

  const [linkAttrs, setLinkAttrs] = React.useState<LinkAttributes>({ href: '', target: '' });

  const updateLinkState = React.useCallback(() => {
    const { href, target } = editor.getAttributes('link');

    setLinkAttrs({ href, target });
  }, [editor]);

  const shouldShow = React.useCallback(
    ({ editor, from, to }: { editor: Editor; from: number; to: number }) => {
      if (from === to) {
        return false;
      }
      const { href } = editor.getAttributes('link');

      if (href) {
        updateLinkState();
        return true;
      }
      return false;
    },
    [updateLinkState],
  );

  const onUnsetLink = React.useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }, [editor]);

  const handleOpenLink = React.useCallback(() => {
    const url = linkAttrs.href;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [linkAttrs.href]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: 'bottom',
        hideOnClick: 'toggle',
      }}
    >
      <div ref={ref} className='bg-content flex items-center gap-1 rounded-lg border p-1.5 shadow'>
        <Link container={ref.current} content='Editar Link'>
          <EditIcon />
        </Link>

        <TooltipBtn
          onClick={() => {
            onUnsetLink();
          }}
          content='Deshacer'
        >
          <UnlinkIcon />
        </TooltipBtn>

        <Separator className='mx-1 h-6' orientation='vertical' />

        <TooltipBtn
          onClick={() => {
            handleOpenLink();
          }}
          size='xs'
          content='Abrir en otra pestaña'
        >
          <ExternalLinkIcon />
          Abrir
        </TooltipBtn>
      </div>
    </BubbleMenu>
  );
};
