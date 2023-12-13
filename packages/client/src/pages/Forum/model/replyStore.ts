import { AxiosError } from 'axios';
import { AxiosInstance } from './axiosInstance';

export class ReplyStore {
  // Добавить ответ на комментарий
  public addReplyToComment = async (reqData: {
    text: string;
    userName: string;
    topicId: number;
    commentId: number;
    parentReplyId: number;
  }) => {
    try {
      const result = await AxiosInstance.post(
        `/api/reply/${reqData.commentId}`,
        reqData
      );

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
    try {
      const result = await AxiosInstance.get(
        `/api/reply/${reqData.topicId}?commentId=${reqData.commentId}`
      );

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };
}
