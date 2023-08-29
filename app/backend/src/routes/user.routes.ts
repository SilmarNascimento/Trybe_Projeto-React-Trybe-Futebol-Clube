import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';
import Validation from '../middleware/Validation';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validation.loginValidation,
  (req: Request, res: Response) => userController.userLogin(req, res),
);

router.get(
  '/role',
  Validation.tokenValidation,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
