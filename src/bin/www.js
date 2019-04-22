import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

// Get port to listen on
const port = process.env.PORT || 4200;

mongoose.connect('mongodb://127.0.0.1:27017/sms', {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDb database connection established');
})

app.listen(port, () => {
    console.log(`Listening at :${port}...`);
});
