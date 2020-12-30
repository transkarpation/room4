const axios = require('axios')
const config = require('./config')

const instance = axios.create({
  baseURL: config.dota.baseurl,
});

module.exports = instance
