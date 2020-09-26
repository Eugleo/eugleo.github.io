import c from 'classnames';
import React from 'react';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 flex flex-col items-center">
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
