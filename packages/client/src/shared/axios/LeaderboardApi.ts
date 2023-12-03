import { AxiosInstance } from './instance';
import type {
  UserRatingFullDataType,
  getAllUsersRatingData,
  usersRatingData,
} from '../types/leaderBoardTypes';

class LeaderboardApi {
  public addUser(data: UserRatingFullDataType) {
    return AxiosInstance.post('leaderboard', {
      ...data,
    });
  }

  public async getAll(data: getAllUsersRatingData): Promise<usersRatingData[]> {
    const response = await AxiosInstance.post('leaderboard/all', {
      ...data,
    });

    return response.data;
  }
}

export default new LeaderboardApi();
