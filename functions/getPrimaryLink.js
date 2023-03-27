const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.getPrimaryLink = (accountId) => {
  const jwtEncode = jwt.sign({ id: accountId }, 'secret');
  const headers = {
    token: 'Bearer ' + jwtEncode,
  };
  return axios
    .get('http://docker.for.mac.localhost:3002/share/primary-link', { headers })
    .then((res) => {
      console.log(res.data.linkId);
      return res.data.linkId;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
