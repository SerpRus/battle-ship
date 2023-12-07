import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import type { ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { createServer as createViteServer } from 'vite';
import type { StoreProps } from 'client/src/store';

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

  // createClientAndConnect();

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );

        template = await vite!.transformIndexHtml(url, template);
      }

      let render: (url: string, store: StoreProps) => Promise<string>;
      let createStore: (preloadedState: StoreProps | undefined) => any;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
        createStore = (await import(ssrClientPath)).createStore;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
        createStore = (
          await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
        ).createStore;
      }

      const store = createStore({
        user: {
          // TODO: реализовать запрос на сервер
          isAuth: false,
        },
        helpers: {
          isFullScreen: false,
        },
      });
      const state = store.getState();
      const appHtml = await render(url, store);
      const stateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        state
      ).replace(/</g, '\\u003c')}</script>`;

      const html = template.replace(`<!--ssr-outlet-->`, appHtml + stateHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`); // eslint-disable-line
  });
}

startServer();
