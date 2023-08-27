import { ITeam } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private ormModel = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbTeams = await this.ormModel.findAll();
    const findAllTeams = dbTeams.map((team: SequelizeTeam) => {
      const { id, teamName }: ITeam = team.dataValues;
      return { id, teamName };
    });
    return findAllTeams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbTeam = await this.ormModel.findByPk(id);
    if (!dbTeam) return null;
    return dbTeam.dataValues;
  }
}
