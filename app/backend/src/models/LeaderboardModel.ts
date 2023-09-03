import { ITeamAssociation } from '../Interfaces/teams/ITeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import BoardViewModel from './BoardViewModel';

export default class LeaderboardModel {
  private teamModel = SequelizeTeam;

  public async getPlaceLeaderboardInformation(local: string): Promise<ILeaderboard[]> {
    const finishedTeamsMatches = await this.getAllFinishedMatches(local);
    const formattedPlaceMatches = new BoardViewModel(finishedTeamsMatches, local);
    this.sortTeamInformation(formattedPlaceMatches.teamsLeaderboard);
    return formattedPlaceMatches.teamsLeaderboard;
  }

  public async getAllLeaderboardInformation(): Promise<ILeaderboard[]> {
    const finishedHomeMatches = await this.getAllFinishedMatches('home');
    const formattedHomeMatches = new BoardViewModel(finishedHomeMatches, 'home');
    const finishedAwayMatches = await this.getAllFinishedMatches('away');
    const formattedAwayMatches = new BoardViewModel(finishedAwayMatches, 'away');
    const formattedMatches = BoardViewModel.resumeLeaderboardInformation(
      formattedHomeMatches.teamsLeaderboard,
      formattedAwayMatches.teamsLeaderboard,
    );
    this.sortTeamInformation(formattedMatches);
    return formattedMatches;
  }

  private getAllFinishedMatches = async (local: string) => {
    if (local === 'home') {
      return await this.teamModel.findAll({
        include: [{
          model: SequelizeMatch,
          as: 'homeMatches',
          where: { inProgress: false },
        }],
      }) as unknown as ITeamAssociation[];
    }
    return await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'awayMatches',
        where: { inProgress: false },
      }],
    }) as unknown as ITeamAssociation[];
  };

  private sortTeamInformation = (array: ILeaderboard[]): void => {
    array.sort((a, b) => b.goalsFavor - a.goalsFavor);
    array.sort((a, b) => b.goalsBalance - a.goalsBalance);
    array.sort((a, b) => b.totalVictories - a.totalVictories);
    array.sort((a, b) => b.totalPoints - a.totalPoints);
  };
}
