import axios, { AxiosError, AxiosRequestConfig } from 'axios';

type TTopic = {
  id: number;
  title: string;
  description: string;
  user_name: string;
  time_stamp: number;
};

export class TopicStore {
  baseUrl = `http://localhost:3001`;

  constructor() {
    this.baseUrl = `http://localhost:${__SERVER_PORT__}`;
  }

  // Получение всех топиков
  public getAllTopics = async () => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/topic`,
      method: 'GET',
    };
    try {
      const result = await axios<Array<TTopic>>(config);
      // eslint-disable-next-line no-console
      console.log(result.data);
      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  // Создание топика
  public createTopic = async (reqData: {
    title: string;
    description: string;
    userId: number;
    userName: string;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/topic`,
      method: 'POST',
      data: reqData,
    };
    try {
      const result = await axios(config);
      // eslint-disable-next-line no-console
      console.log(result.data);
      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  // Получение топика по id
  public getTopicById = async (id: number) => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/topic/${id}`,
      method: 'GET',
    };
    try {
      const result = await axios(config);
      // eslint-disable-next-line no-console
      console.log(result.data);
      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };
}
