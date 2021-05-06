const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const app = express();

console.log(process.env);
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//TODO middeware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
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

//Routes
//Make a middleware

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//Starting server
module.exports = app;
