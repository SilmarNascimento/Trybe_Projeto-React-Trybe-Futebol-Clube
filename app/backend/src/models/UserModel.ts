import * as bcrypt from 'bcryptjs';
import jwtUtils from '../utils/jwt.utils';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUser, IToken } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private ormModel = SequelizeUser;

  async createToken(data: Pick<IUser, 'email' | 'password'>): Promise<IToken | void> {
    const { email, password } = data;
    console.log(email, password);
    const userFound = await this.ormModel.findOne({ where: { email } });
    console.log(userFound);

    if (userFound && bcrypt.compareSync(password, userFound.password)) {
      const { id, username } = userFound;
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
