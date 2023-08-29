import * as bcrypt from 'bcryptjs';
import jwtUtils from '../../utils/jwt.utils';

const validEmail = 'silmar@trybe.com';
const validPassword = '123456';

const SALT_ROUND = 10;

const userFound = {
  id: 2,
  username: 'Silmar',
  role: 'admin',
  email: 'silmar@trybe.com',
  password: bcrypt.hashSync(validPassword, SALT_ROUND),
}

const getRoleResponse = {
  role: 'admin'
}

const requestResponse = {
  token: jwtUtils.sign({ id:userFound.id, username: userFound.username }),
};

const invalidEmail = {
  type: 123456,
  pattern: 'cainã',
};

const invalidPassword = {
  type: 123456,
  length: '12345',
  incorrect: '123457', 
};

const errorMessage = {
  emptyRequest: { message: 'All fields must be filled'},
  invalidRequest: { message: 'Invalid email or password' },
  tokenNotFound: { message: 'Token not found' },
  userTokenNotFound: { message: 'Token must be a valid token' },
}

export default {
  validEmail,
  validPassword,
  userFound,
  getRoleResponse,
  invalidEmail,
  invalidPassword,
  errorMessage,
  requestResponse,
}