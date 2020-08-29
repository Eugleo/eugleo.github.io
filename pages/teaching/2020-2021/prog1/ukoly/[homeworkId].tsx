/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticProps } from 'next';
import React from 'react';

import { getAllHomeworks } from '../../../../../src/content-io';
import { Homework } from '../../../../../src/homework';

export default function Page({ homework }: { homework: Homework }) {
  const Component = require(`../../../../../posts/teaching/2020-2021/prog1/homeworks/${homework.id}.mdx`)
    .default;
  const ReactDOMServer = require('react-dom/server');
  const ssr = ReactDOMServer.renderToString(<Component />) as string;
  const mdx = <div dangerouslySetInnerHTML={{ __html: ssr }} />;

  return (
    <article>
      <h1>{homework.title}</h1>
      <small>{homework.timestamp}</small>
      {mdx}
    </article>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.homeworkId);
  const meta = require(`../../../../../posts/teaching/2020-2021/prog1/homeworks/${id}.mdx`)
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
  const homeworks = await getAllHomeworks();
  return {
    paths: homeworks.map((homeworkId) => ({ params: { homeworkId } })),
    fallback: false,
  };
}
