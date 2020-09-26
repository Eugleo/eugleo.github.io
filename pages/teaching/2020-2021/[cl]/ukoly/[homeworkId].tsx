/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { HomeworkHeader } from '../../../../../src/teaching/components/HomeworkPage';
import { Navigation } from '../../../../../src/teaching/components/Navigation';
import { Content } from '../../../../../src/teaching/components/PageContent';
import { getAllHomeworks } from '../../../../../src/teaching/content-io';
import { Homework } from '../../../../../src/teaching/Homework';

export default function HomeworkPage({
  cl,
  title,
  homework,
}: {
  cl: string;
  title: string;
  homework: Homework;
}) {
  const Component = require(`../../../../../posts/teaching/2020-2021/${cl}/homeworks/${homework.id}.mdx`)
    .default;
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });

  return (
    <div className="mr-3 py-10 min-h-screen">
      <NextSeo
        title={`Úkol #${homework.id} | ${title}`}
        description={homework.title}
        openGraph={{
          title: `Úkol #${homework.id} | ${title}`,
          description: homework.title,
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
        <HomeworkHeader homework={homework} />
        <Content>
          <Component />
        </Content>
      </article>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery>) {
  const id = Number(context.params?.homeworkId);
  const cl = context.params?.cl;
  const meta = require(`../../../../../posts/teaching/2020-2021/${cl}/homeworks/${id}.mdx`)
    .metadata;
  return {
    props: {
      cl,
      title: cl === 'prog1' ? 'Programování I' : 'Programování II',
      homework: {
        ...meta,
        id,
      },
    },
  };
}

export async function getStaticPaths() {
  const homeworks1 = await getAllHomeworks('prog1');
  const homeworks2 = await getAllHomeworks('prog2');

  const params1 = homeworks1.map((homeworkId) => ({ params: { cl: 'prog1', homeworkId } }));
  const params2 = homeworks2.map((homeworkId) => ({ params: { cl: 'prog2', homeworkId } }));

  console.log('HEEEEEY', params1.concat(params2));

  return {
    paths: params1.concat(params2),
    fallback: false,
  };
}
