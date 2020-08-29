import React from 'react';
import c from 'classnames';
import { Homework } from './homework';
import { useRouter } from 'next/router';

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
