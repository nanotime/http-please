// vite.config.js

/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      name: 'http-please',
      formats: ['es'],
      entry: {
        // eslint-disable-next-line no-undef
        index: resolve(__dirname, './src/composite.js'),
        // eslint-disable-next-line no-undef
        plugins: resolve(__dirname, './src/plugins/index.js'),
      },
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
  },
});
