const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');


module.exports = async(req, res,next)=>{
  const { authorization } = req.headers;

  if(!authorization){
    return res.status(403).json('Unauthorization');
  }
  const data = validateToken(authorization);
  if (data.exp <= moment().unix()){
    return res.status(419).json({status:' token_expired',message: 'Token expirado'});
  }
  req.user = data;

  next();
};

function validateToken(authorization){
  const token = authorization.split(' ')[1];
  const payload = jwt.decode(token,config.TOKEN);
  return payload;
}