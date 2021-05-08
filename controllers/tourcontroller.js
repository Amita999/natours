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

// exports.checkbody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  console.log('Inside the get tours API');
  try {
    //Filtering
    let query = { ...req.query };
    const excludedQueryArray = [
      'page',
      'sort',
      'limit',
      'fields',
    ];
    excludedQueryArray.forEach(
      (el) => delete query[el]
    );

    //Advanced Filtering

    let reqQueryObjString = JSON.stringify(query);
    // console.log(query);
    reqQueryObjString = reqQueryObjString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    // console.log(reqQueryObjString);

    query = TourModel.find(
      JSON.parse(reqQueryObjString)
    );

    //Sorting
    // sort('price')
    if (req.query.sort) {
      const sortBy = req.query.sort
        .split(',')
        .join(' ');
      // console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // sort('price ratingsAverage')
    const tours = await query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  console.log('Inside the get tours API by id');
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  try {
    const tours = await TourModel.findById(
      req.params.id
    );
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
};

exports.createNewTour = async (req, res) => {
  console.log('Inside the post tours API');
  //  const tour = new TourModel();
  //  TourModel.save();
  try {
    const tourDocument = await TourModel.create(
      req.body
    );

    res.status(201).json({
      status: 'success',
      data: {
        tour: tourDocument,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  console.log('Inside the patch request');
  try {
    const tourDocument = await TourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour: tourDocument,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
};

exports.deleteTour = async (req, res) => {
  console.log('Inside the delete request');
  try {
    await TourModel.findByIdAndDelete(
      req.params.id
    );
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
};
