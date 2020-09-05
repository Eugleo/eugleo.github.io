/* eslint-disable @typescript-eslint/no-var-requires */
import c from 'classnames';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect } from 'react';

import {
  Header,
  HeaderBackgroundImage,
  HomeworkBox,
  LectureBox,
  Paragraph,
  Section,
} from '../../../../src/class-page-components';
import { getAllHomeworks, getAllLectures } from '../../../../src/content-io';
import { Homework, HomeworkMeta } from '../../../../src/homework';
import { Stack } from '../../../../src/layout';
import { Lecture, LectureMeta } from '../../../../src/lecture';
import { Test } from '../../../../src/test';
import { comparator } from '../../../../src/utils';

const TESTS: Test[] = [];
const BG_PATH = '/python.jpg';

export const getStaticProps = async () => {
  const lecturePaths = await getAllLectures('prog2');
  const homeworkPaths = await getAllHomeworks('prog2');

  const promiseHws = homeworkPaths
    .map(async (hid) => {
      const module = await import(
        `../../../../posts/teaching/2020-2021/prog2/homeworks/${hid}.mdx`
      );
      const homework: HomeworkMeta = module.metadata;

      return {
        ...homework,
        id: parseInt(hid),
      };
    })
    .sort(comparator(async (hw) => (await hw).id));

  const homeworks: Homework[] = await Promise.all(promiseHws);

  const lectures: Lecture[] = lecturePaths
    .map((idStr) => {
      const id = parseInt(idStr);
      const lecture: LectureMeta = require(`../../../../posts/teaching/2020-2021/prog2/lectures/${id}.mdx`)
        .metadata;
      return {
        ...lecture,
        id,
        homeworks: homeworks.filter((hw) => hw.lectures.includes(id)),
      };
    })
    .sort(comparator((l) => l.id));

  return {
    props: {
      lectures,
      homeworks,
    },
  };
};

function GradeBar({ color, children }: { color: string; children: string }) {
  return (
    <div className={c('flex justify-center items-center text-xs', color)}>
      <p>{children}</p>
    </div>
  );
}

export default function ProgrammingI({
  lectures,
  homeworks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });

  return (
    <div className="bg-gray-200 min-h-screen pb-10">
      <NextSeo
        title="Programování II"
        description="Seznam přednášek a úkolů zadaných v Programování II"
        openGraph={{
          title: 'Programování II',
          description: 'Seznam přednášek a úkolů zadaných v Programování II',
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
      <HeaderBackgroundImage imagePath={BG_PATH} />
      <main className="max-w-2xl w-full px-6 mx-auto">
        <Header
          title="Programování II "
          imagePath={BG_PATH}
          tests={TESTS}
          homeworks={homeworks}
          nextLectureDate={new Date(2020, 9 - 1, 11)}
          lastChanged={new Date()}
        />

        <Section title="Informace o předmětu">
          <Stack gap="gap-4">
            <Paragraph>
              Podmínkou splnění předmětu je dokončení pololetního projektu, na kterém budou žáci
              pracovat většinu prvního i druhého pololetí. Svou práci na tomto projektu budou žáci
              minimálně jednou za pololetí prezentovat. Žáci budou rovněž na konci každého pololetí
              ústně zkoušeni z probrané teorie.
            </Paragraph>

            <Paragraph>
              Prezentace bude hodnocena známkou s váhou 5 a se stejnou váhou bude hodnoceno i
              závěrečné ústní zkoušení. Práce na projektu bude hodnocena s váhou 10. Žáci mohou
              navíc dostávat známky za práci v hodině.
            </Paragraph>
          </Stack>
        </Section>

        <Section title="Pracovní plány">
          <Stack gap="gap-4">
            <Paragraph>
              Během práce na projektu si budou žáci rozvrhovat, jaké funkce daný týden implementují.
              Seznam těchto plánů se objeví zde, aby žáci i vyučující mohli průběžně kontrolovat,
              jak se jim daří plány plnit.
            </Paragraph>
            {homeworks.map((hw) => (
              <HomeworkBox key={hw.id} homework={hw} />
            ))}
          </Stack>
        </Section>

        <Section title="Zápisky z přednášek">
          <Stack gap="gap-4">
            <Paragraph>
              Zde se budou objevovat oficiální zápisky z přednášek. V závěrečném ústním zkoušení
              budou vyžadovány pouze znalosti, které jsou zaznamenány v těchto zápiscích (a jejich
              praktické využití).
            </Paragraph>
            {lectures.map((l) => (
              <LectureBox key={l.id} lecture={l} />
            ))}
          </Stack>
        </Section>
      </main>
    </div>
  );
}
