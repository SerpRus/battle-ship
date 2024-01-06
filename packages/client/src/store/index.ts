import { configureStore } from '@reduxjs/toolkit';
import userSlice, { IS_AUTH, StateProps } from './userSlice';
import helpersSlice, { HelpersStateProps } from './helpersSlice';
import { saveState } from './storage';

export const PRELOADED_STATE =
  typeof window !== 'undefined'
    ? // @ts-ignore
      window.__PRELOADED_STATE__
    : {
        user: {
          isAuth: false,
        },
        helpers: {
          isFullScreen: false,
        },
      };

export interface StoreProps {
  user: StateProps;
  helpers: HelpersStateProps;
}

export const createStore = (preloadedState: StoreProps | undefined) =>
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
