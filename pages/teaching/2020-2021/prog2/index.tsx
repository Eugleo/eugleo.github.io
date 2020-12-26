/* eslint-disable @typescript-eslint/no-var-requires */
import c from 'classnames';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect } from 'react';

import { HomeworkCard } from '../../../../src/teaching/components/cards/HomeworkCard';
import { LectureCard } from '../../../../src/teaching/components/cards/LectureCard';
import { Header, HeaderBackgroundImage } from '../../../../src/teaching/components/Header';
import { Paragraph, Section } from '../../../../src/teaching/components/Text';
import { getAllHomeworks, getAllLectures } from '../../../../src/teaching/content-io';
import { Homework, HomeworkMeta } from '../../../../src/teaching/Homework';
import { Stack } from '../../../../src/teaching/Layout';
import { Lecture, LectureMeta } from '../../../../src/teaching/Lecture';
import { comparator } from '../../../../src/teaching/Utils';

const BG_PATH = '/python.jpg';

// TODO Fix this
const LECTURE_DATES = [
  // October
  new Date(2020, 10 - 1, 6),
  new Date(2020, 10 - 1, 13),
  new Date(2020, 10 - 1, 20),
  new Date(2020, 10 - 1, 27),

  // November
  new Date(2020, 11 - 1, 3),
  new Date(2020, 11 - 1, 6),
  new Date(2020, 11 - 1, 10),
  new Date(2020, 11 - 1, 17),
  new Date(2020, 11 - 1, 24),

  // December
  new Date(2020, 12 - 1, 1),
  new Date(2020, 12 - 1, 8),
  new Date(2020, 12 - 1, 15),
  new Date(2020, 12 - 1, 22),

  // January
  new Date(2021, 1 - 1, 8),
  new Date(2021, 1 - 1, 15),
  new Date(2021, 1 - 1, 22),
  new Date(2021, 1 - 1, 29),
];

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
    revalidate: 43200,
  };
};

export default function ProgrammingI({
  lectures,
  homeworks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    document.documentElement.lang = 'cs';
  });

  return (
    <div className="min-h-screen pb-10">
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
          homeworks={homeworks}
          lectureDates={LECTURE_DATES}
        />
        <ClassInfo />
        <HomeworkList homeworks={homeworks} />
        <LectureList lectures={lectures} />
      </main>
    </div>
  );
}

function ClassInfo() {
  return (
    <Section title="Informace o předmětu">
      <Stack gap="gap-4">
        <Paragraph>
          Podmínkou splnění předmětu v prvním pololetí je aktivita v hodině a úspěšné složení
          pololetní písemné a ústní zkoušky. Rozvěž je vyžadováno, aby žáci alespoň jednou
          prezentovali řešení nějakého z domácích úkolů, které jinak budou čistě dobrovolné. teorie.
        </Paragraph>

        <Paragraph>
          Během druhého pololetí budou žáci pracovat na vlastním projektu. Svou práci na tomto
          projektu budou žáci minimálně jednou za pololetí prezentovat. Žáci budou rovněž na konci
          roku ústně zkoušeni z probrané teorie.
        </Paragraph>

        <Paragraph>
          Prezentace budou hodnoceny známkou s váhou 5 a se stejnou váhou bude hodnoceno i závěrečné
          ústní zkoušení. Práce na projektu a písemné zkoušení bude hodnoceno s váhou 10. Žáci mohou
          navíc dostávat známky za práci v hodině.
        </Paragraph>

        <h3 className="font-bold mt-4">Podoba zkoušky</h3>

        <Paragraph>
          Zkouška v prvním pololetí se skládá z písemné a ústní části. Na začátku písemné části je
          zadána jedna úloha, na jejíž naprogramování studenti mají 90 minut. Ústní část se skládá z
          diskuze o studentově řešení písemné části a z několika otázek na teorii probranou v
          hodinách.
        </Paragraph>
      </Stack>
    </Section>
  );
}

function HomeworkList({ homeworks }: { homeworks: Homework[] }) {
  return (
    <Section title="Pracovní plány">
      <Paragraph className="mb-4">
        Během práce na projektu si budou žáci rozvrhovat, jaké funkce daný týden implementují.
        Seznam těchto plánů se objeví zde, aby žáci i vyučující mohli průběžně kontrolovat, jak se
        jim daří plány plnit.
      </Paragraph>
      <div className="column">
        {homeworks.sort(comparator((hw) => -hw.due)).map((hw) => (
          <HomeworkCard key={hw.id} homework={hw} />
        ))}
      </div>
      <style jsx>{`
        .column {
          width: 100%;
        }
      `}</style>
    </Section>
  );
}

function LectureList({ lectures }: { lectures: Lecture[] }) {
  return (
    <Section title="Zápisky z přednášek">
      <Paragraph className="mb-4">
        Zde se budou objevovat oficiální zápisky z přednášek. V závěrečném ústním zkoušení budou
        vyžadovány pouze znalosti, které jsou zaznamenány v těchto zápiscích (a jejich praktické
        využití).
      </Paragraph>
      <div className="column">
        {lectures.sort(comparator((l) => -l.timestamp)).map((l) => (
          <LectureCard key={l.id} lecture={l} />
        ))}
      </div>
      <style jsx>{`
        .column {
          width: 100%;
        }
      `}</style>
    </Section>
  );
}
