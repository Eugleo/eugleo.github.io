/* eslint-disable @typescript-eslint/no-var-requires */
import { InferGetStaticPropsType } from 'next';
import React from 'react';

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
const BG_PATH = '/pyret.webp';

export const getStaticProps = async () => {
  const lecturePaths = await getAllLectures();
  const homeworkPaths = await getAllHomeworks();

  const promiseHws = homeworkPaths
    .map(async (hid) => {
      const module = await import(
        `../../../../posts/teaching/2020-2021/prog1/homeworks/${hid}.mdx`
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
      const lecture: LectureMeta = require(`../../../../posts/teaching/2020-2021/prog1/lectures/${id}.mdx`)
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

export default function ProgrammingI({
  lectures,
  homeworks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-gray-200 min-h-screen pb-10">
      <HeaderBackgroundImage imagePath={BG_PATH} />
      <main className="md:max-w-2xl w-full px-6 mx-auto">
        <Header
          title="Programování I"
          imagePath={BG_PATH}
          tests={TESTS}
          homeworks={homeworks}
          nextLectureDate={new Date(2020, 8, 4)}
          lastChanged={new Date()}
        />

        <Section title="Informace o předmětu">
          <Stack gap="gap-4">
            <Paragraph>
              Podmínkou k úspěšném splnění předmětu je vypracování povinných domácích úkolů a
              získání alespoň 60 bodů ze 100 v závěrečné zkoušce.
            </Paragraph>
            <Paragraph>
              Studenti mohou navíc už během roku získat body, které se jim na konci připočítají ke
              zkoušce, a to konkrétně vypracováváním bonusových domácích úkolů a úspěšným plněním
              průběžných písemných testů. Každému studentovi bude tímto způsobem ke zkoušce
              převedeno až 50 bodů.
            </Paragraph>

            <div className="p-8 my-4 bg-white rounded-lg shadow-xs">
              <Paragraph>
                S přihlédnutím ke známkovým hranicím níže je zřejmé, že i ten nejaktivnější student
                musí ze závěrečné zkoušky vždy získat alespoň 10 bodů, aby prošel ročníkem.
              </Paragraph>

              <p>
                Na druhou stranu i student, který nedělal dobrovolné domácí úlohy a moc se mu
                nedařilo v průběžných testech může nakonec dostat jedničku, pokud hezky zvládne
                závěrečnou zkoušku.
              </p>
            </div>

            <Paragraph>
              Konkrétní bodové hranice a jim odpovídající známky: Studenti budou v během průběžně
              známkování přes systém Bakalář, ale tyto budou spíše orientačního charakteru. Zde na
              stránkách si bude moct každý student v průběhu roku kontrolovat, kolik bodů má a kolik
              ještě může (nebo musí) získat.
            </Paragraph>

            <h3 className="font-bold mt-4">Podoba zkoušky a průběžných testů</h3>

            <Paragraph>
              Zkouška se skládá z písemné a ústní části. Písemná část zkoušky je velmi podobná
              průběžným testům: na začátku hodiny je zadána jedna úloha, na jejíž naprogramování
              budou mít studenti v případě testu 60 minut, a v případě zkoušky 90 minut.
            </Paragraph>

            <Paragraph>
              Ústní část zkoušky bude krátká diskuze s vyučujícím o předešlé písemné části a o
              tématech probraných během roku—všechny důležité informace z těchto témat budou v
              oficiálních zápiscích z přednášek zde na stránkách.
            </Paragraph>
          </Stack>
        </Section>

        <Section title="Zadání úkolů">
          <Stack gap="gap-4">
            {homeworks.map((hw) => (
              <HomeworkBox key={hw.id} homework={hw} lectureNum={1} />
            ))}
          </Stack>
        </Section>

        <Section title="Zápisky z přednášek">
          <Stack gap="gap-4">
            {lectures.map((l) => (
              <LectureBox key={l.id} lecture={l} />
            ))}
          </Stack>
        </Section>
      </main>
    </div>
  );
}
