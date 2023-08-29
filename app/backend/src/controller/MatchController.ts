import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../service/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllTeams(_request: Request, response: Response): Promise<Response> {
    const { status, data } = await this.matchService.getAllTeams();
    return response.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status, data } = await this.matchService.getTeamById(parseInt(id, 10));
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
