/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect } from 'react';

import { getAllHomeworks } from '../../../../../src/content-io';
import { Content, HomeworkHeader, Navigation } from '../../../../../src/content-page';
import { Homework } from '../../../../../src/homework';

export default function Page({ homework }: { homework: Homework }) {
  const Component = require(`../../../../../posts/teaching/2020-2021/prog2/homeworks/${homework.id}.mdx`)
    .default;
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });

  return (
    <div className="mr-3 bg-gray-200 py-10 min-h-screen">
      <NextSeo
        title={`Úkol #${homework.id} | Programování I`}
        description={homework.title}
        openGraph={{
          title: `Úkol' #${homework.id} | Programování I`,
          description: homework.title,
          type: 'website',
          locale: 'cs_CZ',
          images: [
            {
              url: 'https://www.evzen.dev/prog2-og-header.png',
              width: 1200,
              height: 630,
              alt: 'evzen.dev / Programování I',
            },
          ],
        }}
      />
      <article className="mx-auto max-w-xl px-4">
        <Navigation title="Programování I" to="/teaching/2020-2021/prog2" />
        <HomeworkHeader homework={homework} />
        <Content>
          <Component />
        </Content>
      </article>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.homeworkId);
  const meta = require(`../../../../../posts/teaching/2020-2021/prog2/homeworks/${id}.mdx`)
    .metadata;
  return {
    props: {
      homework: {
        ...meta,
        id,
      },
    },
  };
};

export async function getStaticPaths() {
  const homeworks = await getAllHomeworks('prog2');
  return {
    paths: homeworks.map((homeworkId) => ({ params: { homeworkId } })),
    fallback: false,
  };
}
