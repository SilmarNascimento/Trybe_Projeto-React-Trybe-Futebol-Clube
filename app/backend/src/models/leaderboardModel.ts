// import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { IMatch } from 'src/Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class LeaderboardModel {
  private teamModel = SequelizeTeam;
  private matchModel = SequelizeMatch;

  async getHomeLeaderboardInformation(): Promise<any> {
    const dbTeams = await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'homeMatches',
        where: { inProgress: false },
      }],
    });
    return dbTeams;
  }

  async getAwayLeaderboardInformation(): Promise<any> {
    const finishedTeamsMatches = await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'awayMatches',
        where: { inProgress: false },
      }],
    });
    const formattedHomeMatches = finishedTeamsMatches.map((team) => {

    });
    return finishedTeamsMatches;
  }

  getTotalPoints = (array: IMatch[]) => array.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc;
  }, 0);

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

  /* async getHomeLeaderboardInformation(): Promise<any> {
    const teams = await this.teamModel.findAll();
    const finishedMatches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: ['teamName'],
      }],
    });
    const teamsHomeMatches = teams.map((team) => {
      const { id } = team;
      const teamHomeMatches = finishedMatches.filter((match) => match.homeTeamId === id);
      return { ...team.dataValues, homeMatches: teamHomeMatches };
    });
    return teamsHomeMatches;
  } */
}
