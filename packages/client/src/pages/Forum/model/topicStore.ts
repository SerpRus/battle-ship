import { AxiosError } from 'axios';
import { AxiosInstance } from './axiosInstance';

export class TopicStore {
  // Получение всех топиков
  public getAllTopics = async () => {
    try {
      const result = await AxiosInstance.get(`/api/topic`);

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
    try {
      const result = await AxiosInstance.post('/api/topic', reqData);
      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  // Получение топика по id
  public getTopicById = async (id: number) => {
    try {
      const result = await AxiosInstance.get(`/api/topic/${id}`);

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };
}
