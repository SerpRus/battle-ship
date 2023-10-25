import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "./src/app/styles/scss/_vars.scss";
            @import "./src/app/styles/scss/base/_fonts.scss";
            @import "./src/app/styles/scss/base/_generic.scss";
            @import "./src/app/styles/scss/base/_include.scss";
            @import "./src/app/styles/scss/utils/_functions.scss";
            @import "./src/app/styles/scss/utils/_mixins.scss";
        `,
      },
    },
  },
});
