import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ForumStore } from './baseStore';

export class ReplyStore extends ForumStore {
  // Добавить ответ на комментарий
  public addReplyToComment = async (reqData: {
    text: string;
    userName: string;
    topicId: number;
    commentId: number;
    parentReplyId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/reply/${reqData.commentId}`,
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

  // Получить все ответы внутри комментария
  public getAllReplyInComment = async (reqData: {
    topicId: number;
    commentId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${ForumStore.baseUrl}/api/reply/${reqData.topicId}?commentId=1`,
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
