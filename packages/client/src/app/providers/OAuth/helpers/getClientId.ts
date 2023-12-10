import type { AxiosRequestConfig } from 'axios';
import { AxiosInstance } from '../../../../shared/axios/instance';
import { BASE_URL, REDIRECT_URL } from '../../../../constants';
import { TGetClientId } from './types';

export const getClientId = async () => {
  const params = {
    redirect_uri: REDIRECT_URL,
  };

  const config: AxiosRequestConfig = {
    url: `${BASE_URL}/oauth/yandex/service-id`,
    method: 'GET',
    params,
    responseType: 'json',
    withCredentials: true,
  };

  try {
    const result = await AxiosInstance<TGetClientId>(config);
    return result.data.service_id;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`Не удалось получить clientId`);
    }
    return '';
  }
};
