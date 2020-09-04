/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-var-requires */
import { MDXProvider } from '@mdx-js/react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { ChevronLeft } from 'react-feather';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { getAllHomeworks, getAllLectures } from '../../../../../src/content-io';
import {
  Content,
  HomeworkHeader,
  LectureHeader,
  Navigation,
} from '../../../../../src/content-page';
import { Homework, HomeworkMeta } from '../../../../../src/homework';
import { Lecture, LectureMeta } from '../../../../../src/lecture';
import { comparator } from '../../../../../src/utils';

export default function Page({ lecture }: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });
  const Component = require(`../../../../../posts/teaching/2020-2021/prog1/lectures/${lecture.id}.mdx`)
    .default;
  return (
    <div className="bg-gray-200 py-10 min-h-screen">
      <NextSeo
        title={`Přednáška #${lecture.id} | Programování I`}
        description={lecture.title}
        openGraph={{
          title: `Přednáška #${lecture.id} | Programování I`,
          description: lecture.title,
          type: 'website',
          locale: 'cs_CZ',
          images: [
            {
              url: 'https://www.evzen.dev/prog1-og-header.png',
              width: 1200,
              height: 630,
              alt: 'evzen.dev / Programování I',
            },
          ],
        }}
      />
      <article className="mx-auto max-w-xl px-4">
        <Navigation title="Programování I" to="/teaching/2020-2021/prog1" />
        <LectureHeader path="/teaching/2020-2021/prog1" lecture={lecture} />
        <Content>
          <Component />
        </Content>
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
