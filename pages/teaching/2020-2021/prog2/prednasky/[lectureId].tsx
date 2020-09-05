/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { getAllHomeworks, getAllLectures } from '../../../../../src/content-io';
import { Content, LectureHeader, Navigation } from '../../../../../src/content-page';
import { Homework, HomeworkMeta } from '../../../../../src/homework';
import { Lecture, LectureMeta } from '../../../../../src/lecture';
import { comparator } from '../../../../../src/utils';

export default function Page({ lecture }: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });
  const Component = require(`../../../../../posts/teaching/2020-2021/prog2/lectures/${lecture.id}.mdx`)
    .default;
  return (
    <div className="bg-gray-200 py-10 min-h-screen">
      <NextSeo
        title={`Přednáška #${lecture.id} | Programování II`}
        description={lecture.title}
        openGraph={{
          title: `Přednáška #${lecture.id} | Programování II`,
          description: lecture.title,
          type: 'website',
          locale: 'cs_CZ',
          images: [
            {
              url: 'https://www.evzen.dev/prog2-og-header.png',
              width: 1200,
              height: 630,
              alt: 'evzen.dev / Programování II',
            },
          ],
        }}
      />
      <article className="mx-auto max-w-xl px-4">
        <Navigation title="Programování II" to="/teaching/2020-2021/prog2" />
        <LectureHeader path="/teaching/2020-2021/prog2" lecture={lecture} />
        <Content>
          <Component />
        </Content>
      </article>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery>) {
  const id = Number(context.params?.lectureId);

  const meta: LectureMeta = require(`../../../../../posts/teaching/2020-2021/prog2/lectures/${id}.mdx`)
    .metadata;

  const homeworks: Homework[] = (await getAllHomeworks('prog2'))
    .map((hid) => {
      const homework: HomeworkMeta = require(`../../../../../posts/teaching/2020-2021/prog2/homeworks/${hid}.mdx`)
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
  const lectures = await getAllLectures('prog2');
  return {
    paths: lectures.map((lectureId) => ({ params: { lectureId } })),
    fallback: false,
  };
}
