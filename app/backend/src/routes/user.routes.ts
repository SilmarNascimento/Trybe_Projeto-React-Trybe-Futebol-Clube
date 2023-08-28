import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';
import Validation from '../middleware/Validation';

const userController = new UserController();

const router = Router();

router.get(
  '/',
  Validation.loginValidation,
  (req:Request, res: Response) => userController.userLogin(req, res),
);

export default router;
