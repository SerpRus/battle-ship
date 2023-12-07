import { StoreProps } from './store';

declare global {
  const __SERVER_PORT__: number;

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __PRELOADED_STATE__?: StoreProps;
  }
}

export {};
