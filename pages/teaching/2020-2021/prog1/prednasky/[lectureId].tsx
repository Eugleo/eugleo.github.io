/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { getAllLectures, getAllHomeworks } from '../../../../../src/content-io';
import { LectureMeta, Lecture } from '../../../../../src/lecture';
import { comparator } from '../../../../../src/utils';
import { HomeworkMeta, Homework } from '../../../../../src/homework';
import { ParsedUrlQuery } from 'querystring';
import { MDXProvider } from '@mdx-js/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Page({ lecture }: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = require(`../../../../../posts/teaching/2020-2021/prog1/lectures/${lecture.id}.mdx`)
    .default;
  return (
    <div className="bg-gray-200 py-10 min-h-screen">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-bold text-4xl mb-4">{lecture.title}</h1>
        <MDXProvider
          components={{
            p: (props) => <p className="text-gray-900 mb-2" {...props} />,
            h2: (props) => <h2 className="font-bold text-2xl mt-8 mb-4" {...props} />,
            code: (props) => {
              const language = props.className.replace(/language-/, '');
              return (
                <SyntaxHighlighter
                  className="rounded-lg shadow-xs"
                  codeTagProps={{
                    className: 'text-sm',
                  }}
                  language={language}
                >
                  {props.children}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          <Component />
        </MDXProvider>
      </article>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery>) {
  const id = Number(context.params?.lectureId);

  const meta: LectureMeta = require(`../../../../../posts/teaching/2020-2021/prog1/lectures/${id}.mdx`)
    .metadata;

  const homeworks: Homework[] = (await getAllHomeworks())
    .map((hid) => {
      const homework: HomeworkMeta = require(`../../../../../posts/teaching/2020-2021/prog1/homeworks/${hid}.mdx`)
        .metadata;
      return {
        ...homework,
        id: parseInt(hid),
      };
    })
    .sort(comparator((hw) => hw.id));

  const lecture: Lecture = {
    ...meta,
    id,
    homeworks: homeworks.filter((hw) => hw.lectures.includes(id)),
  };

  return { props: { lecture } };
}

export async function getStaticPaths() {
  const lectures = await getAllLectures();
  return {
    paths: lectures.map((lectureId) => ({ params: { lectureId } })),
    fallback: false,
  };
}
