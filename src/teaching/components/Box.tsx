import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Homework } from '../Homework';
import { LectureLink } from '../Lecture';
import { formatTimestamp } from '../Utils';

function DueDatePill({ due }: { due: number }) {
  const dayDiff = Math.ceil((due - Date.now()) / (1000 * 60 * 60 * 24));

  let classes;
  if (dayDiff < 0) {
    classes = 'bg-gray-200 text-gray-500';
  } else if (dayDiff <= 3) {
    classes = 'bg-orange-200 text-orange-500';
  } else {
    classes = 'bg-green-200 text-green-500';
  }

  return (
    <p className={c('text-sm rounded-full py-1 px-4 text-center', classes)}>
      {formatTimestamp(due)}
    </p>
  );
}

function PointsPill({ points }: { points: number }) {
  let word;
  if (points == 1) {
    word = 'bod';
  } else if (points <= 4) {
    word = 'body';
  } else {
    word = 'bodů';
  }

  return (
    <p className="text-sm rounded-full py-1 px-4 text-center bg-blue-100 text-blue-500 mr-2">{`${points} ${word}`}</p>
  );
}

export function HomeworkBox({ homework }: { homework: Homework }) {
  const router = useRouter();
  const path = router.asPath;
  return (
    <div className="rounded-lg shadow-xs overflow-hidden">
      <div className="flex flex-row items-center bg-white p-4">
        <div className="flex-grow">
          <p className="text-gray-500 text-xs mb-1">
            <Homework path={path} number={homework.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(homework.timestamp)}
          </p>
          <a
            className="text-black font-semibold hover:text-blue-700"
            href={`${path}/ukoly/${homework.id}`}
          >
            {homework.title}
          </a>
        </div>
        {homework.points > 0 ? <PointsPill points={homework.points} /> : null}
        <DueDatePill due={homework.due} />
      </div>
      <div className="p-4 bg-gray-100 text-gray-600 text-xs">
        Vychází z{' '}
        {homework.lectures
          .map((n) => <LectureLink key={n} number={n} className="hover:text-gray-700" />)
          .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
          .slice(1)}
      </div>
    </div>
  );
}

export function LectureBox({ lecture }: { lecture: Lecture }) {
  const router = useRouter();
  const path = router.asPath;
  return (
    <div className="rounded-lg shadow-xs overflow-hidden">
      <div className="flex flex-row items-center bg-white p-4">
        <div className="flex-grow">
          <p className="text-gray-500 text-xs mb-1">
            <LectureLink number={lecture.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(lecture.timestamp)}
          </p>
          <a
            className="text-black font-semibold hover:text-blue-700"
            href={`${path}/prednasky/${lecture.id}`}
          >
            {lecture.title}
          </a>
        </div>
      </div>

      {lecture.homeworks.length > 0 ? (
        <div className="p-4 bg-gray-100 text-gray-600 text-xs">
          {lecture.homeworks.length === 1 ? 'Byl zde zadán ' : 'Byly zde zadány '}
          {lecture.homeworks
            .map(({ id }) => (
              <Homework path={path} key={id} number={id} className="hover:text-gray-700" />
            ))
            .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
            .slice(1)}
        </div>
      ) : null}
    </div>
  );
}
