const BigPromise = require('./BigPromise');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

exports.isLoggedIn = BigPromise(async(req,res,next)=>{
     // const authHeader = req.headers["authorization"];
   const token =req.headers.authorization.split(' ')[1];;
    // const token = 
    // req.cookie.token || req.header("Authorization").replace("Bearer ","");
    if(!token){
        return next(new Error("Login First to access the page"));
    }

    const decode = jwt.verify(token,"vaibhav");
    req.user = await userModel.findById(decode.id);
    logger.info("Jwt solve")
    next();
});