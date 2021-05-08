//Script to import json data to the mongo db
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({
  path: `${__dirname}/../../config.env`,
});
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'));

//importing model
const TourModel = require('./../../models/tourModels');
//reading JSON file
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/tours-simple.json`,
    'utf-8'
  )
);

//importing data into database
const importData = async () => {
  try {
    await TourModel.create(tours);
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Deleting data from database
const deleteData = async () => {
  try {
    await TourModel.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// if (process.argv[2] === 'import') {
importData();
// } else if (process.argv[2] === 'delete') {
//   deleteData();
// }
// console.log(process.argv);
// deleteData();
