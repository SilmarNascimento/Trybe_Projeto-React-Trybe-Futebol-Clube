import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt.utils';
import { loginSchema } from './schema';

export default class Validation {
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

  static async tokenValidation(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    console.log('entrei validation');
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).json({ message: 'Token not found' });
    }
    const token = Validation.getToken(authorization);
    try {
      const userToken = jwtUtils.verify(token);
      request.userToken = userToken;
      next();
    } catch (error) {
      return response.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
