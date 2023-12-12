import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export class ReplyStore {
  baseUrl = `http://localhost:3001`;

  constructor() {
    this.baseUrl = `http://localhost:${__SERVER_PORT__}`;
  }

  // Добавить ответ на комментарий
  public addReplyToComment = async (reqData: {
    text: string;
    userName: string;
    topicId: number;
    commentId: number;
    parentReplyId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/reply/${reqData.commentId}`,
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

  // Получить все ответы внутри комментария
  public getAllReplyInComment = async (reqData: {
    topicId: number;
    commentId: number;
  }) => {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}/api/reply/${reqData.topicId}?commentId=1`,
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
