import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private ormModel = SequelizeMatch;

  async findByQuery(inProg?: string): Promise<IMatch[]> {
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
    if (inProg) {
      const inProgress = inProg === 'true';
      const matchesByProgress = allMatches
        .filter((match) => match.dataValues.inProgress === inProgress);
      return matchesByProgress;
    }
    return allMatches;
  }
}
