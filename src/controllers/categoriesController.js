const db = require('../utils/db');

module.exports = {
  index : async(req,res) =>{
    const { user } = req;
    if (!(user.role === 'Admin') || (user.role === 'Asistente')){
      return res.status(401).json({error: 'invalid cretendial'});
    }
    let categories = [];
    const response = await db.showCategories().then((res)=>{
      return res[0];
    });
    response.forEach(element => {
      categories.push(element);
    });
    res.status(200).json({status:'ok',data:categories});
  }
};