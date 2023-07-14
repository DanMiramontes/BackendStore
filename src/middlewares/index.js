/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');

module.exports = async()=>{
  const files = await fs.promises.readdir(__dirname)
    .then(files =>{
      const dataFile = [];
      files.forEach(file =>{
        if((path.extname(file)==='.js')&& (file !== 'index.js')){
          dataFile.push(file);
        }
      });
      return dataFile; 
    });
  const middlewares = {};
  files.forEach((file)=>{
    middlewares[file.replace('.js','')] = require(`./${file}`);    
  });
  return middlewares;
};