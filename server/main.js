import dotenv from "dotenv";
import mongoose from 'mongoose';
import connection from "./helper/connect.js";
import express from 'express';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
connection();
app.use(express.json());
app.use(cookieParser());
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



