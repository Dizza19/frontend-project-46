import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: [
      'coverage/**',
      '**/coverage/**',
      'code/coverage/**',
      '**/code/coverage/**',
      '/project/code/coverage/**',
    ],
  },
  js.configs.recommended,
  stylistic.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
]
