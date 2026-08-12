/**
 * ==========================================================
 * Arquivo: eslint.config.js
 *
 * Configuração principal do ESLint.
 *
 * O projeto utiliza o Flat Config, formato padrão
 * utilizado pelas versões atuais do ESLint.
 * ==========================================================
 */

import js from "@eslint/js";
import globals from "globals";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import tseslint from "typescript-eslint";


export default tseslint.config(

  /**
   * Ignora arquivos e pastas que não precisam
   * passar pelo ESLint.
   */
  {
    ignores: [
      "dist",
      "node_modules",
      "coverage",
      "*.config.js",
    ],
  },


  /**
   * Regras recomendadas do JavaScript.
   */
  js.configs.recommended,


  /**
   * Regras recomendadas do TypeScript.
   */
  ...tseslint.configs.recommended,


  /**
   * Configuração específica do projeto.
   */
  {
    files: [
      "**/*.{js,jsx,ts,tsx}",
    ],

    languageOptions: {
      ecmaVersion: "latest",

      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {

      /**
       * Regras relacionadas aos Hooks do React.
       */
      ...reactHooks.configs.flat.recommended.rules,

      /**
       * Garante que componentes exportados
       * possam ser utilizados corretamente
       * com o Vite Fast Refresh.
       */
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

    },
  },

);
