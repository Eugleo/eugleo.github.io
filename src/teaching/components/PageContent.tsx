/* eslint-disable react/display-name */
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider
      components={{
        p: (props) => <p className="text-gray-900 mb-4" {...props} />,
        h2: (props) => <h2 className="font-bold text-lg md:text-2xl mt-8 mb-4" {...props} />,
        h3: (props) => <h3 className="font-bold md:text-lg mt-6 mb-4" {...props} />,
        ol: (props) => <ol className="list-decimal list-outside pl-10" {...props} />,
        ul: (props) => <ul className="list-disc list-outside pl-10" {...props} />,
        li: (props) => <li className="mb-2" {...props} />,
        inlineCode: (props) => <code className="text-sm bg-green-100 px-1 rounded-sm" {...props} />,
        a: (props) => (
          <a
            className="border-b border-gray-500 hover:border-gray-900 bg-blue-100 px-1 hover:bg-blue-200"
            {...props}
          />
        ),
        code: (props) => {
          const language = props.className?.replace(/language-/, '');
          return (
            <SyntaxHighlighter
              wrapLines={true}
              customStyle={{ padding: '@apply px-12', background: '@apply bg-gray-100' }}
              className="rounded-lg shadow-xs mb-4 mt-4 px-4 py-2 bg-gray-100"
              codeTagProps={{
                className: 'text-sm',
              }}
              language={language ?? 'text'}
            >
              {props.children.slice(0, -1)}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {children}
    </MDXProvider>
  );
}
