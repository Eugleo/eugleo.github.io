/* eslint-disable react/display-name */
import React from 'react';
import * as Icon from 'react-feather';

import { HomeworkLink } from '../Homework';
import { Stack } from '../Layout';
import { Lecture } from '../Lecture';
import { formatTimestampWithDay } from '../Utils';

export function LectureHeader({ lecture, path }: { lecture: Lecture; path: string }) {
  return (
    <div className="z-10 relative">
      <div className="bg-white rounded-lg shadow-xl mb-2 flex flex-row overflow-hidden">
        <div className="w-full">
          <h1 className="text-black text-2xl md:text-4xl font-bold px-8 py-6 text-center sm:text-left">
            {lecture.title}
          </h1>
          <Stack gap="gap-2" className="px-8 py-6 bg-gray-100 w-full">
            <div className="flex">
              <Icon.Calendar className="text-gray-500 w-5 h-5 mr-3" />
              <p className="text-sm text-gray-600">
                Odpřednášena {formatTimestampWithDay(lecture.timestamp)}
              </p>
            </div>

            {lecture.homeworks.length > 0 ? (
              <div className="flex">
                <Icon.AlertCircle className="text-gray-500 w-5 h-5 mr-3" />
                <p className="text-sm text-gray-600">
                  Byl zde zadán{' '}
                  {lecture.homeworks
                    .map<React.ReactNode>((hw) => (
                      <HomeworkLink
                        path={path}
                        key={hw.id}
                        number={hw.id}
                        className="hover:text-gray-700"
                      />
                    ))
                    .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
                    .slice(1)}
                </p>
              </div>
            ) : null}
          </Stack>
        </div>
      </div>
    </div>
  );
}
