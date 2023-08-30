import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../service/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getMatchByQuery(request: Request, response: Response): Promise<Response> {
    const { inProgress } = request.query;
    if (typeof inProgress === 'string' || typeof inProgress === 'undefined') {
      const { status, data } = await this.matchService.getMatchByQuery(inProgress);
      return response.status(mapStatusHTTP(status)).json(data);
    }
    return response.status(500).json({ message: 'Internal Server Error' });
  }

  public async updateMatchGoals(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { homeTeamGoals, awayTeamGoals } = request.body;
    const { status, data } = await this.matchService
      .updateMatchGoals(parseInt(id, 10), { homeTeamGoals, awayTeamGoals });
    return response.status(mapStatusHTTP(status)).json(data);
  }

  public async updateFinishedMatch(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status, data } = await this.matchService
      .updateFinishedMatch(parseInt(id, 10));
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
