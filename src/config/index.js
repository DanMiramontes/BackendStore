/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  PORT: process.env.NODE_LOCAL_PORT || 3001,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD:process.env.MYSQL_PASSWORD,
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_PORT: process.env.MYSQL_DOCKER_PORT,
  TOKEN: process.env.TOKEN_SECRET
};