const jwt = require('jsonwebtoken');

const secret = 'secret';

exports.decodeJWT = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
