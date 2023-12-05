import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'client/src/store/userSlice';
import helpersSlice from 'client/src/store/helpersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    helpers: helpersSlice,
  },
});
