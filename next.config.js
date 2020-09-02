/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const withPlugins = require('next-compose-plugins');

const mdx = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'] };

module.exports = {
  async redirects() {
    return [
      {
        source: '/prog1',
        destination: '/teaching/2020-2021/prog1',
        permanent: false,
      },
      {
        source: '/prog2',
        destination: '/teaching/2020-2021/prog2',
        permanent: false,
      },
    ];
  },
  plugins: withPlugins([mdx], nextConfig),
};
