import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface HelpersStateProps {
  isFullScreen: boolean;
  error?: string;
}

const initialState: HelpersStateProps = {
  isFullScreen: false,
};

export const fullScreen = createAsyncThunk('helpers/fullScreen', async () => {
  try {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        await document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      await document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      await document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Ошибка включения полноэкранного режима`); // eslint-disable-line
    }
  }
});

export const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    toogleFullScreen: state => {
      state.isFullScreen = !state.isFullScreen;
    },
  },
  extraReducers: builder => {
    builder.addCase(fullScreen.rejected, (state, action) => {
      state.error = action.error.message;
      toast.error(action.error.message);
    });
  },
});

export default helpersSlice.reducer;
export const helpersActions = helpersSlice.actions;
