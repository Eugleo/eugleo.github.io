import c from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import * as Icon from 'react-feather';

import { Homework } from './homework';
import { Stack } from './layout';
import { Lecture } from './lecture';
import { Test } from './test';
import { formatTimestamp, formatTimestampWithDay } from './utils';

export function HeaderBackgroundImage({ imagePath }: { imagePath: string }) {
  return (
    <div className="overflow-hidden lg:h-xl h-64 z-0">
      <style jsx>
        {`
          @media (min-width: 640px) {
            .blur-big::before {
              content: '';
              position: absolute;
              z-index: 2;
              width: 100%;
              height: 100%;
              -webkit-backdrop-filter: blur(15px); /* apply the blur */
              backdrop-filter: blur(15px); /* apply the blur */
              pointer-events: none; /* make the pseudo class click-through */
            }
          }
        `}
      </style>

      <div
        className="overflow-hidden blur-big w-full h-full transform scale-105 bg-center bg-cover relative"
        style={{ backgroundImage: `url(${imagePath})` }}
      />
    </div>
  );
}

function DescriptionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row">{children}</div>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 text-sm mb-2">{children}</p>;
}

export function Header({
  title,
  tests,
  homeworks,
  nextLectureDate,
  imagePath,
  lastChanged,
}: {
  title: string;
  tests: Test[];
  homeworks: Homework[];
  nextLectureDate: Date;
  imagePath: string;
  lastChanged: Date;
}) {
  return (
    <div className="mb-10 z-10 relative">
      <div className="bg-white rounded-lg shadow-xl mb-2 -mt-16 flex flex-row overflow-hidden">
        <div
          style={{ backgroundImage: `url(${imagePath})` }}
          className="hidden sm:block w-2/3 bg-cover bg-right"
        />
        <div className="w-full">
          <h1 className="text-black text-4xl font-bold px-8 py-6 text-center sm:text-left">
            {title}
          </h1>
          <Stack gap="gap-2" className="px-8 py-6 bg-gray-100 w-full">
            <Lectures nextLectureDate={nextLectureDate} />
            <Homeworks homeworks={homeworks} />
            <Tests tests={tests} />
          </Stack>
        </div>
      </div>
      <p className="text-xs w-full text-gray-600 text-right">
        naposledy upraveno {formatTimestampWithDay(lastChanged.valueOf())}
      </p>
    </div>
  );
}

function Homeworks({ homeworks }: { homeworks: Homework[] }) {
  const day = 1000 * 60 * 60 * 24;
  const futureHomeworks = homeworks.filter((hw) => hw.due + day >= Date.now());
  return (
    <DescriptionWrapper>
      <Icon.Home className="w-5 h-5 mr-3 text-gray-500" />
      {futureHomeworks.length === 0 ? (
        <Description>Žádné úkoly nejsou zadány</Description>
      ) : (
        <Description>
          Blíží se odevzdání úkolů{' '}
          {futureHomeworks
            .map<React.ReactNode>((hw) => (
              <Homework key={hw.id} number={hw.id} className="hover:text-gray-700" />
            ))
            .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
            .slice(1)}
        </Description>
      )}
    </DescriptionWrapper>
  );
}

function Tests({ tests }: { tests: Test[] }) {
  const day = 1000 * 60 * 60 * 24;
  const futureTests = tests.filter((t) => t.timestamp + day >= Date.now());
  return (
    <DescriptionWrapper>
      <Icon.FileText className="w-5 h-5 mr-3 text-gray-500" />
      {futureTests.length === 0 ? (
        <Description>Žádný test není ohlášen</Description>
      ) : (
        <Description>
          Čekají nás testy{' '}
          {futureTests
            .map((t) => formatTimestamp(t.timestamp))
            .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
            .slice(1)}
        </Description>
      )}
    </DescriptionWrapper>
  );
}

function Lectures({ nextLectureDate }: { nextLectureDate: Date }) {
  return (
    <DescriptionWrapper>
      <Icon.Calendar className="w-5 h-5 mr-3 text-gray-500" />
      <Description>
        Další přednáška bude {formatTimestampWithDay(nextLectureDate.valueOf())}
      </Description>
    </DescriptionWrapper>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-900">{children}</p>;
}

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

export function HomeworkBox({ homework }: { lectureNum: number; homework: Homework }) {
  const router = useRouter();
  return (
    <div className="rounded-lg shadow-xs overflow-hidden">
      <div className="flex flex-row items-center bg-white p-4">
        <div className="flex-grow">
          <p className="text-gray-500 text-xs mb-1">
            <Homework number={homework.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(homework.timestamp)}
          </p>
          <a
            className="text-black font-semibold hover:text-blue-700"
            href={`${router.asPath}/ukoly/${homework.id}`}
          >
            {homework.type === 'bonus' ? 'Bonus: ' : ''}
            {homework.title}
          </a>
        </div>
        <DueDatePill due={homework.due} />
      </div>
      <div className="p-4 bg-gray-100 text-gray-600 text-xs">
        Vychází z{' '}
        {homework.lectures
          .map((n) => <Lecture key={n} number={n} className="hover:text-gray-700" />)
          .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
          .slice(1)}
      </div>
    </div>
  );
}

export function LectureBox({ lecture }: { lecture: Lecture }) {
  const router = useRouter();
  return (
    <div className="rounded-lg shadow-xs overflow-hidden">
      <div className="flex flex-row items-center bg-white p-4">
        <div className="flex-grow">
          <p className="text-gray-500 text-xs mb-1">
            <Lecture number={lecture.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(lecture.timestamp)}
          </p>
          <a
            className="text-black font-semibold hover:text-blue-700"
            href={`${router.asPath}/prednasky/${lecture.id}`}
          >
            {lecture.title}
          </a>
        </div>
      </div>
      <div className="p-4 bg-gray-100 text-gray-600 text-xs">
        {lecture.homeworks.length === 1 ? 'Byl zde zadán ' : 'Byly zde zadány '}
        {lecture.homeworks
          .map(({ id }) => <Homework key={id} number={id} className="hover:text-gray-700" />)
          .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
          .slice(1)}
      </div>
    </div>
  );
}
