import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getResumedTeamInformation(request: Request, response: Response): Promise<Response> {
    const splittedString = request.originalUrl.split('/');
    const local = splittedString[splittedString.length - 1];
    const { status, data } = await this.leaderboardService.getPlaceLeaderboardInformation(local);
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
