/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { LectureHeader } from '../../../../../src/teaching/components/LecturePage';
import { Navigation } from '../../../../../src/teaching/components/Navigation';
import { Content } from '../../../../../src/teaching/components/PageContent';
import { getAllHomeworks, getAllLectures } from '../../../../../src/teaching/content-io';
import { HomeworkMeta } from '../../../../../src/teaching/Homework';
import { Lecture, LectureMeta } from '../../../../../src/teaching/Lecture';
import { comparator } from '../../../../../src/teaching/Utils';

export default function LecturePage({
  title,
  cl,
  lecture,
}: {
  title: string;
  cl: string;
  lecture: Lecture;
}) {
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });
  const Component = require(`../../../../../posts/teaching/2020-2021/${cl}/lectures/${lecture.id}.mdx`)
    .default;
  return (
    <div className="bg-gray-200 py-10 min-h-screen">
      <NextSeo
        title={`Přednáška #${lecture.id} | ${title}`}
        description={lecture.title}
        openGraph={{
          title: `Přednáška #${lecture.id} | ${title}`,
          description: lecture.title,
          type: 'website',
          locale: 'cs_CZ',
          images: [
            {
              url: 'https://www.evzen.dev/prog2-og-header.png',
              width: 1200,
              height: 630,
              alt: `evzen.dev / ${title}`,
            },
          ],
        }}
      />
      <article className="mx-auto max-w-xl px-4">
        <Navigation title={title} to={`/teaching/2020-2021/${cl}`} />
        <LectureHeader path={`/teaching/2020-2021/${cl}`} lecture={lecture} />
        <Content>
          <Component />
        </Content>
      </article>
    </div>
  );
}

export async function getLectureStaticProps(context: GetStaticPropsContext<ParsedUrlQuery>) {
  const id = Number(context.params?.lectureId);
  const cl = context.params?.cl as string;

  const meta: LectureMeta = require(`../../../../../posts/teaching/2020-2021/${cl}/lectures/${id}.mdx`)
    .metadata;

  const homeworks: HomeworkMeta[] = (await getAllHomeworks(cl))
    .map((hid) => {
      const homework: HomeworkMeta = require(`../../../../../posts/teaching/2020-2021/${cl}/homeworks/${hid}.mdx`)
        .metadata;
      return {
        ...homework,
        id: parseInt(hid),
      };
    })
    .sort(comparator((hw) => hw.id));

  const lecture: Lecture = {
    ...meta,
    cl,
    title: cl === 'prog1' ? 'PRogramování I' : 'Programování II',
    id,
    homeworks: homeworks.filter((hw) => hw.lectures.includes(id)),
  };

  return { props: { lecture } };
}

export async function getStaticPaths() {
  const lectures1 = await getAllLectures('prog1');
  const lectures2 = await getAllLectures('prog2');

  const params1 = lectures1.map((lectureId) => ({ params: { cl: 'prog1', lectureId } }));
  const params2 = lectures2.map((lectureId) => ({ params: { cl: 'prog2', lectureId } }));

  return {
    paths: params1.concat(params2),
    fallback: false,
  };
}
