const { dest, src } = require("gulp");
const { exec } = require("child_process");
const through2 = require("through2");
const tap = require("gulp-tap");

function css() {
  const postcss = require("gulp-postcss");

  return src("src/styles-source/styles.css")
    .pipe(postcss([require("tailwindcss"), require("autoprefixer")]))
    .pipe(dest("src/styles"));
}

exports.default = css;
