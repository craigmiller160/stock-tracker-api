/* eslint-disable prettier/prettier */
const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-console': [
      'error',
      {
        allow: ['error']
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(process.cwd(), 'tsconfig.json')
          }
        }
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'error'
      }
    }
  ]
};