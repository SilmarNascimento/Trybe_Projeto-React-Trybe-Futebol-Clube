import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ITeam } from '../Interfaces/teams/ITeams';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  private teamModel: ITeamModel;
  constructor(model: ITeamModel) {
    this.teamModel = model ?? new TeamModel();
  }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
