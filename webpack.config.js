/* eslint-disable @typescript-eslint/no-var-requires */

var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

export var webpackConfig = {
  plugins: [new CaseSensitivePathsPlugin()],
};
