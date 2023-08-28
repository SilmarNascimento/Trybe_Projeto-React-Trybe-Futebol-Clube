const validEmail = 'silmar@trybe.com';
const validPassword = '123456';

const invalidEmail = {
  type: 123456,
  pattern: 'cainã',
};

const invalidPassword = {
  type: 123456,
  length: '12345', 
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
  invalidEmail,
  invalidPassword,
  errorMessage,
}