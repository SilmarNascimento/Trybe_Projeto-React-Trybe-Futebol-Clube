const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'senhaSecreta';

const sign = (payload) => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verify = (token) => {
  const data = jwt.verify(token, secret);
  return data;
};

const obj = {
  id: 2,
  username: 'Cainã',
};

const token = sign(obj);
const data = verify(`${token}1`);

console.log(data);
