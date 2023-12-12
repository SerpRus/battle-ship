import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ForumStore } from './baseStore';

export class SubscriptionStore extends ForumStore {
  // Подписка на топик
  public subscribeOnTopic = async (reqData: {
    userId: number;
    topicId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/subscription/${reqData.topicId}`,
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

  // Получение id пользователей, подписавшихся на топик
  public getSubscribersOfTopic = async (topicId: number) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/subscription/${topicId}`,
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
