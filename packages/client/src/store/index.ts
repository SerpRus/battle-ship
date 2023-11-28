import { configureStore } from '@reduxjs/toolkit';
import userSlice, { IS_AUTH } from './userSlice';
import helpersSlice from './helpersSlice';
import { saveState } from './storage';

export const PRELOADED_STATE =
  typeof window !== 'undefined'
    ? window.__PRELOADED_STATE__
    : {
        user: null,
        helpers: null,
      };

export const createStore = (
  preloadedState: Record<string, unknown> | undefined
) =>
  configureStore({
    reducer: {
      user: userSlice,
      helpers: helpersSlice,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState,
  });

const store = createStore(PRELOADED_STATE);

store.subscribe(() => {
  saveState({ isAuth: store.getState().user?.isAuth || false }, IS_AUTH);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export default store;
