import Express from "express";
import BodyParser from "body-parser";
import cors from 'cors';

const app = Express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.post("/person", async (request, response) => {
  res.json('I am here===')
});