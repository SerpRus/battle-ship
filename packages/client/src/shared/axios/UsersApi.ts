import { AxiosInstance } from './instance';

class UsersApi {
  public getUserById(id: string): Promise<any> {
    return AxiosInstance.get(`user/${id}`);
  }
}

export default new UsersApi();
