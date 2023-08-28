import * as bcrypt from 'bcryptjs';
import jwtUtils from '../../utils/jwt.utils';

const validEmail = 'silmar@trybe.com';
const validPassword = '123456';

const SALT_ROUND = 10;

const userFound = {
  id: 2,
  username: 'Silmar',
  role: 'Admin',
  email: 'silmar@trybe.com',
  password: bcrypt.hashSync(validPassword, SALT_ROUND),

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
  emptyRequest: 'All fields must be filled',
  invalidRequest: 'Invalid email or password',
  tokenNotFound: 'Token not found',
  userTokenNotFound: 'Token must be a valid token',
}

export default {
  validEmail,
  validPassword,
  userFound,
  invalidEmail,
  invalidPassword,
  errorMessage,
  requestResponse,
}