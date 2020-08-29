import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

export type Homework = {
  id: number;
  title: string;
  type: 'bonus' | 'normal';
  lectures: number[];
  due: number;
  timestamp: number;
};

export type HomeworkMeta = {
  title: string;
  type: 'bonus' | 'normal';
  lectures: number[];
  due: number;
  timestamp: number;
};

export function Homework({ className, number }: { className?: string; number: number }) {
  const router = useRouter();
  return (
    <a className={c('font-medium', className)} href={`${router.asPath}/ukoly/${number}`}>
      #U{number}
    </a>
  );
}
