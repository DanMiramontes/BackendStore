const {User, UserCrendential } = require('../models/User');
const brycpt = require('bcrypt');
const db = require('../utils/db');
const moment = require('moment/moment');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports ={
  signup: async(req, res)=>{
    const { body } = req;
    const { username, fullname,password,email, role} = body;
    if (!username ){
      return res.status(400).json({status:'failer',message:'username is required'});

    }
    if (!fullname){
      return res.status(400).json({status:'failer',message:'fullname is required'});

    }
    if (!password ){
      return res.status(400).json({status:'failer',message:'password is required'});

    }
    if (!email ){
      return res.status(400).json({status:'failer',message:'email is required'});
    }
    if(!role) {
      return res.status(400).json({status:'failer',message:'role is required'});
    }

    const passwordHash = await brycpt.hash(body.password,10);
    const newUser = new User(username, passwordHash, fullname,email, role);

    const response = await db.createUser(newUser).then((res)=>{
      return res[0][0];
    });

    if (response.result === `error = 23000, message = Duplicate entry '${body.email}' for key 'user.email'`){
      return res.status(400).json({status:'failer',message:`${body.email} is exist`});
    }
    if (response.result !== 'created'){
      return res.status(400).json({status:'failer',message:'error'});
    }
    res.status(201).json({status:'created',message:`user ${newUser.username} is created`});
  },

  signin: async(req, res) =>{
    const { body } = req;
    const { email, password}  = body;
    if (!email ){
      return res.status(400).json({status:'failer',message:'email is required'});

    }
    if (!password ){
      return res.status(400).json({status:'failer',message:'password is required'});

    }
    // eslint-disable-next-line no-undef
    const credential = new UserCrendential(email, password);
  
    const user = await db.verifyUser(credential).then((res)=>{
      return res[0][0];
    });
    const passwordCorrect = user === null ? false : await brycpt.compare(password, user.password);
    if(!(user && passwordCorrect)){
      return res.status(401).json({error: 'invalid user or password'});
    }
    const payload = {
      sub: user.id,
      name: user.username,
      role: user.role,
      iat: moment().unix(),
      exp: moment().add(7,'day').unix(),
    };

    const token = jwt.sign(payload, config.TOKEN);
    res.status(201).json({status: 'OK', username: user.username, token});
  },
  users:async(req,res) =>{
    const { user } = req;
    if (!(user.role === 'Admin') || (user.role === 'Asistente')){
      return res.status(401).json({error: 'invalid cretendial'});
    }
    let register = [];
    const users = await db.showUsers().then((res)=>{
      return res[0];
    });
    users.forEach(user => {
      if (user.password){
        delete user.password;
      }
      register.push(user);
    });
    res.status(200).json({status:'ok',data:register});
  }

};
