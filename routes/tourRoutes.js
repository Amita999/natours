const express = require('express');
const tourController = require('./../controllers/tourcontroller');
const router = express.Router();
//Param as a middleware to check whether an id exists or not
// router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createNewTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
