import React from 'react';
import Prism, { defaultProps, Language } from 'prism-react-renderer';

export default function Highlight({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  const language = className.replace(/language-/, '');
  return (
    <Prism {...defaultProps} code={children} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Prism>
  );
}
