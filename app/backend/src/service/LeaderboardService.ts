import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
// import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/leaderboardModel';

export default class LeaderboardService {
  constructor(private teamModel = new LeaderboardModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<any>> {
    // const allTeams = await this.teamModel.findAll();
    const allTeams = await this.teamModel.getHomeLeaderboardInformation();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
