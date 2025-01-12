import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  ...compat.config({
    extends: [
      // Você pode colocar aqui o core-web-vitals e o typescript também
      'next',
      'next/core-web-vitals',
      'next/typescript'
    ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off'
    },
  }),
]
