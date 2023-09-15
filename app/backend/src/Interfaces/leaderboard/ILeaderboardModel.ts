import { IMatch } from "../matches/IMatch";
import { ILeaderboard } from "./ILeaderboard";

export interface IBoardViewModel {
  resumeLeaderboardInformation: (homeArray: ILeaderboard[], awayArray: ILeaderboard[]) => ILeaderboard[]; 

  getTotalVictories: (array: IMatch[], local: string) => number;

  getTotalDraws: (array: IMatch[]) => number;

  getTotalLosses: (array: IMatch[], local: string) => number;

  getGoalsFavor: (array: IMatch[], local: string) => number;

  getGoalsOwn: (array: IMatch[], local: string) => number;
}
