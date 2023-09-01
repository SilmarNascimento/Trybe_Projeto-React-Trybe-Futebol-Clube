import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req:Request, res: Response) => leaderboardController.getPlaceLeaderboardInformation(req, res),
);

router.get(
  '/away',
  (req:Request, res: Response) => leaderboardController.getPlaceLeaderboardInformation(req, res),
);

router.get(
  '/',
  (req:Request, res: Response) => leaderboardController.getAllLeaderboardInformation(req, res),
);

export default router;
