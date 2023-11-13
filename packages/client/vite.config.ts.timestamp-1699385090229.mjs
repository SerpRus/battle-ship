// vite.config.ts
import { defineConfig } from 'file:///Users/mpankratov/YMF/battle-ship/node_modules/vite/dist/node/index.js';
import react from 'file:///Users/mpankratov/YMF/battle-ship/node_modules/@vitejs/plugin-react/dist/index.mjs';
import { resolve } from 'path';
import dotenv from 'file:///Users/mpankratov/YMF/battle-ship/node_modules/dotenv/lib/main.js';
import svgr from 'file:///Users/mpankratov/YMF/battle-ship/node_modules/vite-plugin-svgr/dist/index.js';
import { VitePWA } from 'file:///Users/mpankratov/YMF/battle-ship/node_modules/vite-plugin-pwa/dist/index.mjs';
var __vite_injected_original_dirname =
  '/Users/mpankratov/YMF/battle-ship/packages/client';
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    svgr(),
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: ['*.ttf'],
    }),
  ],
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
  resolve: {
    alias: [
      {
        find: '@shared',
        replacement: resolve(__vite_injected_original_dirname, 'src/shared'),
      },
      { find: '@root', replacement: resolve(__vite_injected_original_dirname) },
    ],
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbXBhbmtyYXRvdi9ZTUYvYmF0dGxlLXNoaXAvcGFja2FnZXMvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbXBhbmtyYXRvdi9ZTUYvYmF0dGxlLXNoaXAvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tcGFua3JhdG92L1lNRi9iYXR0bGUtc2hpcC9wYWNrYWdlcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXG4gIH0sXG4gIGRlZmluZToge1xuICAgIF9fU0VSVkVSX1BPUlRfXzogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBzdmdyKCksXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHN0cmF0ZWdpZXM6ICdpbmplY3RNYW5pZmVzdCcsXG4gICAgICBzcmNEaXI6ICdzcmMnLFxuICAgICAgZmlsZW5hbWU6ICdzdy5qcycsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJyoudHRmJ10sXG4gICAgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9hcHAvc3R5bGVzL3Njc3MvX3ZhcnMuc2Nzc1wiO1xuICAgICAgICAgICAgQGltcG9ydCBcIi4vc3JjL2FwcC9zdHlsZXMvc2Nzcy9iYXNlL19mb250cy5zY3NzXCI7XG4gICAgICAgICAgICBAaW1wb3J0IFwiLi9zcmMvYXBwL3N0eWxlcy9zY3NzL2Jhc2UvX2dlbmVyaWMuc2Nzc1wiO1xuICAgICAgICAgICAgQGltcG9ydCBcIi4vc3JjL2FwcC9zdHlsZXMvc2Nzcy9iYXNlL19pbmNsdWRlLnNjc3NcIjtcbiAgICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9hcHAvc3R5bGVzL3Njc3MvdXRpbHMvX2Z1bmN0aW9ucy5zY3NzXCI7XG4gICAgICAgICAgICBAaW1wb3J0IFwiLi9zcmMvYXBwL3N0eWxlcy9zY3NzL3V0aWxzL19taXhpbnMuc2Nzc1wiO1xuICAgICAgICBgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogJ0BzaGFyZWQnLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc2hhcmVkJykgfSxcbiAgICAgIHsgZmluZDogJ0Byb290JywgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lKSB9LFxuICAgIF0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxvQkFBb0I7QUFDbFcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsZUFBZTtBQUx4QixJQUFNLG1DQUFtQztBQU96QyxPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJO0FBQUEsRUFDL0I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGVBQWUsQ0FBQyxPQUFPO0FBQUEsSUFDekIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFRbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLFdBQVcsYUFBYSxRQUFRLGtDQUFXLFlBQVksRUFBRTtBQUFBLE1BQ2pFLEVBQUUsTUFBTSxTQUFTLGFBQWEsUUFBUSxnQ0FBUyxFQUFFO0FBQUEsSUFDbkQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
