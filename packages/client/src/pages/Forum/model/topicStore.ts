import axios, { AxiosRequestConfig } from 'axios';
import { ForumStore } from './baseStore';

type TTopic = {
  id: number;
  title: string;
  description: string;
  user_name: string;
  timestamp: number;
};

export class TopicStore extends ForumStore {
  // Получение всех топиков
  public getAllTopics = async () => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/topic`,
      method: 'GET',
    };
    const result = await axios<Array<TTopic>>(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };

  // Создание топика
  public createTopic = async (reqData: {
    title: number;
    description: string;
    userId: number;
    userName: string;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/topic`,
      method: 'POST',
      data: reqData,
    };
    const result = await axios(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };

  // Получение топика по id
  public getTopicById = async (id: number) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/topic`,
      method: 'POST',
      data: { id },
    };
    const result = await axios(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };
}
