import { ICRUDModelReaderById } from '../ICRUDModel';
import { IUser, IUserLogin } from './IUser';

export interface IUserModel extends IUserLogin, ICRUDModelReaderById<IUser> {}
