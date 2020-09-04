/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const withPlugins = require('next-compose-plugins');

const mdx = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'] };

module.exports = withPlugins([mdx], nextConfig);
