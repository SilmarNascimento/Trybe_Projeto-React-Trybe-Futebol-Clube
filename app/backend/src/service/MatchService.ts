import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getMatchByQuery(inProg?: string): Promise<ServiceResponse<IMatch[]>> {
    const matchesByProgress = await this.matchModel.findByQuery(inProg);
    if (!matchesByProgress.length) {
      return { status: 'NOT_FOUND', data: { message: `Match ${inProg} not found!` } };
    }
    return { status: 'SUCCESSFUL', data: matchesByProgress };
  }

  public async updateMatchGoals(
    id: number,
    data:Pick<IMatch, 'homeTeamGoals' | 'awayTeamGoals'>,
  ): Promise<ServiceResponse<IMatch>> {
    const updatedMatch = await this.matchModel.update(id, data);
    if (!updatedMatch) {
      return { status: 'NOT_FOUND',
        data: {
          message: `Match ${id} not found!`,
        } };
    }
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async updateFinishedMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const finishedMatch = await this.matchModel.updateFinishedMatch(id);
    if (!finishedMatch) {
      return { status: 'NOT_FOUND',
        data: {
          message: `Match ${id} not found!`,
        } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
