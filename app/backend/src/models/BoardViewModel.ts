import { ITeamAssociation } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class BoardViewModel {
  private _teamsLeaderboard: ILeaderboard[];

  constructor(array01: ITeamAssociation[], local: string) {
    this._teamsLeaderboard = array01.map((team) => {
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
  }

  public get teamsLeaderboard() {
    return this._teamsLeaderboard;
  }

  static resumeLeaderboardInformation = (
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
