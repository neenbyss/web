import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { useEditor } from '../provider';

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
    <div className='min-w-80 p-2'>
      <span className='text-foreground mb-3 block border-b pb-1.5 text-sm font-medium'>
        {' '}
        Crear Enlace{' '}
      </span>
      <form
        onClick={(e) => e.stopPropagation()}
        ref={formRef}
        onSubmit={handleSave}
        className='flex flex-col gap-2'
      >
        <Input
          label='Dirección URL'
          type='url'
          required
          placeholder='https://enlace.co'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='h-9'
        />
        <Input
          label='Texto'
          type='text'
          className='h-9'
          placeholder='Enlace'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className='flex justify-between gap-2'>
          <label className='flex items-center gap-2 text-xs'>
            <Switch checked={isNewTab} onCheckedChange={setIsNewTab} />
            Nueva Pestaña
          </label>
          <Button type='submit' size='xs'>
            Crear
          </Button>
        </div>
      </form>
    </div>
  );
}
