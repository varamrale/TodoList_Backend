const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [40, "Name should be under 40 characters"],
      },
      email: {
        type: String,
        required: [true, "Please provide an email address"],
        validate: [validator.isEmail, "Please enter email in correct format"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please provide an password"],
        select: false,
      },
      title:{
        type:String,
      },
      forgotPasswordToken:String,
      forgotPasswordExpiry : Date,
      createdAt:{
        type:Date,
        default:Date.now,
      },
});
//Encryting Passwords before Saving
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
});

//compare user password
userSchema.methods.isValidatedPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//Return JSON web token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},"vaibhav", {
        expiresIn: 60 * 60
    });
}

userSchema.methods.getForgotPasswordToken = function(){
    const forgotToken = crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

    this.forgotPasswordExpiry = Date.now()+20*60*1000;

    return forgotToken;
};

module.exports = mongoose.model("User",userSchema);