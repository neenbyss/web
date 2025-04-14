/** 
'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CheckIcon } from '@/icons/check';
import { CopyIcon } from '@/icons/copy';
import { cn } from '@/lib/utils';

function extractText(node: any): string {
  // Si el nodo es texto plano, devuélvelo directamente
  if (typeof node === 'string') {
    return node;
  }

  // Si el nodo es un objeto o un array, recórrelo y concatena los resultados
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }

  if (node && typeof node === 'object' && 'props' in node) {
    return extractText(node.props.children);
  }

  return ''; // Devuelve vacío si no es manejable
}

type CodeBlockProps = {
  highlightlines?: number[];
} & React.HTMLAttributes<HTMLElement> &
  CodeBlockComponentProps;
export const CodeBlock = (props: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(props.className || '');

  const code = extractText(props.children); // Extrae el texto de los nodos

  return match ? (
    <CodeBlockComponent
      code={code.trim()}
      filename={props.filename}
      highlightLines={props.highlightlines}
      language={match[1]}
      tabs={props.tabs}
    />
  ) : (
    <code className={cn(props.className, 'bg-primary/30 px-2 py-0.5')} {...props} />
  );
};

type CodeBlockComponentProps = {
  language?: string;
  filename?: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs?: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

const CodeBlockComponent = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockComponentProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist ? tabs[activeTab].language || language : language;
  const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines;

  return (
    <div className='relative w-full font-mono text-sm'>
      <div className='flex flex-col gap-2'>
        {tabsExist && (
          <div className='flex overflow-x-auto'>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 !py-2 font-sans text-xs transition-colors ${
                  activeTab === index ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className='flex items-center justify-between py-2'>
            <div className='text-xs text-zinc-400'>{filename}</div>
            <button
              onClick={copyToClipboard}
              className='flex items-center gap-1 font-sans text-xs text-zinc-400 transition-colors hover:text-zinc-200'
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: 0,
          background: 'transparent',
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? 'hsl(var(--heroui-primary) /.2)'
              : 'transparent',
            display: 'block',
            width: '100%',
          },
        })}
        PreTag='div'
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  );
};
*/
