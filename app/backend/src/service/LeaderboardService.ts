import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/leaderboardModel';

export default class LeaderboardService {
  constructor(private teamModel = new LeaderboardModel()) {}

  public async getAllTeams(local: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.getLeaderboardInformation(local);
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
