const mongoose = require('mongoose');
const tourschema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'A tour must have a tour name',
    ],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
const TourModel = mongoose.model(
  'Tour',
  tourschema
);
module.exports = TourModel;
