import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Homework } from './homework';

export type Lecture = {
  title: string;
  id: number;
  timestamp: number;
  homeworks: Homework[];
};

export type LectureMeta = {
  title: string;
  timestamp: number;
};

export function Lecture({ className, number }: { className?: string; number: number }) {
  const router = useRouter();
  return (
    <a className={c('font-medium', className)} href={`${router.asPath}/prednasky/${number}`}>
      #P{number}
    </a>
  );
}
