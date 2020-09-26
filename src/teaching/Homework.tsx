import c from 'classnames';
import React from 'react';

export type Homework = {
  id: number;
  title: string;
  description: string;
  lectures: number[];
  points: number;
  due: number;
  timestamp: number;
};

export type HomeworkMeta = {
  title: string;
  description: string;
  lectures: number[];
  points: number;
  due: number;
  timestamp: number;
};

export function HomeworkLink({
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
