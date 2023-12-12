import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export class CommentStore {
  baseUrl = `http://localhost:3001`;

  constructor() {
    this.baseUrl = `http://localhost:${__SERVER_PORT__}`;
  }

  // Создание комментария
  public createComment = async (reqData: {
    userId: number;
    text: string;
    userName: string;
    topicId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/comment`,
      method: 'POST',
      data: reqData,
    };
    try {
      const result = await axios(config);

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  // Получение всех комментариев топика
  public getAllCommentsFromTopic = async (topicId: number) => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/comment/${topicId}`,
      method: 'GET',
    };
    try {
      const result = await axios(config);

      return result.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };
}
