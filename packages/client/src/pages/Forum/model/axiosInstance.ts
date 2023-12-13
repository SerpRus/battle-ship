import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: `http://localhost:${__SERVER_PORT__}`,
  timeout: 30000,
  withCredentials: false,
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
