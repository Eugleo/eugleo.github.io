import c from 'classnames';
import React from 'react';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function Paragraph({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={c('text-gray-900', className)}>{children}</p>;
}

export function Link({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a
      className="border-b border-gray-500 hover:border-gray-900 bg-blue-100 px-1 hover:bg-blue-200"
      href={to}
    >
      {children}
    </a>
  );
}
