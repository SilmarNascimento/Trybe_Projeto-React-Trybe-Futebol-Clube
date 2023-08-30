import {
  ICRUDModelCreator,
  ICRUDModelReaderById,
  ICRUDModelReaderByQuery,
  ICRUDModelUpdater,
  ICRUDModelUpdaterFinishMatch,
} from '../ICRUDModel';
import { IMatch } from './IMatch';

export interface IMatchModel extends
  ICRUDModelCreator<IMatch>,
  ICRUDModelReaderByQuery<IMatch>,
  ICRUDModelReaderById<IMatch>,
  ICRUDModelUpdater<IMatch>,
  ICRUDModelUpdaterFinishMatch {}
