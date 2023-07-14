/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3001,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD:process.env.MYSQL_PASSWORD,
  MYSQL_DB: process.env.MYSQL_DB,
  TOKEN: process.env.TOKEN_SECRET
};