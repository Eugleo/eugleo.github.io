/* eslint-disable @typescript-eslint/no-var-requires */

const rehypePrism = require('@mapbox/rehype-prism');
module.exports = {
  module: {
    // ...
    rules: [
      // ...
      {
        test: /.mdx?$/,
        use: [
          'babel-loader',
          {
            resolve: '@mdx-js/loader',
            options: {
              rehypePlugins: [rehypePrism],
            },
          },
        ],
      },
    ],
  },
};
