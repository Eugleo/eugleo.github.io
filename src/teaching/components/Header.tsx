import { useRouter } from 'next/router';
import React from 'react';
import * as Icon from 'react-feather';

import { Homework, HomeworkLink } from '../Homework';
import { Stack } from '../Layout';
import { formatTimestampWithDay } from '../Utils';

export function HeaderBackgroundImage({ imagePath }: { imagePath: string }) {
  return (
    <div className="overflow-hidden lg:h-xl h-64 z-0">
      <style jsx>
        {`
          @media (min-width: 640px) {
            .blur-big::before {
              content: '';
              position: absolute;
              z-index: 2;
              width: 100%;
              height: 100%;
              -webkit-backdrop-filter: blur(15px); /* apply the blur */
              backdrop-filter: blur(15px); /* apply the blur */
              pointer-events: none; /* make the pseudo class click-through */
            }
          }
        `}
      </style>

      <div
        className="overflow-hidden blur-big w-full h-full transform scale-105 bg-center bg-cover relative"
        style={{ backgroundImage: `url(${imagePath})` }}
      />
    </div>
  );
}

function DescriptionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row">{children}</div>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 text-sm ">{children}</p>;
}

export function Header({
  title,
  homeworks,
  nextLectureDate,
  imagePath,
  lastChanged,
}: {
  title: string;
  homeworks: Homework[];
  nextLectureDate: Date;
  imagePath: string;
  lastChanged: Date;
}) {
  return (
    <div className="mb-10 z-10 relative">
      <div className="bg-white rounded-lg shadow-xl mb-2 -mt-16 flex flex-row overflow-hidden">
        <div
          style={{ backgroundImage: `url(${imagePath})` }}
          className="hidden sm:block w-2/3 bg-cover bg-center"
        />
        <div className="w-full">
          <h1 className="text-black text-4xl font-bold px-8 py-6 text-center sm:text-left">
            {title}
          </h1>
          <Stack gap="gap-2" className="px-8 py-6 bg-gray-100 w-full">
            <Lectures nextLectureDate={nextLectureDate} />
            <Homeworks homeworks={homeworks} />
          </Stack>
        </div>
      </div>
      <p className="text-xs w-full text-gray-600 text-right">
        naposledy upraveno {formatTimestampWithDay(lastChanged.valueOf())}
      </p>
    </div>
  );
}

function Homeworks({ homeworks }: { homeworks: Homework[] }) {
  const router = useRouter();
  const path = router.asPath;
  const day = 1000 * 60 * 60 * 24;
  const futureHomeworks = homeworks.filter((hw) => hw.due + day >= Date.now());
  return (
    <DescriptionWrapper>
      <Icon.Home className="w-5 h-5 mr-3 text-gray-500" />
      {futureHomeworks.length === 0 ? (
        <Description>Žádné úkoly nejsou zadány</Description>
      ) : (
        <Description>
          Blíží se odevzdání úkolů{' '}
          {futureHomeworks
            .map<React.ReactNode>((hw) => (
              <HomeworkLink
                path={path}
                key={hw.id}
                number={hw.id}
                className="hover:text-gray-700"
              />
            ))
            .reduce((acc: React.ReactNode[], d) => [...acc, ', ', d], [])
            .slice(1)}
        </Description>
      )}
    </DescriptionWrapper>
  );
}

function Lectures({ nextLectureDate }: { nextLectureDate: Date }) {
  return (
    <DescriptionWrapper>
      <Icon.Calendar className="w-5 h-5 mr-3 text-gray-500" />
      <Description>
        Další přednáška bude {formatTimestampWithDay(nextLectureDate.valueOf())}
      </Description>
    </DescriptionWrapper>
  );
}
