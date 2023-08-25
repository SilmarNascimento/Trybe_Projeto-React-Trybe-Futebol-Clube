import { ITeam } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbTeams = await this.model.findAll();
    const findAllTeams = dbTeams.map((team: SequelizeTeam) => {
      const { id, teamName } = team.dataValues;
      return { id, teamName };
    });
    return findAllTeams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbTeam = await this.model.findByPk(id);
    if (!dbTeam) return null;
    return dbTeam.dataValues;
  }
}
