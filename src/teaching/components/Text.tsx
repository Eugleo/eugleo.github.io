import React from 'react';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-900">{children}</p>;
}
