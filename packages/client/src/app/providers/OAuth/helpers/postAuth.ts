import type { AxiosRequestConfig } from 'axios';
import { AxiosInstance } from '../../../../shared/axios/instance';
import { BASE_URL, REDIRECT_URL } from '../../../../constants';

export const postAuth = async (code: string) => {
  const data = {
    code,
    redirect_uri: REDIRECT_URL,
  };

  const config: AxiosRequestConfig = {
    url: `${BASE_URL}/oauth/yandex`,
    method: 'POST',
    data,
    responseType: 'json',
    withCredentials: true,
  };

  const result = await AxiosInstance<unknown>(config);
  return result.data === 'OK';
};
