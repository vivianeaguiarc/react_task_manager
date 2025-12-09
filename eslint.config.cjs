// -------------------------------------------------------
// ESLint Flat Config + React + Prettier + Tailwind
// -------------------------------------------------------

const js = require("@eslint/js")
const globals = require("globals")

// Plugins
const reactPlugin = require("eslint-plugin-react")
const reactHooks = require("eslint-plugin-react-hooks")
const reactRefresh = require("eslint-plugin-react-refresh")
const simpleImportSort = require("eslint-plugin-simple-import-sort")
const prettierConfig = require("eslint-config-prettier")

module.exports = [
  // Ignorar arquivos e pastas
  {
    ignores: ["dist", "node_modules"],
  },

  {
    files: ["**/*.{js,jsx}"],

    // Plugins
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },

    // Ambiente & linguagem
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    // Regras recomendadas do JS
    ...js.configs.recommended,

    // Configurações React
    settings: {
      react: { version: "18.2" },
    },

    // Regras
    rules: {
      // React
      "react/jsx-no-target-blank": "off",

      // Hooks obrigatório
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Import Sort
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      // Clean code
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },

  // 🔥 Adiciona Prettier por último para sobrescrever regras conflitantes
  prettierConfig,
]
