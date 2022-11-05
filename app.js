const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan("tiny"))


//import all route here.
const user = require('./route/user');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

//router middleware
app.use("/api/v1",user);

app.use(notFound);
app.use(errorHandler);

module.exports = app;