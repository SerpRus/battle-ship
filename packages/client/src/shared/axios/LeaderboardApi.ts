import { AxiosInstance } from './instance';
import type {
  UserRatingFullDataType,
  GetAllUsersRatingDataType,
  UsersRatingDataType,
} from '../types/leaderBoardTypes';

class LeaderboardApi {
  public addUser(data: UserRatingFullDataType) {
    return AxiosInstance.post('leaderboard', {
      ...data,
    });
  }

  public async getAll(
    data: GetAllUsersRatingDataType
  ): Promise<UsersRatingDataType[]> {
    const response = await AxiosInstance.post('leaderboard/all', {
      ...data,
    });

    return response.data;
  }
}

export default new LeaderboardApi();
