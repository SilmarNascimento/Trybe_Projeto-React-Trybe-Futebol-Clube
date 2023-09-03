import { ITeamAssociation } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardModel {
  private teamModel = SequelizeTeam;

  async getPlaceLeaderboardInformation(local: string): Promise<ILeaderboard[]> {
    const finishedTeamsMatches = await this.getAllFinishedMatches(local);
    console.log(finishedTeamsMatches.filter((team) => team.teamName === 'Pa')[0].homeMatches);
    const formattedPlaceMatches = this.resumeTeamPlaceInformation(finishedTeamsMatches, local);
    this.sortTeamInformation(formattedPlaceMatches);
    return formattedPlaceMatches;
  }

  async getAllLeaderboardInformation(): Promise<ILeaderboard[]> {
    const finishedHomeMatches = await this.getAllFinishedMatches('home');
    const formattedHomeMatches = this.resumeTeamPlaceInformation(finishedHomeMatches, 'home');
    const finishedAwayMatches = await this.getAllFinishedMatches('away');
    const formattedAwayMatches = this.resumeTeamPlaceInformation(finishedAwayMatches, 'away');
    const formattedMatches = this
      .resumeLeaderboardInformation(formattedHomeMatches, formattedAwayMatches);
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

  private resumeTeamPlaceInformation = (
    array: ITeamAssociation[],
    local: string,
  ) => array.map((team) => {
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

  private resumeLeaderboardInformation = (
    homeArray: ILeaderboard[],
    awayArray: ILeaderboard[],
  ): ILeaderboard[] => homeArray.map((homeMatch) => {
    const { name } = homeMatch;
    const awayMatch = awayArray.find((match) => match.name === name) as ILeaderboard;
    const teamInformation = { name } as ILeaderboard;
    teamInformation.totalGames = awayMatch.totalGames + homeMatch.totalGames;
    teamInformation.totalVictories = awayMatch.totalVictories + homeMatch.totalVictories;
    teamInformation.totalDraws = awayMatch.totalDraws + homeMatch.totalDraws;
    teamInformation.totalLosses = awayMatch.totalLosses + homeMatch.totalLosses;
    teamInformation.totalPoints = teamInformation.totalVictories * 3 + teamInformation.totalDraws;
    teamInformation.goalsFavor = awayMatch.goalsFavor + homeMatch.goalsFavor;
    teamInformation.goalsOwn = awayMatch.goalsOwn + homeMatch.goalsOwn;
    teamInformation.goalsBalance = teamInformation.goalsFavor - teamInformation.goalsOwn;
    const efficiency = teamInformation.totalPoints / (teamInformation.totalGames * 3);
    teamInformation.efficiency = (efficiency * 100).toFixed(2);
    return teamInformation;
  });

  private sortTeamInformation = (array: ILeaderboard[]): void => {
    array.sort((a, b) => b.goalsFavor - a.goalsFavor);
    array.sort((a, b) => b.goalsBalance - a.goalsBalance);
    array.sort((a, b) => b.totalVictories - a.totalVictories);
    array.sort((a, b) => b.totalPoints - a.totalPoints);
  };

  private getTotalVictories = (array: IMatch[], local: string) => {
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

  private getTotalDraws = (array: IMatch[]) => array.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  private getTotalLosses = (array: IMatch[], local: string) => {
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

  private getGoalsFavor = (array: IMatch[], local: string) => {
    if (local === 'home') {
      return array.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    }
    return array.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  };

  private getGoalsOwn = (array: IMatch[], local: string) => {
    if (local === 'home') {
      return array.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    }
    return array.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  };
}
