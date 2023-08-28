import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../service/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async userLogin(request: Request, response: Response): Promise<Response> {
    console.log('entrei controller');

    const { email, password } = request.body;
    console.log('email: ', email);
    console.log('password: ', password);

    const { status, data } = await this.userService.userLogin({ email, password });
    console.log('recebi os dados da service');

    return response.status(mapStatusHTTP(status)).json(data);
  }
}
