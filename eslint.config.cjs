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

// eslint.config.cjs
const js = require('@eslint/js');
const globals = require('globals');

// Plugins
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');

module.exports = [
  // 1. Ignorar arquivos
  {
    ignores: ['dist', '.eslintrc.cjs', 'node_modules'],
  },

  // 2. Configuração Base
  {
    files: ['**/*.{js,jsx,mjs,cjs}'], 
    
    // A. Plugins (registro - FORMATO CORRETO DO FLAT CONFIG)
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    
    // B. Linguagem/Ambiente e Parser
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
      sourceType: 'module',
      
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },

    // C. Configurações Compartilhadas (Extends)
    // NOTE: Se o plugin não exportar o objeto de Flat Config corretamente, 
    // você tem que aplicar as regras manualmente, ou usar o objeto exportado.
    ...js.configs.recommended, 
    
    // D. Settings
    settings: {
      react: { 
        version: '18.2'
      },
    },

    // E. Regras (Incluindo as regras de Hooks e Refresh)
    rules: {
      // Regras que substituem 'plugin:react/recommended' e 'plugin:react/jsx-runtime'
      // Se não quiser reescrever todas as regras, use o objeto de configuração correto do plugin
      
      'react/jsx-no-target-blank': 'off',
      // Regras de Hooks (Substituindo 'plugin:react-hooks/recommended')
      'react-hooks/rules-of-hooks': 'error', 
      'react-hooks/exhaustive-deps': 'warn', 
      
      // Regra de Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Adicione outras regras do React que você precisa aqui
      // Exemplo: 'react/react-in-jsx-scope': 'off', 
    },
  },
];