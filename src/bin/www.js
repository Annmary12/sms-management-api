import Express from "express";
import Mongoose from "mongoose";
import BodyParser from "body-parser";
import cors from 'cors';

const app = Express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

Mongoose.connect('mongodb://127.0.0.1:27017/sms', {
  useNewUrlParser: true
});

const connection = Mongoose.connection;

connection.once('open', () => {
  console.log('MongoDb database connection established');
})

app.post("/person", async (request, response) => {
  res.json('I am here===')
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});
