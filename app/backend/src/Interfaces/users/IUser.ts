export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type Token = {
  token: string;
};

export interface IUserLogin {
  createToken(data: Partial<IUser>): Promise<Token | undefined>
}
