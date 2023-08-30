import { Request, Response, Router } from 'express';
import MatchController from '../controller/MatchController';
import Validation from '../middleware/Validation';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req:Request, res: Response) => matchController.getMatchByQuery(req, res),
);

router.patch(
  '/:id/finish',
  Validation.tokenValidation,
  (req:Request, res: Response) => matchController.updateFinishedMatch(req, res),
);

router.patch(
  '/:id',
  Validation.tokenValidation,
  (req:Request, res: Response) => matchController.updateMatchGoals(req, res),
);

export default router;
