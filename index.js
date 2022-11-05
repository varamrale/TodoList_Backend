const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./logger');
require('dotenv').config();

//Now Connect DB
connectDB();

app.listen(3000,()=>{
    logger.info(`Server is running at port :${3000}`);
})