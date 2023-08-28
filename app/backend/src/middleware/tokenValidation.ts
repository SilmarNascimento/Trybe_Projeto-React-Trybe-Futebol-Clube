import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.utils';
import UserModel from '../models/UserModel';

const getToken = (authorization: string): string => authorization.split(' ')[1];

const tokenValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { authorization } = request.headers;
    if (!authorization) { return response.status(401).json({ message: 'Token not found' }); }
    const token = getToken(authorization);
    const decoded = jwtUtil.verify(token);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return response.status(401).json({ message: 'Invalid token' });
    }
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token' });
  }
};

export default tokenValidation;
