import { Request, Response, Router } from 'express';
import MatchController from '../controller/MatchController';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req:Request, res: Response) => matchController.getAllTeams(req, res),
);

router.get(
  '/:id',
  (req:Request, res: Response) => matchController.getTeamById(req, res),
);

export default router;
