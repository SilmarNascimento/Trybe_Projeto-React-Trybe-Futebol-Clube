import { ServiceResponse } from '../Interfaces/ServiceResponse';
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
}
