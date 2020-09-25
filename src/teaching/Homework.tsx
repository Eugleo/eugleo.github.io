import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

export type Homework = {
  id: number;
  title: string;
  lectures: number[];
  points: number;
  due: number;
  timestamp: number;
};

export type HomeworkMeta = {
  title: string;
  lectures: number[];
  points: number;
  due: number;
  timestamp: number;
};

export function Homework({
  className,
  number,
  path,
}: {
  className?: string;
  number: number;
  path: string;
}) {
  return (
    <a className={c('font-medium', className)} href={`${path}/ukoly/${number}`}>
      #U{number}
    </a>
  );
}
