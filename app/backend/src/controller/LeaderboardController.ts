import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_request: Request, response: Response): Promise<Response> {
    const { status, data } = await this.teamService.getAllTeams();
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
