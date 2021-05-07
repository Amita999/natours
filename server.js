const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

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

const tour = mongoose.model('Tour', tourschema);

app.listen(port, () => {
  console.log('Listening to server');
});
