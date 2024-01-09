import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dotenv from 'dotenv';
import svgr from 'vite-plugin-svgr';
// import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [
    svgr(),
    react(),
    //   VitePWA({
    //     strategies: 'injectManifest',
    //     srcDir: 'src',
    //     filename: 'sw.js',
    //     includeAssets: ['/fonts/*.ttf', '*.svg', '/**/*.png', '/**/*.svg'],
    //   }),
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
  resolve: {
    alias: [
      { find: '@root', replacement: resolve(__dirname, 'src') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@shared', replacement: resolve(__dirname, 'src/shared') },
    ],
  },
});
