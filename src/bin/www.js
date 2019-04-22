import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

// Get port to listen on
const port = process.env.PORT || 4200;

// connection url
const connectionUrl = process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true
}, () => {
  console.log('MongoDb database connection established');
});

app.listen(port, () => {
    console.log(`Listening at :${port}...`);
});
