// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

export default [
  // Bundle del servidor/loader Node.js
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
    ]
  },
  // Bundle completo del theme editor (botón + panel React)
  {
    input: 'src/client/setupThemeEditor.js',
    output: {
      file: 'dist/theme-editor.js',
      format: 'iife',
      name: 'themeEditorComplete',
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true
      }),
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx']
      }),
    ]
  }
];