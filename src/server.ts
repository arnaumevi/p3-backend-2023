import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.status(200).send("hi!");
});

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`API listening to port : ${SERVER_PORT}`);
});
