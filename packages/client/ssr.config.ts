import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: ['/fonts/*.ttf', '*.svg', '/**/*.png', '/**/*.svg'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "../client/src/app/styles/scss/_vars.scss";
            @import "../client/src/app/styles/scss/base/_fonts.scss";
            @import "../client/src/app/styles/scss/base/_generic.scss";
            @import "../client/src/app/styles/scss/base/_include.scss";
            @import "../client/src/app/styles/scss/utils/_functions.scss";
            @import "../client/src/app/styles/scss/utils/_mixins.scss";
        `,
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  resolve: {
    alias: [
      { find: '@shared', replacement: resolve(__dirname, 'src/shared') },
      { find: '@root', replacement: resolve(__dirname) },
    ],
  },
});
