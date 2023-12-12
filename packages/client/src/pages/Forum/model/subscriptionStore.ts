import axios, { AxiosRequestConfig } from 'axios';
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
    const result = await axios(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };

  // Получение id пользователей, подписавшихся на топик
  public getSubscribersOfTopic = async (topicId: number) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/subscription/${topicId}`,
      method: 'GET',
    };
    const result = await axios(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };
}
