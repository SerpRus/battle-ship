import axios, { AxiosRequestConfig } from 'axios';
import { ForumStore } from './baseStore';

export class CommentStore extends ForumStore {
  // Создание комментария
  public createComment = async (reqData: {
    userId: number;
    text: string;
    userName: string;
    topicId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/comment`,
      method: 'POST',
      data: reqData,
    };
    const result = await axios(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };

  // Получение всех комментариев топика
  public getAllCommentsFromTopic = async (topicId: number) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/comment/${topicId}`,
      method: 'GET',
    };
    const result = await axios(config);
    // eslint-disable-next-line no-console
    console.log(result.data);
    return result.data;
  };
}
