import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import type { ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import bodyParser from 'body-parser';
// @ts-ignore
import { xss } from 'express-xss-sanitizer';
import routes from './app/routes';
import { startApp } from './app';

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(helmet.xssFilter());
  app.use((_, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
  app.use(bodyParser.json({ limit: '1kb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));
  app.use(xss());
  app.use(express.json());
  routes(app);
  startApp();

  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  let distPath = '';
  let srcPath = '';
  let ssrClientPath = '';

  if (isDev()) {
    distPath = path.dirname(require.resolve('client/dist/index.html'));
    srcPath = path.dirname(require.resolve('client'));
    ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    distPath = path.dirname(require.resolve('../../client/dist/index.html'));
    ssrClientPath = require.resolve('../../client/ssr-dist/client.cjs');
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

      let render: (url: string, state: any) => Promise<string>;
      let createStore: (
        preloadedState: Record<string, unknown> | undefined
      ) => any;

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

      const store = createStore(undefined);
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
