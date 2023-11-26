import { configureStore } from '@reduxjs/toolkit';
import userSlice, { IS_AUTH } from './userSlice';
import helpersSlice from './helpersSlice';
import { saveState } from './storage';

export const store = configureStore({
  reducer: {
    user: userSlice,
    helpers: helpersSlice,
  },
});

store.subscribe(() => {
  saveState({ isAuth: store.getState().user.isAuth }, IS_AUTH);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export default store;
