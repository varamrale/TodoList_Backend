const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = () =>{
    mongoose
    .connect('mongodb+srv://vaibhav:vaibhav@cluster0.grdtsvf.mongodb.net/signupDemo?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,})
    .then(logger.info('DB GOT CONNECTED'))
    .catch((err)=>{
        logger.error("DB CONNECTION ISSUE");
        logger.error(err);
        process.exit(1);
    });
};

module.exports = connectDB