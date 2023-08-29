import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private ormModel = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const allMatches = await this.ormModel.findAll({
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: ['team_name'],
      }, {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: ['team_name'],
      }],
    });
    return allMatches;
  }

  async findById(id: number): Promise<IMatch | null> {
    const dbTeam = await this.ormModel.findByPk(id);
    if (!dbTeam) return null;
    return dbTeam;
  }
}
