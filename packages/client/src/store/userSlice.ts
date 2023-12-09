import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IUser } from '../app/providers/AuthProvider/types';
import { ILoginDataFieldType } from '../pages/LoginPage/ui/loginPage';
import AuthApi from '../shared/axios/AuthApi';
import { loadState } from './storage';
import { ISignUpData } from '../pages/RegistrationPage/ui/registrationPage';

export const IS_AUTH = 'userData';

export interface isAuthState {
  isAuth: boolean;
}

export interface StateProps {
  isAuth: boolean;
  isLoading?: boolean;
  error?: string;
  id?: number;
  user?: IUser;
}

const initialState: StateProps = {
  isAuth: loadState<isAuthState>(IS_AUTH)?.isAuth ?? false,
};

export const login = createAsyncThunk(
  'user/login',
  async (params: Omit<ILoginDataFieldType, 'remember'>) => {
    try {
      await AuthApi.login(params);

      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.reason);
      }
      return false;
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await AuthApi.logout();

    return false;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.reason);
    }
    return true;
  }
});

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const { data } = await AuthApi.getUser();

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.reason);
    }
    return false;
  }
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async (params: ISignUpData) => {
    try {
      const { data } = await AuthApi.createUser(params);

      return data.id;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.reason);
      }
      return false;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state: StateProps) => {
      state.error = undefined;
    },
    setOnLoading: state => {
      state.isLoading = true;
    },
    setOffLoading: state => {
      state.isLoading = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = action.payload;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.id = action.payload;
      toast.success('Пользователь создан успешно');
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
