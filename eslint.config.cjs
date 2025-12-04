// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//     },
//   },
// ])

const js = require("@eslint/js")
const globals = require("globals")

// Plugins
const reactPlugin = require("eslint-plugin-react")
const reactHooks = require("eslint-plugin-react-hooks")
const reactRefresh = require("eslint-plugin-react-refresh")

module.exports = [
  // 1. Ignorar arquivos
  {
    ignores: ["dist", ".eslintrc.cjs", "node_modules"],
  },

  // 2. Configuração Base
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],

    // A. Plugins (Flat Config)
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
    },

    // B. Opções de linguagem (AQUI que entra parserOptions!)
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    // C. Recomendações padrão do ESLint
    ...js.configs.recommended,

    // D. Settings
    settings: {
      react: { version: "18.2" },
    },

    // E. Regras
    rules: {
      // Regras React
      "react/jsx-no-target-blank": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Outras regras opcionais
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
]
