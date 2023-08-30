import {
  ICRUDModelReaderById,
  ICRUDModelReaderByQuery,
  ICRUDModelUpdater,
  ICRUDModelUpdaterFinishMatch,
} from '../ICRUDModel';
import { IMatch } from './IMatch';

export interface IMatchModel extends
  ICRUDModelReaderByQuery<IMatch>,
  ICRUDModelReaderById<IMatch>,
  ICRUDModelUpdater<IMatch>,
  ICRUDModelUpdaterFinishMatch {}
