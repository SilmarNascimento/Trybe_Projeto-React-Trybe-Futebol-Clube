import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private ormModel = SequelizeMatch;

  public async create(
    data: Pick<IMatch, 'homeTeamGoals' | 'awayTeamGoals' | 'homeTeamId' | 'awayTeamId'>,
  ): Promise<IMatch> {
    const newMatch = {
      ...data,
      inProgress: true,
    };
    const createdMatch = this.ormModel.create(newMatch);
    return createdMatch;
  }

  public async findByQuery(inProg?: string): Promise<IMatch[]> {
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
    if (inProg === 'true' || inProg === 'false') {
      const inProgress = inProg === 'true';
      const matchesByProgress = allMatches
        .filter((match) => match.inProgress === inProgress);
      return matchesByProgress;
    }
    return allMatches;
  }

  public async findById(id: number): Promise<IMatch | null> {
    const matchById = await this.ormModel.findByPk(id);
    if (!matchById) {
      return null;
    }
    return matchById;
  }

  public async update(
    id: number,
    data: Pick<IMatch, 'homeTeamGoals' | 'awayTeamGoals'>,
  ): Promise<IMatch | null> {
    const { homeTeamGoals, awayTeamGoals } = data;
    try {
      await this.ormModel.update({
        homeTeamGoals,
        awayTeamGoals,
      }, { where: { id } });
      const matchUpdatedById = await this.findById(id);
      return matchUpdatedById;
    } catch (error) {
      return null;
    }
  }

  public async updateFinishedMatch(id: number): Promise<boolean> {
    try {
      await this.ormModel.update({
        inProgress: false,
      }, { where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
