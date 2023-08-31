import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req:Request, res: Response) => leaderboardController.getAllTeams(req, res),
);

export default router;
