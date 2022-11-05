const register = require('../model/userModel');
const jwt = require('jsonwebtoken');
 exports.auth = async (req,res,next) => {
    // const token = user.getJwtToken();
  
    try {  
        const token = req.cookies.token;
        const verifyuser = jwt.verify(token,"vaibhav");
        req.user = await userModel.findById(verifyuser.id);
        console.log(req.user)
        console.log("user verified");
        next();
    } catch (error) {
       res.status(401).send(error); 
    } 
  };
  

  