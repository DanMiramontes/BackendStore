const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  port:config.MYSQL_PORT
});

module.exports = {
  showUsers(){
    return new Promise((done, reject) =>{
      connection.promise().query('call store.sp_users_show(?, ?)',['','']).then(([row]) => done({
        ...row
      })).catch((err)=> reject(err));
    });
  },
  createUser(user){
    return new Promise((done, reject) =>{
      connection.promise().query('call store.sp_create_user(?, ?, ?, ?, ?)',[user.username, user.password, user.fullname,user.email,user.role]).then(([row]) => done({
        ...row
      })).catch((err)=> reject(err));
    });
  },
  verifyUser(user){
    return new Promise((done, reject) =>{
      connection.promise().query('call store.sp_verifyIdentity(?)',[user.email]).then(([row]) => done({
        ...row
      })).catch((err)=> reject(err));
    });
  },

  showCategories(){
    return new Promise((done, reject) =>{
      connection.promise().query('call store.sp_categories_show(?, ?)',['','']).then(([row]) => done({
        ...row
      })).catch((err)=> reject(err));
    });
  },
};