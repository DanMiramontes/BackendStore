const express = require('express');
const app = express();
const middlewares = require('../middlewares');
const registerUser = require('./register');
const categoriesRouter = require('./categories');


module.exports = async() =>{
  const { token } = await middlewares();
  app.use('/auth',registerUser);
  app.use('/users',token,registerUser);
  app.use('/categories',token,categoriesRouter);
  return app;
};