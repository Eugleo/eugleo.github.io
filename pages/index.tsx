import Head from 'next/head';
import React from 'react';

function Link({ to, children }: { to: string; children: string }) {
  return (
    <a href={to} className="capitalize hover:text-blue-500 text-gray-600 transform duration-100">
      &gt;
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <Head>
        <title>Evžen Wybitul | Personal website and portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen mx-auto flex flex-col justify-center items-center w-full">
        <div className="px-10 py-8 max-w-2xl rounded-lg shadow-xs bg-white">
          <h1 className="text-4xl font-black mb-6">
            Evžen
            <span className="text-blue-500"> :: Dev</span>
          </h1>

          <h2 className="text-gray-600 mb-2">
            This site is under construction, but in the meantime, here are some useful links
          </h2>

          <div className="grid gap-2 grid-rows-4">
            <Link to="https://github.com/Eugleo">GitHub</Link>
            <Link to="mailto:wybitul@evzen.dev">E-Mail</Link>
            <Link to="teaching/2020-2021/prog1">Programming I</Link>
            <Link to="teaching/2020-2021/prog2">Programming II</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
