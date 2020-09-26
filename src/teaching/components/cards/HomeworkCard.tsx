import { useRouter } from 'next/router';
import React from 'react';

import { Homework, HomeworkLink } from '../../Homework';
import { LectureLink } from '../../Lecture';
import { formatTimestamp } from '../../Utils';
import { getDueStatusStyle } from '../DueStatus';
import { Card, Pill, Subtitle, Title, TopArrow } from './Card';

export function HomeworkCard({ homework }: { homework: Homework }) {
  const router = useRouter();
  const path = router.asPath;
  const accent = getDueStatusStyle(homework.due);

  return (
    <a href={`${path}/ukoly/${homework.id}`} className="w-full">
      <Card color={accent}>
        <TopArrow color={accent} />
        <div className="p-4">
          <Subtitle>
            <HomeworkLink path={path} number={homework.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(homework.timestamp)} k odevzdání do {formatTimestamp(homework.due)}
          </Subtitle>
          <Title>
            {homework.title}
            {homework.points > 0 ? (
              <span className="note ml-2 text-gray-400">({homework.points} b.)</span>
            ) : null}
          </Title>
          {homework.lectures.length > 0 ? (
            <div className="flex flex-row mt-6">
              {homework.lectures.map((l) => (
                <Pill key={l}>
                  <LectureLink path={path} number={l} className="hover:text-gray-700" />
                </Pill>
              ))}
            </div>
          ) : null}
        </div>
        <div
          style={{ background: 'rgba(50, 50, 100, 0.06)' }}
          className="p-4 text-gray-600 text-xs"
        >
          <p className="description">{homework.description}</p>
        </div>
      </Card>
    </a>
  );
}
