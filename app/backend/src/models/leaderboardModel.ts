// import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class LeaderboardModel {
  private ormModel = SequelizeTeam;

  async findAll(): Promise<any> {
    const dbTeams = await this.ormModel.findAll();
    return dbTeams;
  }
}
