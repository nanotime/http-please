// vite.config.js

/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      name: 'http-please',
      formats: ['es'],
      entry: {
        index: new URL('./src/index.ts', import.meta.url).pathname,
      },
    },
  },
  plugins: [dts()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
  },
});
