const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

exports.getAllTours = (req, res) => {
  console.log('Inside the get tours API');
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createNewTour = (req, res) => {
  console.log('Inside the post tours API');
  //   console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    { id: newID },
    req.body
  );

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  console.log('Inside the get tours API by id');
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id);

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
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<...Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log('Inside the delete request');
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
