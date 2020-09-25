/* eslint-disable react/display-name */
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import * as Icon from 'react-feather';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Homework } from './Homework';
import { Stack } from './Layout';
import { LectureLink } from './Lecture';
import { formatTimestampWithDay } from './Utils';

export function Navigation({ to, title }: { to: string; title: string }) {
  return (
    <nav>
      <a
        href={to}
        className="flex flex-row items-center mb-4 text-blue-600 font-medium uppercase text-xs hover:underline"
      >
        <Icon.ChevronLeft className="mr-2 text-blue-600 w-4 h-4" /> {title}
      </a>
    </nav>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider
      components={{
        p: (props) => <p className="text-gray-900 mb-4" {...props} />,
        h2: (props) => <h2 className="font-bold text-lg md:text-2xl mt-8 mb-4" {...props} />,
        h3: (props) => <h3 className="font-bold md:text-lg mt-6 mb-4" {...props} />,
        ol: (props) => <ol className="list-decimal list-outside pl-10" {...props} />,
        ul: (props) => <ul className="list-disc list-outside pl-10" {...props} />,
        li: (props) => <li className="mb-2" {...props} />,
        inlineCode: (props) => <code className="text-sm bg-green-100 px-1 rounded-sm" {...props} />,
        a: (props) => (
          <a
            className="border-b border-gray-500 hover:border-gray-900 bg-blue-100 px-1 hover:bg-blue-200"
            {...props}
          />
        ),
        code: (props) => {
          console.log();
          const language = props.className.replace(/language-/, '');
          return (
            <SyntaxHighlighter
              wrapLines={true}
              className="rounded-lg shadow-xs mb-4 mt-4"
              codeTagProps={{
                className: 'text-sm',
              }}
              language={language}
            >
              {props.children.slice(0, -1)}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {children}
    </MDXProvider>
  );
}

export function HomeworkHeader({ homework }: { homework: Homework }) {
  return (
    <div className="mb-10 z-10 relative">
      <div className="bg-white rounded-lg shadow-xl mb-2 flex flex-row overflow-hidden">
        <div className="w-full">
          <h1 className="text-black text-4xl font-bold px-8 py-6 text-center sm:text-left">
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

export function LectureHeader({ lecture, path }: { lecture: Lecture; path: string }) {
  return (
    <div className="mb-10 z-10 relative">
      <div className="bg-white rounded-lg shadow-xl mb-2 flex flex-row overflow-hidden">
        <div className="w-full">
          <h1 className="text-black text-4xl font-bold px-8 py-6 text-center sm:text-left">
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
                      <Homework
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
