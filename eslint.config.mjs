import js from '@eslint/js';

const node = { process: 'readonly', URL: 'readonly', console: 'readonly', setTimeout: 'readonly' };
const browser = { document: 'readonly', window: 'readonly', getComputedStyle: 'readonly', HTMLImageElement: 'readonly' };

export default [
  js.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: { ecmaVersion: 2023, sourceType: 'module', globals: { ...node, ...browser } },
  },
];
