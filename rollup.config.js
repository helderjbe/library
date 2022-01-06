import camelCase from 'camelcase';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import ts from 'rollup-plugin-ts';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import path from 'path';

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));

const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.ts');

const safeName = camelCase(LERNA_PACKAGE_NAME.replace('@', '').replace(/\//g, '-'));

const banner = `
  ${LERNA_PACKAGE_NAME} v${PKG_JSON.version}
  Copyright 2022<%= moment().format('YYYY') > 2022 ? '-' + moment().format('YYYY') : null %> ${PKG_JSON.homepage}
`;

const commonPlugins = (declaration) => [
  resolve(),
  commonjs(),
  json(),
  ts({
    tsconfig: (resolvedConfig) => ({ ...resolvedConfig, declaration, declarationMap: declaration }),
  }),
  license({
    banner,
  }),
];

export default [
  {
    input: INPUT_FILE,
    output: [
      { file: path.join(PACKAGE_ROOT_PATH, PKG_JSON.module), format: 'es', sourcemap: true },
      {
        file: path.join(PACKAGE_ROOT_PATH, PKG_JSON.main),
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [del({ targets: 'dist' }), terser(), ...commonPlugins(true)],
  },
  {
    input: INPUT_FILE,
    output: [
      {
        file: path.join(LERNA_ROOT_PATH, `dist/${safeName}.js`),
        name: safeName,
        format: 'umd',
        sourcemap: true,
      },
      {
        file: path.join(LERNA_ROOT_PATH, `dist/min/${safeName}.min.js`),
        name: safeName,
        format: 'umd',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: commonPlugins(false),
  },
];
