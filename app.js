const express = require('express');
const app = express();

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//middeware
app.use(express.json());
//creating our own middleware
app.use((req, res, next) => {
  console.log(
    'Custom middleware to manipulate data'
  );
  req.requestTime = new Date().toISOString();
  next();
});
//using third party middleware
app.use(morgan('dev'));

//Routes
//Make a middleware

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//Starting server
module.exports = app;
