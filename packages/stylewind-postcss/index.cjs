// packages/postcss/index.cjs (CommonJS version)
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const tailwindPostcss = require('@tailwindcss/postcss');

// Este es un plugin de PostCSS que combina postcss-import y tailwindcss
function stylewindcss(opts = {}) {
  return {
    postcssPlugin: 'stylewindcss',
    plugins: [
      postcssImport(),
      tailwindPostcss(opts)
    ]
  };
}

stylewindcss.postcss = true;

module.exports = stylewindcss;
module.exports.default = stylewindcss;
