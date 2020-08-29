import React from 'react';
import c from 'classnames';

export function Stack({
  className,
  children,
  gap,
  vertical = true,
}: {
  className?: string;
  children: React.ReactNode;
  gap: string;
  vertical?: boolean;
}) {
  return (
    <div className={c('grid', vertical ? 'grid-flow-row' : 'grid-flow-col', gap, className)}>
      {children}
    </div>
  );
}
