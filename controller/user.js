const userModel = require('../model/userModel');
const BigPromise = require('../middleware/BigPromise');
const cookieToken = require('../util/cookieToken');
const crypto = require('crypto');
const logger = require('../logger');


exports.home = BigPromise((req,res)=>{
    res.json({message:"Hello From Vaibhav"});
})

exports.signup = BigPromise(async(req,res,next)=>{
    const {name,email,password} = req.body;
    if(!email){
        return next(new Error("Please Enter email"))
    }
    if(!password){
        return next(new Error("Please Enter password"))
    }

    const user = await userModel.create({
        name,
        email,
        password,
    });
    user.password = undefined;
    cookieToken(user,res);

})


exports.signin = BigPromise(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new Error("please provide email and password"));
    }
    const user = await userModel.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new Error("Email or password does not match or exist"));
    }
  
    const isPasswordCorrect = await user.isValidatedPassword(password);
  
    if (!isPasswordCorrect) {
      return next(new Error("Email or password does not match or exist", 400));
    }
    cookieToken(user, res);
    logger.info(`Signin IP ${req.ip} of ${user.email}`);
  });


exports.createTodo = BigPromise(async(req,res,next)=>{
    console.log("userTitle")
const {todoTitle} = req.body;
let userId = req.user.id;
let userTitle = userModel.findByIdAndUpdate(userId,{
  $set:{ title:todoTitle},
},function(err,docs){
    if (err){
        logger.info(err)
    }
    else{
        logger.info("Updated User : ", docs);
    }
});
cookieToken(user, res);
});

exports.updateTodo = BigPromise(async(req,res,next)=>{
    const userId = req.params.userId;
    const { todoTitle } = req.body;
    let userTitle = userModel.findByIdAndUpdate(userId,{
        $set:{ title:todoTitle},
      },function(err,docs){
          if (err){
              logger.info(err)
          }
          else{
              logger.info("Updated User : ", docs);
          }
      });
      res.send(userTitle);
    });

exports.getTodoList= BigPromise(async(req,res,next)=>{
const userList =await userModel.find().limit(6);
res.send(userList);
});

exports.deleteTodo = BigPromise(async(req,res,next)=>{
    const userId = req.params.userId;
    let userTitle = userModel.findByIdAndDelete(userId,function(err,docs){
          if (err){
              logger.info(err)
          }
          else{
              logger.info("Deleted User : ", docs);
          }
      });
    });



