// import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ITeamAssociation } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardModel {
  private teamModel = SequelizeTeam;
  private matchModel = SequelizeMatch;

  async getHomeLeaderboardInformation(): Promise<ILeaderboard[]> {
    const finishedTeamsMatches = await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'homeMatches',
        where: { inProgress: false },
      }],
    }) as unknown as ITeamAssociation[];
    const formattedHomeMatches = this.resumeTeamInformation(finishedTeamsMatches, 'home');
    this.sortTeamInformation(formattedHomeMatches);
    return formattedHomeMatches;
  }

  async getAwayLeaderboardInformation(): Promise<ILeaderboard[]> {
    const finishedTeamsMatches = await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'awayMatches',
        where: { inProgress: false },
      }],
    }) as unknown as ITeamAssociation[];
    const formattedAwayMatches = this.resumeTeamInformation(finishedTeamsMatches, 'away');
    this.sortTeamInformation(formattedAwayMatches);
    return formattedAwayMatches;
  }

  resumeTeamInformation = (array: ITeamAssociation[], local: string) => array.map((team) => {
    const place = local === 'home' ? team.homeMatches : team.awayMatches;

    const teamInformation = { name: team.teamName } as ILeaderboard;
    teamInformation.totalGames = place.length;
    teamInformation.totalVictories = this.getTotalVictories(place);
    teamInformation.totalDraws = this.getTotalDraws(place);
    teamInformation.totalLosses = this.getTotalLosses(place);
    teamInformation.totalPoints = teamInformation.totalVictories * 3 + teamInformation.totalDraws;
    teamInformation.goalsFavor = this.getGoalsFavor(place);
    teamInformation.goalsOwn = this.getGoalsOwn(place);
    teamInformation.goalsBalance = teamInformation.goalsFavor - teamInformation.goalsOwn;
    const efficiency = teamInformation.totalPoints / (teamInformation.totalGames * 3);
    teamInformation.efficiency = Number((efficiency * 100).toFixed(2));
    return teamInformation;
  });

  sortTeamInformation = (array: ILeaderboard[]): void => {
    array.sort((a, b) => b.goalsFavor - a.goalsFavor);
    array.sort((a, b) => b.goalsBalance - a.goalsBalance);
    array.sort((a, b) => b.totalVictories - a.totalVictories);
  };

  getTotalVictories = (array: IMatch[]) => array.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  getTotalDraws = (array: IMatch[]) => array.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  getTotalLosses = (array: IMatch[]) => array.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  getGoalsFavor = (array: IMatch[]) => array.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

  getGoalsOwn = (array: IMatch[]) => array.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
}
