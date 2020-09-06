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
  const lecturePaths = await getAllLectures('prog1');
  const homeworkPaths = await getAllHomeworks('prog1');

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
        description="Zde naleznete seznam přednášek a úkolů zadaných v Programování I"
        openGraph={{
          title: 'Programování I',
          description: 'Zde naleznete seznam přednášek a úkolů zadaných v Programování I',
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
          nextLectureDate={new Date(2020, 9 - 1, 11)}
          lastChanged={new Date()}
        />

        <Section title="Informace o předmětu">
          <Stack gap="gap-4">
            <Paragraph>
              Během roku budou průběžně zadávány domácí úkoly, každý z nich ohodnocený nějakým
              počtem bodů. Za obě pololetí bude vypsáno tolik domácích úkolů, aby za ně celkem bylo
              možno získat alespoň 150 bodů.
            </Paragraph>

            <Paragraph>
              Aby mohl být žák hodnocen, musí v obou pololetích získat za domácí úkoly alespoň 100
              bodů. Každý žák navíc bude minimálně jednou v každém pololetí prezentovat své řešení
              domácího úkolu před třídou. Rozhodujícím faktorem při hodnocení žáka bude závěrečná
              zkouška skládající se z ústní a písemné části.
            </Paragraph>

            <Paragraph>
              Obě části závěrečné zkoušky jsou hodnoceny zvlášť, písemná s váhou 7 a ústní s váhou
              10. Prezentace jsou hodnoceny s váhou 5. Žáci mohou navíc dostávat známky za práci v
              hodině.
            </Paragraph>

            <h3 className="font-bold mt-4">Podoba zkoušky</h3>

            <Paragraph>
              Zkouška se skládá z písemné a ústní části. Na začátku písemné části je zadána jedna
              úloha, na jejíž naprogramování studenti mají 90 minut. Ústní část se skládá z diskuze
              o studentově řešení písemné části a z několika otázek na teorii probranou v hodinách.
            </Paragraph>
          </Stack>
        </Section>

        <Section title="Zadání úkolů">
          <Stack gap="gap-4">
            <Paragraph>
              Všechny úkoly prosím posílejte nejpozději o půlnoci, a to přes messenger nebo přes
              mail. Nebude-li řečeno jinak, posílejte úkoly v souboru s názvem
              <code className="text-sm bg-green-100 px-1 rounded-sm">idUkolu_prijmeni.arr</code>,
              například <code className="text-sm bg-green-100 px-1 rounded-sm">u1_wybitul.arr</code>
              . Pokud je v rámci jednoho úkolů několik podůkolů, uložte je všechny do jednoho
              souboru a oddělte je prázdným řádkem.
            </Paragraph>
            {homeworks.map((hw) => (
              <HomeworkBox key={hw.id} homework={hw} />
            ))}
          </Stack>
        </Section>

        <Section title="Zápisky z přednášek">
          <Stack gap="gap-4">
            <Paragraph>
              V ústní části zkoušky budou vyžadovány pouze znalosti, které jsou zaznamenány v těchto
              zápiscích. Přednášky jsou inspirovány knihou{' '}
              <a
                className="border-b border-gray-500 hover:border-gray-900 bg-blue-100 px-1 hover:bg-blue-200"
                href="https://papl.cs.brown.edu/2020/"
              >
                Programming and Programming Languages (PAPL)
              </a>
              , pokud vám tedy něco z přednášek nebude jasné, můžete se zkusit podívat i do ní.
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
