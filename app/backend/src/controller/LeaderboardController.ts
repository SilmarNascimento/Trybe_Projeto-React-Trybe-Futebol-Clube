import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getAllTeams(_request: Request, response: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getAllTeams();
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
