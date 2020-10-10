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
import { Homework, HomeworkMeta } from '../../../../../src/teaching/Homework';
import { Lecture, LectureMeta } from '../../../../../src/teaching/Lecture';
import { comparator } from '../../../../../src/teaching/Utils';

export default function LecturePage({
  title,
  cl,
  lecture,
  header,
}: {
  title: string;
  cl: string;
  lecture: Lecture;
  header: string;
}) {
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });
  const Component = require(`../../../../../posts/teaching/2020-2021/${cl}/lectures/${lecture.id}.mdx`)
    .default;
  return (
    <div className="pb-10 min-h-screen overflow-x-hidden">
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
              url: header,
              width: 1200,
              height: 630,
              alt: `evzen.dev / ${title}`,
            },
          ],
        }}
      />

      <div className="bg-blue-500 z-0 lg:h-xl h-64 w-full -mb-32" />
      <article className="mx-auto max-w-xl px-4">
        <LectureHeader path={`/teaching/2020-2021/${cl}`} lecture={lecture} />
        <Navigation title={title} to={`/teaching/2020-2021/${cl}`} />
        <Content>
          <Component />
        </Content>
      </article>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery>) {
  const id = Number(context.params?.lectureId);
  const cl = context.params?.cl as string;

  const meta: LectureMeta = require(`../../../../../posts/teaching/2020-2021/${cl}/lectures/${id}.mdx`)
    .metadata;

  const homeworks: Homework[] = (await getAllHomeworks(cl))
    .map((hid) => {
      const homework: HomeworkMeta = require(`../../../../../posts/teaching/2020-2021/${cl}/homeworks/${hid}.mdx`)
        .metadata;
      return {
        ...homework,
        id: parseInt(hid),
      };
    })
    .sort(comparator((hw) => hw.id));

  const pageTitle = cl === 'prog1' ? 'Programování I' : 'Programování II';
  const header =
    cl === 'prog1'
      ? 'https://www.evzen.dev/prog1-og-header.png'
      : 'https://www.evzen.dev/prog2-og-header.png';
  const lecture: Lecture = {
    ...meta,
    id,
    homeworks: homeworks.filter((hw) => hw.lectures.includes(id)),
  };

  return { props: { lecture, title: pageTitle, cl, header } };
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
