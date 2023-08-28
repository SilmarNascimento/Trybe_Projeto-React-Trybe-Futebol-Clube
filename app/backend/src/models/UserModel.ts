import bcrypt from 'bcryptjs';
import jwtUtils from '../utils/jwt.utils';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUser, Token } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private ormModel = SequelizeUser;

  async createToken(data: Partial<IUser>): Promise<Token | undefined> {
    const { username, password } = data;
    const userFound = await this.ormModel.findOne({ where: { username } });
    if (userFound && bcrypt.compareSync(password, userFound.password)) {
      const { id } = userFound;
      const token = jwtUtils.sign({ id, username });
      return { token };
    }
  }

  async findById(id: number): Promise<IUser | null> {
    const userFound = await this.ormModel.findByPk(id);
    if (!userFound) return null;
    return userFound;
  }
}
