import c from 'classnames';
import React from 'react';

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
