import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Homework } from './Homework';

export type Lecture = {
  title: string;
  description: string;
  id: number;
  timestamp: number;
  homeworks: Homework[];
};

export type LectureMeta = {
  title: string;
  description: string;
  timestamp: number;
};

export function LectureLink({
  path,
  className,
  number,
}: {
  path: string;
  className?: string;
  number: number;
}) {
  return (
    <a className={c('font-medium', className)} href={`${path}/prednasky/${number}`}>
      #P{number}
    </a>
  );
}
