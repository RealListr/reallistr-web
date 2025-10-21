import js from '@eslint/js';
export default [
  { ignores: ['node_modules/**', '.next/**', 'public/**', 'src/**/*.bak.tsx', 'src/**/__snapshots__/**', 'src/app__bk_*/**'] },
  js.configs.recommended,
];
