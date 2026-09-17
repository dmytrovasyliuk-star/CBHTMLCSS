import js from "@eslint/js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Global ignores (replaces deprecated .eslintignore)
  {
    ignores: ["node_modules/**", "dist/**", "script.js", "script.d.ts"],
  },
  js.configs.recommended,
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
