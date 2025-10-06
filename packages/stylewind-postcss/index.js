// packages/postcss/index.js (ESM version)
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import tailwindPostcss from '@tailwindcss/postcss';

// Este es un plugin de PostCSS que combina postcss-import y tailwindcss
export default function stylewindcss(opts = {}) {
  return {
    postcssPlugin: 'stylewindcss',
    plugins: [
      postcssImport(),
      tailwindPostcss(opts)
    ]
  };
}

stylewindcss.postcss = true;
