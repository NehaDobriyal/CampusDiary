import dotenv from "dotenv";
import mongoose from 'mongoose';
import connection from "./helper/connect.js";
import express from 'express';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { Server } from "socket.io";
dotenv.config();
const app = express();
const server = htp.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
  }
});
connection();
app.use(express.json());
app.use(cookieParser());
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('joinRoom', (roomid) => {
      socket.join(roomid);
      console.log(`User joined room: ${roomid}`);
  });
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});
export { io };
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



