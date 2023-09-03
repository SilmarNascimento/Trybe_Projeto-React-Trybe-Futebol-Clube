import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private teamModel = new LeaderboardModel()) {}

  public async getPlaceLeaderboardInformation(
    local: string,
  ): Promise<ServiceResponse<ILeaderboard[]>> {
    const placeLeaderboard = await this.teamModel.getPlaceLeaderboardInformation(local);
    return { status: 'SUCCESSFUL', data: placeLeaderboard };
  }

  public async getAllLeaderboardInformation(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.teamModel.getAllLeaderboardInformation();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
