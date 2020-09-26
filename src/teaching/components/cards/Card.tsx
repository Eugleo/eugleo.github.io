import c from 'classnames';
import React from 'react';

import { colorToAccent } from '../DueStatus';

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-500 text-xs subtitle mb-2">{children}</p>;
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-black font-semibold">{children}</h2>;
}

export function TopArrow({ color }: { color: 'blue' | 'green' | 'gray' | 'orange' }) {
  return (
    <div
      style={{ borderBottomLeftRadius: '2rem' }}
      className={c(
        'absolute flex items-center justify-center w-8 h-8 top-0 right-0 text-white',
        colorToAccent(color),
      )}
    >
      <span className="-mt-1 -mr-1">→</span>
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs rounded-full py-1 px-4 text-center bg-blue-100 text-blue-500 mr-2">
      {children}
    </p>
  );
}

export function Card({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'blue' | 'orange' | 'green' | 'gray';
}) {
  return (
    <div className={c('rounded-lg overflow-hidden shadow-xs card z-0 relative w-full mb-6', color)}>
      {children}
      <style jsx>{`
        div:before {
          content: '';
          position: absolute;
          z-index: -1;
          top: -16px;
          right: -16px;
          height: 32px;
          width: 32px;
          border-radius: 32px;
          transform: scale(1);
          transform-origin: 50% 50%;
          transition: transform 0.25s ease-out;
        }

        @media (min-width: 800px) {
          div:hover:before {
            transform: scale(30);
          }
        }

        div:hover:before {
          transform: scale(50);
        }

        div:hover :global(h2) {
          transition: all 0.3s ease-out;
          color: #ffffff;
        }

        .blue:before {
          @apply bg-blue-500;
        }

        .blue:hover :global(.description) {
          transition: all 0.3s ease-out;
          @apply text-blue-200;
        }

        .blue:hover :global(.subtitle) {
          transition: all 0.3s ease-out;
          @apply text-blue-200;
        }

        .blue:hover :global(.note) {
          transition: all 0.3s ease-out;
          @apply text-blue-200;
        }

        .gray:before {
          @apply bg-gray-500;
        }

        .gray:hover :global(.description) {
          transition: all 0.3s ease-out;
          @apply text-gray-300;
        }

        .gray:hover :global(.subtitle) {
          transition: all 0.3s ease-out;
          @apply text-gray-200;
        }

        .gray:hover :global(.note) {
          transition: all 0.3s ease-out;
          @apply text-gray-200;
        }

        .green:before {
          @apply bg-green-500;
        }

        .green:hover :global(.description) {
          transition: all 0.3s ease-out;
          @apply text-green-300;
        }

        .green:hover :global(.subtitle) {
          transition: all 0.3s ease-out;
          @apply text-green-100;
        }

        .green:hover :global(.note) {
          transition: all 0.3s ease-out;
          @apply text-green-200;
        }

        .orange:before {
          @apply bg-orange-500;
        }

        .orange:hover :global(.description) {
          transition: all 0.3s ease-out;
          @apply text-orange-300;
        }

        .orange:hover :global(.subtitle) {
          transition: all 0.3s ease-out;
          @apply text-orange-100;
        }

        .orange:hover :global(.note) {
          transition: all 0.3s ease-out;
          @apply text-orange-200;
        }
      `}</style>
    </div>
  );
}
