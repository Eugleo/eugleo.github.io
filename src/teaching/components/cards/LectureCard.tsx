import { useRouter } from 'next/router';
import React from 'react';

import { HomeworkLink } from '../../Homework';
import { Lecture, LectureLink } from '../../Lecture';
import { formatTimestamp } from '../../Utils';
import { Card, Pill, Subtitle, Title, TopArrow } from './Card';

export function LectureCard({ lecture }: { lecture: Lecture }) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <a href={`${path}/prednasky/${lecture.id}`} className="w-full">
      <Card color="blue">
        <TopArrow color="blue" />
        <div className="p-4">
          <Subtitle>
            <LectureLink path={path} number={lecture.id} className="hover:text-gray-600" /> ze dne{' '}
            {formatTimestamp(lecture.timestamp)}
          </Subtitle>
          <Title>{lecture.title}</Title>
          {lecture.homeworks.length > 0 ? (
            <div className="flex flex-row mt-6">
              {lecture.homeworks.map((hw) => (
                <Pill key={hw.id}>
                  <HomeworkLink
                    path={path}
                    key={hw.id}
                    number={hw.id}
                    className="hover:text-gray-700"
                  />
                </Pill>
              ))}
            </div>
          ) : null}
        </div>
        <div
          style={{ background: 'rgba(50, 50, 100, 0.06)' }}
          className="p-4 text-gray-600 text-xs"
        >
          <p className="description">{lecture.description}</p>
        </div>
      </Card>
    </a>
  );
}
