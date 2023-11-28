import axios from 'axios';
import { baseUrl } from '../../app/providers/AuthProvider/constants';

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  transformResponse: [
    data => {
      let resp;
      try {
        if (data && data !== 'OK') {
          resp = JSON.parse(data);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      if (resp) {
        return resp;
      }

      return data;
    },
  ],
});
