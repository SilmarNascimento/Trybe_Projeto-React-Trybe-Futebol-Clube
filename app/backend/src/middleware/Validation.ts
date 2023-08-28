import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt.utils';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { loginSchema } from './schema';

export default class Validation {
  constructor(private userModel: IUserModel = new UserModel()) {}

  static loginValidation(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: 'All fields must be filled' });
    }
    const { error } = loginSchema.validate({ email, password });
    if (error?.details[0]) {
      return response.status(401).json({ message: error.message });
    }
    next();
  }

  private static getToken(authorization: string): string {
    return authorization.split(' ')[1];
  }

  async tokenValidation(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    if (!authorization) { return response.status(401).json({ message: 'Token not found' }); }
    const token = Validation.getToken(authorization);
    const decoded = jwtUtils.verify(token);
    const user = await this.userModel.findById(decoded.id);
    if (!user) {
      return response.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
