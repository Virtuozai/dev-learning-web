module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      2,
      { singleline: { delimiter: 'semi' }, multiline: { delimiter: 'none' } },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    '@typescript-eslint/indent': [2, 2],
    semi: [2, 'never'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 0,
    'object-curly-newline': 0,
    'react/state-in-constructor': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/jsx-wrap-multilines': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/no-unused-state': 0,
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
  },
}
