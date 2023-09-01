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

  async getLeaderboardInformation(local: string): Promise<ILeaderboard[]> {
    const finishedTeamsMatches = await this.getAllFinishedMatches(local);
    const formattedHomeMatches = this.resumeTeamInformation(finishedTeamsMatches, local);
    this.sortTeamInformation(formattedHomeMatches);
    return formattedHomeMatches;
  }

  getAllFinishedMatches = async (local: string) => {
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

  resumeTeamInformation = (array: ITeamAssociation[], local: string) => array.map((team) => {
    const place = local === 'home' ? team.homeMatches : team.awayMatches;

    const teamInformation = { name: team.teamName } as ILeaderboard;
    teamInformation.totalGames = place.length;
    teamInformation.totalVictories = this.getTotalVictories(place, local);
    teamInformation.totalDraws = this.getTotalDraws(place);
    teamInformation.totalLosses = this.getTotalLosses(place, local);
    teamInformation.totalPoints = teamInformation.totalVictories * 3 + teamInformation.totalDraws;
    teamInformation.goalsFavor = this.getGoalsFavor(place, local);
    teamInformation.goalsOwn = this.getGoalsOwn(place, local);
    teamInformation.goalsBalance = teamInformation.goalsFavor - teamInformation.goalsOwn;
    const efficiency = teamInformation.totalPoints / (teamInformation.totalGames * 3);
    teamInformation.efficiency = (efficiency * 100).toFixed(2);
    return teamInformation;
  });

  sortTeamInformation = (array: ILeaderboard[]): void => {
    array.sort((a, b) => b.goalsFavor - a.goalsFavor);
    array.sort((a, b) => b.goalsBalance - a.goalsBalance);
    array.sort((a, b) => b.totalVictories - a.totalVictories);
    array.sort((a, b) => b.totalPoints - a.totalPoints);
  };

  getTotalVictories = (array: IMatch[], local: string) => {
    if (local === 'home') {
      return array.reduce((acc, curr) => {
        if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }
    return array.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  getTotalDraws = (array: IMatch[]) => array.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  getTotalLosses = (array: IMatch[], local: string) => {
    if (local === 'home') {
      return array.reduce((acc, curr) => {
        if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }
    return array.reduce((acc, curr) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  getGoalsFavor = (array: IMatch[], local: string) => {
    if (local === 'home') {
      return array.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    }
    return array.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  };

  getGoalsOwn = (array: IMatch[], local: string) => {
    if (local === 'home') {
      return array.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    }
    return array.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  };
}
