import express from "express";
import { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import booksRouter from "./books.js";
import { defaultErrorHandler } from "./utils.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/books", booksRouter);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`API listening to port : ${SERVER_PORT}`);
});
