// const fs = require('fs');
// const tours = JSON.parse(
//   fs.readFileSync(
//     `${__dirname}/../dev-data/data/tours-simple.json`
//   )
// );

const TourModel = require('./../models/tourModels');

//Custom middleware function to check the id of incominfg request
// exports.checkId =
//   ('id',
//   (req, res, next, val) => {
//     console.log(
//       'ID for the API is in params middleware: ',
//       val
//     );
//     const id = req.params.id * 1;
//     if (id > tours.length) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Invalid ID',
//       });
//     }
//     next();
//   });

exports.checkbody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log('Inside the get tours API');
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.createNewTour = (req, res) => {
  console.log('Inside the post tours API');
  //   console.log(req.body);

  (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  };
};

exports.getTour = (req, res) => {
  console.log('Inside the get tours API by id');
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  console.log('Inside the patch request');

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<...Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log('Inside the delete request');

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
