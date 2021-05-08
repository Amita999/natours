const mongoose = require('mongoose');
const tourschema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'A tour must have a tour name',
    ],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [
      true,
      'A tour must have a duration',
    ],
  },
  maxGroupSize: {
    type: Number,
    required: [
      true,
      'maxGroupSize is required for a tour',
    ],
  },
  difficulty: {
    type: String,
    required: [
      true,
      'A tour must have a difficulty level',
    ],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [
      true,
      'A tour must have a summary',
    ],
  },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    trim: true,
    required: [
      true,
      'A tour must have a image-cover',
    ],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
const TourModel = mongoose.model(
  'Tour',
  tourschema
);
module.exports = TourModel;
