import { IUser, Token } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class UserModel implements IUserModel {
  private ormModel = SequelizeTeam;

  async createToken(data: Partial<IUser>): Promise<Token> {

  }

  async findById(id: number): Promise<IUser | null> {
    const userFound = await this.ormModel.findByPk(id);
    if (!userFound) return null;
    return userFound;
  }
}
