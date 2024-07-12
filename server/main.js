import dotenv from "dotenv";
import mongoose from 'mongoose';
import connection from "./helper/connect.js"; 
import express from 'express';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import authroutes from "./routes/authroutes.js";
import communityroutes from "./routes/communityroutes.js";
import homeroutes from "./routes/homeroutes.js"; 
import personalchat from "./routes/personalchat.js";
import profileroutes from "./routes/profileroutes.js"; 

dotenv.config();
const app = express();
const server = require('http').createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

// Connect to MongoDB
connection();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authroutes);
app.use("/api/community", communityroutes);
app.use("/api/home", homeroutes);
app.use("/api/personalchat", personalchat);
app.use("/api/profile", profileroutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomid) => {
    socket.join(roomid);
    console.log(`User joined room: ${roomid}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export { io }; 
