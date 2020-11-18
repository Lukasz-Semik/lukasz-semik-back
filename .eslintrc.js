// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: null,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'max-len': [
      'error',
      { code: 100, ignorePattern: '^(import|export)\\W.*', ignoreUrls: true },
    ],
    'simple-import-sort/sort': [
      1,
      {
        groups: [
          ['^\\u0000'],
          ['^@?\\w'],
          [
            '^(src/entities)(/.*|$)',
            '^(src/modules)(/.*|$)',
            '^(src/helpers)(/.*|$)',
            '^[^.]',
          ],
          ['^\\.'],
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
};
