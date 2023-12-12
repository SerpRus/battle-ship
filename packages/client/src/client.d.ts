declare global {
  const __SERVER_PORT__: number;

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __PRELOADED_STATE__?: Record<string, Record<string, unknown>>;
  }
}

export {};
export const serverport = __SERVER_PORT__;
