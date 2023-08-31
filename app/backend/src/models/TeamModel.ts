import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private ormModel = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbTeams = await this.ormModel.findAll();
    return dbTeams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbTeam = await this.ormModel.findByPk(id);
    if (!dbTeam) return null;
    return dbTeam;
  }
}
