import { AxiosError } from 'axios';
import { AxiosInstance } from './axiosInstance';

export class CommentStore {
  // Создание комментария
  public createComment = async (reqData: {
    userId: number;
    text: string;
    userName: string;
    topicId: number;
  }) => {
    try {
      const result = await AxiosInstance.post('/api/comment', reqData);

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  // Получение всех комментариев топика
  public getAllCommentsFromTopic = async (topicId: number) => {
    try {
      const result = await AxiosInstance.get(`/api/comment/${topicId}`);

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };
}
