/* eslint-disable react/display-name */
import c from 'classnames';
import React from 'react';
import * as Icon from 'react-feather';

import { Homework } from '../Homework';
import { Stack } from '../Layout';
import { formatTimestampWithDay } from '../Utils';

export function HomeworkHeader({ homework }: { homework: Homework }) {
  return (
    <div className="z-10 relative">
      <div className="bg-white rounded-lg shadow-xl mb-2 flex flex-row overflow-hidden">
        <div className="w-full">
          <h1 className="text-black text-xl md:text-4xl font-bold px-8 py-6 text-center sm:text-left">
            {homework.title}
          </h1>
          <Stack gap="gap-2" className="px-8 py-6 bg-gray-100 w-full">
            <div className="flex">
              <Icon.Calendar className="text-gray-500 w-5 h-5 mr-3" />
              <p className="text-sm text-gray-600">
                Zadáno {formatTimestampWithDay(homework.timestamp)}
              </p>
            </div>

            <div className="flex">
              <Icon.AlertCircle className="text-gray-500 w-5 h-5 mr-3" />
              <p className="text-sm text-gray-600">
                K odevzdání {formatTimestampWithDay(homework.due)}
              </p>
            </div>

            {homework.points > 0 ? (
              <div className="flex">
                <Icon.Award className="text-gray-500 w-5 h-5 mr-3" />
                <p className="text-sm text-gray-600">Získat můžete až {homework.points} bodů</p>
              </div>
            ) : null}
          </Stack>
        </div>
      </div>
    </div>
  );
}
