/* eslint-disable react/display-name */
import React from 'react';
import * as Icon from 'react-feather';

export function Navigation({ to, title }: { to: string; title: string }) {
  return (
    <nav>
      <a
        href={to}
        className="flex flex-row items-center mb-4 text-blue-600 font-medium uppercase text-xs hover:underline"
      >
        <Icon.ChevronLeft className="mr-2 text-blue-600 w-4 h-4" /> {title}
      </a>
    </nav>
  );
}
