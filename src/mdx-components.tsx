import type { MDXComponents } from 'mdx/types';
//import { CodeBlock } from './components/ui/code-block';

export const Components: MDXComponents = {
  h1: (props) => <h1 {...props} className='my-4 block text-4xl font-medium' />,
  h2: (props) => <h2 {...props} className='mt-8 mb-2 block text-2xl font-medium' />,
  h3: (props) => <h3 {...props} className='my-1 mt-4 block text-lg font-medium' />,
  h4: (props) => <h4 {...props} className='my-1 mt-2 block font-medium' />,
  h5: (props) => <h4 {...props} className='my-1 block' />,
  h6: (props) => <h4 {...props} className='my-1 block' />,
  p: (props) => <p {...props} className='py-1 leading-5 font-light' />,
  strong: (props) => <strong {...props} className='text-foreground font-medium' />,
  ul: (props) => <ul {...props} className='ms-4 block list-inside list-disc space-y-2' />,
  ol: (props) => <ol {...props} className='ms-4 block list-inside list-decimal space-y-2' />,
  li: (props) => <li {...props} />,
  a: (props) => (
    <a className='text-primary font-medium hover:underline' target='_blank' {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className='border-ring bg-foreground/[.05] my-1.5 border-l-4 py-1.5 pl-4 font-light italic [&_p]:!py-0'
    />
  ),
  code: (props) => <code {...props} className='bg-primary/30 px-2 py-0.5' />,
  pre: ({
    children,
    filename,
    highlightlines,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & { filename?: string; highlightlines?: number[] }) => {
    if (children) {
      return (
        <pre className='bg-foreground-2/5 overflow-auto p-4 [&_code]:!bg-transparent [&_code]:!px-0 [&_code]:!py-0'>
          {children}
          {/** 
          <CodeBlock
            {...(children as any).props}
            filename={filename}
            highlightlines={highlightlines}
          >
            {children}
          </CodeBlock>
          */}
        </pre>
      );
    }
    return (
      <pre
        {...props}
        className='overflow-auto [&_code]:!bg-transparent [&_code]:!px-0 [&_code]:!py-0'
      />
    );
  },
  sup: (props: React.HTMLAttributes<HTMLElement>) => <sup {...props} className='px-2' />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className='my-1.5 max-w-full overflow-auto'>
      <table {...props} className='bg-background w-full max-w-full overflow-hidden rounded-md' />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLElement>) => <thead {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLElement>) => (
    <tbody
      className='divide-border bg-background [&_tr:nth-child(even)]:bg-foreground/[.05] divide-y'
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className='bg-primary/[.2] text-foreground px-4 py-2 text-start font-medium' {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className='text-foreground-2 px-4 py-2 text-sm whitespace-nowrap' {...props} />
  ),
  hr: () => <div className='bg-border my-4 h-px w-full' />,
  img: ({ alt, title, ...rest }) => {
    // Prioridad: alt explícito del autor > title del MDX > alt vacío (decorativo).
    // El default anterior ('IMAGE') acababa indexado por Google como texto alt
    // de todas las imágenes sin alt, contaminando Google Images.
    const resolvedAlt = alt ?? title ?? '';
    return title ? (
      <>
        <span className='border-foreground mb-4 block border-l-4 pl-2 text-lg'>{title}</span>
        <img alt={resolvedAlt} sizes='100vw' className='h-auto w-full rounded-md' {...rest} />
      </>
    ) : (
      <img alt={resolvedAlt} sizes='100vw' className='my-2 h-auto w-full rounded-md' {...rest} />
    );
  },
};
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...Components, ...components };
}
