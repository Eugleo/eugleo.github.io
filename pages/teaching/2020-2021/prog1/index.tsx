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
        title="Programování I"
        description="Zde naleznete seznam přednášek, úkolů a testů zadaných v Programování I"
        openGraph={{
          title: 'Programování I',
          description: 'Zde naleznete seznam přednášek, úkolů a testů zadaných v Programování I',
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
      <HeaderBackgroundImage imagePath={BG_PATH} />
      <main className="max-w-2xl w-full px-6 mx-auto">
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
              Podmínkou pro úspěšné splnění předmětu je vypracování povinných domácích úkolů a
              získání alespoň 60 bodů ze 100 v závěrečné zkoušce.
            </Paragraph>
            <Paragraph>
              Studenti mohou navíc už během roku získat body, které se jim na konci připočítají ke
              zkoušce, a to konkrétně vypracováváním <em>bonusových</em> domácích úkolů a úspěšným
              plněním průběžných písemných testů. Každému studentovi bude tímto způsobem ke zkoušce
              převedeno až 50 bodů.
            </Paragraph>

            <div className="p-8 my-4 bg-white rounded-lg shadow-xs">
              <Stack gap="gap-4">
                <Paragraph>
                  S přihlédnutím ke známkovým hranicím níže je zřejmé, že i ten nejaktivnější
                  student musí ze závěrečné zkoušky vždy získat alespoň 10 bodů, aby ročníkem
                  prošel.
                </Paragraph>

                <Paragraph>
                  Na druhou stranu i student, který nedělal dobrovolné domácí úlohy a moc se mu
                  nedařilo v průběžných testech může nakonec dostat jedničku, pokud hezky zvládne
                  závěrečnou zkoušku.
                </Paragraph>
              </Stack>
            </div>

            <Paragraph>Konkrétní bodové hranice a jim odpovídající známky:</Paragraph>

            <div
              style={{ gridTemplateColumns: '6fr repeat(4, 1fr)' }}
              className="rounded-md shadow-xs bg-white w-full grid grid-cols-5 h-10 overflow-hidden"
            >
              <GradeBar color="bg-red-100 text-red-600">0 až 60</GradeBar>
              <GradeBar color="bg-green-100 text-green-600">70</GradeBar>
              <GradeBar color="bg-green-200 text-green-600">80</GradeBar>
              <GradeBar color="bg-green-300 text-green-600">90</GradeBar>
              <GradeBar color="bg-green-400 text-green-100">100</GradeBar>
            </div>

            <Paragraph>
              Do Bakaláře budou studentům udíleny známky, které budou zhruba odpovídat změnám v
              jejich bodovém stavu. Tyto známky však budou pouze orientační, hodnocení na vysvědčení
              bude zcela záviset na získaných bodech.
            </Paragraph>

            <h3 className="font-bold mt-4">Podoba zkoušky a průběžných testů</h3>

            <Paragraph>
              Zkouška se skládá z písemné a ústní části. Na začátku písemné části je zadána jedna
              úloha, na jejíž naprogramování studenti mají 90 minut. Průběžné testy mají stejnou
              formu, ale na jejich vypracování mají žáci pouze 60 minut.
            </Paragraph>

            <Paragraph>
              Ústní část zkoušky je vlastně jen krátká diskuze s vyučujícím o předešlé písemné části
              a o tématech probraných během roku — všechny důležité informace z těchto témat budou v
              oficiálních zápiscích z přednášek zde na stránkách.
            </Paragraph>
          </Stack>
        </Section>

        <Section title="Zadání úkolů">
          <Stack gap="gap-4">
            <Paragraph>Zde se budou objevovat zadání úkolů spolu s jejich termíny.</Paragraph>
            {homeworks.map((hw) => (
              <HomeworkBox key={hw.id} homework={hw} lectureNum={1} />
            ))}
          </Stack>
        </Section>

        <Section title="Zápisky z přednášek">
          <Stack gap="gap-4">
            <Paragraph>Zde se budou objevovat zápisky důležitých věcí z přednášek.</Paragraph>
            {lectures.map((l) => (
              <LectureBox key={l.id} lecture={l} />
            ))}
          </Stack>
        </Section>
      </main>
    </div>
  );
}
