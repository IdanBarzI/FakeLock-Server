const axios = require("axios");

const createAxios = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
};

module.exports = createAxios;
