import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IAuthContext, IUser } from './types';
import { ISignUpData } from '../../../pages/RegistrationPage/ui/registrationPage';
import { ILoginDataFieldType } from '../../../pages/LoginPage/ui/loginPage';

const authContext = createContext<IAuthContext>({} as IAuthContext);
export const baseUrl = 'https://ya-praktikum.tech/api/v2';

export function ProvideAuth({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); // const history = useHistory();

  const checkIsAuth = async () => {
    const configAxios: AxiosRequestConfig = {
      url: `${baseUrl}/auth/user`,
      method: 'GET',
      responseType: 'json',
    };
    setIsLoading(true);
    configAxios.withCredentials = true;
    return axios(configAxios)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setIsLoading(false);
          setUser(res.data);
          setIsAuth(true);
          return res.data;
        }
        return null;
      })
      .catch(err => {
        const errorMessage = JSON.parse(err.request.response);
        setIsLoading(false);
        setErrors([errorMessage?.reason]);
        return null;
      });
  };

  const login = async (data: Omit<ILoginDataFieldType, 'remember'>) => {
    const configAxios: AxiosRequestConfig = {
      url: `${baseUrl}/auth/signin`,
      method: 'POST',
      data,
      responseType: 'json',
    };
    setIsLoading(true);

    configAxios.withCredentials = true;

    return axios(configAxios)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setIsLoading(false);
          setUser(res.data);
          setIsAuth(true);
          toast.success('Вход выполнен');
          return true;
        }
        return false;
      })
      .catch(err => {
        const errorMessage = JSON.parse(err.request.response);
        setIsLoading(false);
        toast.error(errorMessage?.reason);
        setErrors([errorMessage?.reason]);
        return null;
      });
  };

  const logout = async () => {
    const configAxios: AxiosRequestConfig = {
      url: `${baseUrl}/auth/logout`,
      method: 'POST',
      responseType: 'json',
    };

    configAxios.withCredentials = true;
    setIsLoading(true);
    return axios(configAxios)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setUser({} as IUser);
          setIsLoading(false);
          setIsAuth(false);
          toast.success('Выполнен выход из системы');
          return true;
        }
        return false;
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Ошибка выхода из системы');
        setErrors(['Ошибка выхода из системы']);
        return false;
      });
  };

  const signUp = (data: ISignUpData) => {
    const configAxios: AxiosRequestConfig = {
      url: `${baseUrl}/auth/signup`,
      method: 'POST',
      data,
      responseType: 'json',
    };
    setIsLoading(true);

    configAxios.withCredentials = true;

    return axios(configAxios)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setIsLoading(false);
          // @ts-ignore
          this.checkIsAuth(); // eslint-disable-line
          toast.success('Пользователь создан успешно');
          return res.data;
        }
        return { reason: 'Not created' };
      })
      .catch(err => {
        const errorMessage = JSON.parse(err.request.response);
        setIsLoading(false);
        toast.error(errorMessage?.reason);
        setErrors([errorMessage?.reason]);
        return null;
      });
  };

  const value = useMemo(
    () => ({
      user,
      isAuth,
      checkIsAuth,
      login,
      logout,
      signUp,
      errors,
      isLoading,
    }),
    [user, errors, isLoading, isAuth]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
