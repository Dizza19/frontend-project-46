import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  // Стили оформления кода
  stylistic.configs.recommended,
  // Основные правила JavaScript + Node
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      js,
    },
    extends: ['js/recommended'],
  },
  {
    ignores: ['coverage/**'],
  },
])
