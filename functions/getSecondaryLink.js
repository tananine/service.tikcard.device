const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.getSecondaryLink = (accountId) => {
  const jwtEncode = jwt.sign(
    { id: accountId },
    process.env.SERVICE_PROFILE_SECRET_KEY
  );
  const headers = {
    token: 'Bearer ' + jwtEncode,
  };
  return axios
    .get(`${process.env.SERVICE_PROFILE_HOST}/share/secondary-link`, {
      headers,
    })
    .then((res) => {
      return res.data.linkId;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
