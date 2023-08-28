export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IUserLogin {
  createToken(data: Partial<IUser>): Promise<IToken | void>
}
