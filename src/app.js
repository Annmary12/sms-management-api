import Express from "express";
import BodyParser from "body-parser";
import cors from 'cors';
import routes from './routes';
import expressValidator from 'express-validator';

// setup express app
const app = Express();

app.use(cors());

// parse incoming request data
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// validates request
app.use(expressValidator());

// routes
app.use('/api/v1', routes);

// setup default route
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Invalid Route!!!'
  });
  next();
});

export default app;