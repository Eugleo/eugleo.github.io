import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Homework, HomeworkLink } from '../Homework';
import { Lecture, LectureLink } from '../Lecture';
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

type DueStatus = 'Far' | 'Near' | 'Passed';

function getDueStatus(due: number): DueStatus {
  const dayDiff = Math.ceil((due - Date.now()) / (1000 * 60 * 60 * 24));
  if (dayDiff < 0) {
    return 'Passed';
  } else if (dayDiff <= 3) {
    return 'Near';
  } else {
    return 'Far';
  }
}

export function HomeworkBox({ homework }: { homework: Homework }) {
  const router = useRouter();
  const path = router.asPath;

  const status = getDueStatus(homework.due);
  let accent;
  if (status === 'Passed') {
    accent = 'border-gray-500';
  } else if (status === 'Near') {
    accent = 'border-orange-500';
  } else if (status === 'Far') {
    accent = 'border-green-500';
  }

  return (
    <div className={c('rounded-sm border-t-4 overflow-hidden shadow-xs', accent)}>
      <div className="flex flex-row items-center bg-white p-4">
        <div className="flex-grow">
          <p className="text-gray-500 text-xs mb-1">
            <HomeworkLink path={path} number={homework.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(homework.timestamp)}
          </p>
          <a
            className="text-black font-semibold hover:text-blue-700"
            href={`${path}/ukoly/${homework.id}`}
          >
            {homework.title}
            {homework.points > 0 ? (
              <span className="ml-2 text-gray-400">({homework.points} b.)</span>
            ) : null}
          </a>
        </div>

        <DueDatePill due={homework.due} />
      </div>
      <div className="p-4 bg-gray-100 text-gray-600 text-xs">
        <p>{homework.description}</p>
        <HomeworkLectures lectures={homework.lectures} path={router.asPath} />
      </div>
    </div>
  );
}

function HomeworkLectures({ path, lectures }: { path: string; lectures: number[] }) {
  return lectures.length > 0 ? (
    <div className="mt-2">
      Vychází z{' '}
      {lectures
        .map((n) => <LectureLink key={n} path={path} number={n} className="hover:text-gray-700" />)
        .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
        .slice(1)}
    </div>
  ) : null;
}

export function LectureBox({ lecture }: { lecture: Lecture }) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <div className="rounded-sm border-t-4 border-blue-500 overflow-hidden shadow-xs">
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-1">
          <LectureLink path={path} number={lecture.id} className="hover:text-gray-600" /> ze dne{' '}
          {formatTimestamp(lecture.timestamp)}
        </p>
        <a
          className="text-black font-semibold hover:text-blue-700"
          href={`${path}/prednasky/${lecture.id}`}
        >
          {lecture.title}
        </a>
      </div>

      <div className="p-4 bg-gray-100 text-gray-600 text-xs">
        <p>{lecture.description}</p>
        <LectureHomeworks homeworks={lecture.homeworks} path={path} />
      </div>
    </div>
  );
}

function LectureHomeworks({ homeworks, path }: { homeworks: Homework[]; path: string }) {
  const homeworkComponents = homeworks
    .map(({ id }) => (
      <HomeworkLink path={path} key={id} number={id} className="hover:text-gray-700" />
    ))
    .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
    .slice(1);

  switch (homeworks.length) {
    case 0:
      return null;
    case 1:
      return (
        <div className="flex flex-row mt-2">
          <p>Byl zde zadán {homeworkComponents}</p>
        </div>
      );
    default:
      return (
        <div className="flex flex-row mt-2">
          <p>Byly zde zadány {homeworkComponents}</p>
        </div>
      );
  }
}
