import express from "express";
import dotenv from "dotenv";
import createError from 'http-errors';
const cors = require('cors');

import routes from "./routes";

const app = express();
dotenv.config();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

const { PORT } = process.env;

app.use(routes);



app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`API Up and running on ${PORT}`);
});

export default app;