import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/script.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    banner: `/*
This file contains parts of Classroom Export Viewer, which is
copyright 2019 psvenk.

Classroom Export Viewer is free/libre and open-source software pursuant to
the terms of the MIT/Expat License; see file \`COPYING\` for more details.

Additional licenses may apply to libraries included in this file.

SPDX-License-Identifier: MIT
*/
`
  },
  plugins: [
    babel(),
    resolve(),
    commonjs()
  ]
};
