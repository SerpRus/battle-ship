import { AxiosError } from 'axios';
import { AxiosInstance } from './axiosInstance';

export class SubscriptionStore {
  // Подписка на топик
  public subscribeOnTopic = async (reqData: {
    userId: number;
    topicId: number;
  }) => {
    try {
      const result = await AxiosInstance.post(
        `/api/subscription/${reqData.topicId}`,
        reqData
      );

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  // Получение id пользователей, подписавшихся на топик
  public getSubscribersOfTopic = async (topicId: number) => {
    try {
      const result = await AxiosInstance.get(`/api/subscription/${topicId}`);

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };
}
