// ESLint v9 flat config for the MSI-Vue project (ESM, because package.json has "type": "module").

import vue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import accessibility from 'eslint-plugin-vuejs-accessibility';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'public/**',
      'packages/**',
      '**/eslint.config.js',
      'vite.config.js',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],

    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: false,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    plugins: {
      vue,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'vuejs-accessibility': accessibility,
    },

    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'vuejs-accessibility/click-events-have-key-events': 'off',
      'vuejs-accessibility/label-has-for': 'off',
      'vue/require-v-for-key': 'off',
      'class-methods-use-this': 'off',
      'vue/require-valid-default-prop': 'off',
      'linebreak-style': 'off',
      'import/prefer-default-export': 'off',
      'default-param-last': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: 1,
      }],
    },
  },
];
