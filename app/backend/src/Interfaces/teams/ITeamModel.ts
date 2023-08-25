import { ITeam } from './ITeams';

export interface ITeamModel {
  create(data: Partial<ITeam>): Promise<ITeam>,
}
