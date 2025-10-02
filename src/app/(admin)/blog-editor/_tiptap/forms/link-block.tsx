import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { useEditor } from '../provider';
import { ExternalIcon } from '@/icons/external';
import { Separator } from '@/components/ui/separator';
import { EnterIcon } from '../icons/enter';
import { TooltipBtn } from '../toolbar/_tooltip';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@/icons/chevron-down';

type Props = {
  onSave?: () => void;
};
export function LinkBlock({ onSave }: Props) {
  const { editor } = useEditor();

  const { from, to } = editor.state.selection;
  const { href, target } = editor.getAttributes('link');
  const def_text = editor.state.doc.textBetween(from, to, ' ');

  const formRef = React.useRef<HTMLFormElement>(null);
  const [url, setUrl] = React.useState(href || '');
  const [text, setText] = React.useState(def_text || '');
  const [isNewTab, setIsNewTab] = React.useState(target === '_blank' || false);

  const [show, setShow] = React.useState(false);

  const onSetLink = React.useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: openInNewTab ? '_blank' : '',
              },
            },
          ],
        })
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run();
    },
    [editor],
  );

  const handleSave = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (formRef.current) {
        const isValid = Array.from(formRef.current.querySelectorAll('input')).every((input) =>
          input.checkValidity(),
        );

        if (isValid) {
          onSetLink(url, text, isNewTab);
        } else {
          formRef.current.querySelectorAll('input').forEach((input) => {
            if (!input.checkValidity()) {
              input.reportValidity();
            }
          });
        }
        onSave?.();
      }
    },
    [onSave, onSetLink, url, text, isNewTab],
  );
  return (
    <div className='min-w-80'>
      <form
        onClick={(e) => e.stopPropagation()}
        ref={formRef}
        onSubmit={handleSave}
        className='flex flex-col gap-1'
      >
        <div className='flex items-center'>
          <Button
            onClick={() => setShow(!show)}
            size='icon_xs'
            className='hover:bg-foreground/5 bg-transparent px-0'
          >
            <ChevronDownIcon className={cn('size-3', show && '-rotate-90')} />
          </Button>
          <input
            placeholder='https://enlace.com'
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='hover:bg-foreground/[.03] focus:bg-foreground/[.03] h-8.5 w-full rounded-md px-2 outline-0 transition'
          />
          <TooltipBtn
            size='icon_sm'
            onClick={() => {
              setIsNewTab(!isNewTab);
            }}
            className={cn(
              'ml-1 size-8 shrink-0',
              isNewTab ? 'bg-primary/80 hover:bg-primary' : 'hover:bg-primary/10 bg-transparent',
            )}
            content='Nueva Pestaña'
          >
            <ExternalIcon />
          </TooltipBtn>
          <Separator orientation='vertical' className='mx-1 h-6' />
          <TooltipBtn
            type='submit'
            size='icon_sm'
            variant={isNewTab ? 'primary' : 'light'}
            className='shrink-0'
            content='Insertar Enlace'
          >
            <EnterIcon />
          </TooltipBtn>
        </div>
        {show && (
          <input
            placeholder='Texto de enlace'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='hover:bg-foreground/[.03] focus:bg-foreground/[.03] h-8 w-full rounded-md px-2 outline-0 transition'
          />
        )}
      </form>
    </div>
  );
}
