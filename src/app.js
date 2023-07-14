const express = require('express');
const app = express();

const routes = require('./routes');
app.use(express.json());

routes().then((res)=>{
  app.use('/api/',res);
});

module.exports = app;