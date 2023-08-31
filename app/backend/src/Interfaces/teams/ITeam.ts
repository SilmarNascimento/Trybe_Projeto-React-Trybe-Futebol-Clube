import { IMatch } from '../matches/IMatch';

export interface ITeam {
  id: number;
  teamName: string;
  homeMatches?: IMatch[];
  awayMatches?: IMatch[];
}
