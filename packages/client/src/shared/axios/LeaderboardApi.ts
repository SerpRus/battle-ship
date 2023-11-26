import { AxiosInstance } from './instance';

class LeaderboardApi {
  public addUser(data: any): Promise<any> {
    return AxiosInstance.post('leaderboard', {
      ...data,
    });
  }

  public getAll(data: any): Promise<any> {
    return AxiosInstance.post('leaderboard/all', {
      ...data,
    });
  }
}

export default new LeaderboardApi();
