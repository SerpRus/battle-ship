import { AxiosInstance } from './instance';

type SeachDataType = {
  avatar: string | null;
  display_name: string | null;
  first_name: string;
  id: number;
  login: string;
  second_name: string;
};

class UsersApi {
  public search(login: string): Promise<SeachDataType> {
    return AxiosInstance.post(`user/search`, {
      login,
    });
  }
}

export default new UsersApi();
