// import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardModel {
  private teamModel = SequelizeTeam;
  private matchModel = SequelizeMatch;

  async getHomeLeaderboardInformation(): Promise<any> {
    const finishedTeamsMatches = await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'homeMatches',
        where: { inProgress: false },
      }],
    });
    const formattedHomeMatches = this.resumeTeamInformation(finishedTeamsMatches);
    return formattedHomeMatches;
  }

  async getAwayLeaderboardInformation(): Promise<any> {
    const finishedTeamsMatches = await this.teamModel.findAll({
      include: [{
        model: SequelizeMatch,
        as: 'awayMatches',
        where: { inProgress: false },
      }],
    });
    const formattedHomeMatches = this.resumeTeamInformation(finishedTeamsMatches);
    return formattedHomeMatches;
  }

  resumeTeamInformation = (array: SequelizeTeam[]) => array.map((team: ITeam) => {
    const { teamName, homeMatches } = team;
    if (homeMatches) {
      const teamInformation = { name: teamName } as ILeaderboard;
      teamInformation.totalGames = homeMatches.length;
      teamInformation.totalVictories = this.getTotalVictories(homeMatches);
      teamInformation.totalDraws = this.getTotalDraws(homeMatches);
      teamInformation.totalLosses = this.getTotalLosses(homeMatches);
      teamInformation.totalPoints = teamInformation.totalVictories * 3 + teamInformation.totalDraws;
      teamInformation.goalsFavor = this.getGoalsFavor(homeMatches);
      teamInformation.goalsOwn = this.getGoalsOwn(homeMatches);
      teamInformation.goalsBalance = teamInformation.goalsFavor - teamInformation.goalsOwn;
      const efficiency = teamInformation.totalPoints / (teamInformation.totalGames * 3);
      teamInformation.efficiency = efficiency * 100;
      return teamInformation;
    }
    return null;
  });

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
