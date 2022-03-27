const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.LOCAL_DATABASE_URL,
});

module.exports = instance;
