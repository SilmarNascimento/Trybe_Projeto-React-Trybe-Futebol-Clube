import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ITeam } from '../Interfaces/teams/ITeams';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    const teamById = await this.teamModel.findById(id);
    if (!teamById) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found!` } };
    }
    return { status: 'SUCCESSFUL', data: teamById };
  }
}
