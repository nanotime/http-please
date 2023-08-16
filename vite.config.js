// vite.config.js

/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'src/composite.js'),
      name: 'http-please',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [
    dts({
      include: ['src/composite.js'],
      beforeWriteFile: (filePath, content) => {
        return {
          filePath: filePath.replace(
            // eslint-disable-next-line no-undef
            'dist/composite.d.ts',
            'dist/index.d.ts'
          ),
          content,
        };
      },
    }),
  ],
  test: {},
});
