const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

const port = 3000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//middeware
app.use(express.json());
//creating our own middleware
app.use((req, res, next) => {
  console.log('Custom middleware to manipulate data');
  req.requestTime = new Date().toISOString();
  next();
});
//using third party middleware
app.use(morgan('dev'));

//route handlers
const getAllTours = (req, res) => {
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

const createNewTour = (req, res) => {
  console.log('Inside the post tours API');
  //   console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

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

const getTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  console.log('Inside the ger users request');
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to be implemented',
  });
};
const getUser = (req, res) => {
  console.log('Inside the ger users request');
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to be implemented',
  });
};
const createUser = (req, res) => {
  console.log('Inside the ger users request');
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to be implemented',
  });
};
const updateUser = (req, res) => {
  console.log('Inside the ger users request');
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to be implemented',
  });
};
const deleteUser = (req, res) => {
  console.log('Inside the ger users request');
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to be implemented',
  });
};
//Routes
// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', createNewTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//Routes
app.route('/api/v1/tours').get(getAllTours).post(createNewTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//Starting server
app.listen(port, () => {
  console.log('Listening to server');
});
