import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import type { ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
// import {  PRELOADED_STATE } from 'client/src/store'
import { createClientAndConnect } from './db';
// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from 'client/src/store/userSlice'
// import helpersSlice from 'client/src/store/helpersSlice'

// import {render}  from '../client/ssr'

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
  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  let distPath = '';
  let srcPath = '';
  let ssrClientPath = '';

  createClientAndConnect();

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
    let template: string;
    // let render: (url: string, state: any) => Promise<string>;

    let render: any;

    try {
      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );

        render = (await import(ssrClientPath)).render;
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );

        template = await vite!.transformIndexHtml(url, template);

        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
      }

      // let createStore: (
      //   preloadedState: Record<string, unknown> | undefined
      // ) => any;

      // if (!isDev()) {
      //   render = (await import(ssrClientPath)).render;
      //   // createStore = (await import(ssrClientPath)).createStore;
      // } else {
      //   render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
      //     .render;
      //   // createStore = (
      //   //   await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
      //   // ).createStore;
      // }

      const { appHTML, preloadedState } = await render(url);
      // const store = createStore(PRELOADED_STATE);
      // const store = createStore(undefined);
      // const store = configureStore({
      //   reducer: {
      //     user: userSlice,
      //     helpers: helpersSlice,
      //   },
      // });

      // const state = store.getState();

      // const appHTML = await render(url, store)
      // const state = store.getState();

      // const stateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
      //   state
      // ).replace(/</g, '\\u003c')}</script>`;
      //
      // const html = template.replace(`<!--ssr-outlet-->`, appHTML + stateHtml);
      //
      // res.status(200).set({ 'Content-Type': 'text/html' }).end(html);

      if (template) {
        const html = template
          .replace('<!--ssr-outlet-->', appHTML)
          .replace(
            '<!--preloaded-state-->',
            `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
              preloadedState
            ).replace(/</g, '\\u003c')}</script>`
          );

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
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
