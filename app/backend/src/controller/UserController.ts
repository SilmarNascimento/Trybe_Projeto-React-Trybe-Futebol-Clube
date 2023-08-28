import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../service/UserService';

export default class TeamController {
  constructor(private userService = new UserService()) {}

  public async userLogin(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const { status, data } = await this.userService.userLogin({ email, password });
    return response.status(mapStatusHTTP(status)).json(data);
  }
}
