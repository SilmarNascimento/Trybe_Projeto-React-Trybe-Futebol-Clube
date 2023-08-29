import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { IUser, IToken } from '../Interfaces/users/IUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async userLogin(
    data: Pick<IUser, 'email' | 'password'>,
  ): Promise<ServiceResponse<IToken>> {
    const token = await this.userModel.createToken(data);
    if (!token) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: token };
  }
}
