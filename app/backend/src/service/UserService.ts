import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { IUser, IToken, IRole } from '../Interfaces/users/IUser';
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

  public async getRole(id: number): Promise<ServiceResponse<IRole>> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
