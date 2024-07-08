import dotenv from "dotenv";
import mongoose from "mongoose";
import connection from "./helper/connect.js";
import express from "express";
dotenv.config();
const app = express();
connection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



