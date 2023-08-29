import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<IMatch[]>> {
    const allmatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allmatches };
  }

  public async getTeamById(id: IMatch['id']): Promise<ServiceResponse<IMatch>> {
    const matchById = await this.matchModel.findById(id);
    if (!matchById) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not found!` } };
    }
    return { status: 'SUCCESSFUL', data: matchById };
  }
}
