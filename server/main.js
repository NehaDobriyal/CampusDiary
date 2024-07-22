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
import http from 'http';
import cors from 'cors';
import personalchat from "./routes/personalchat.js";
dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Connect to MongoDB
connection();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authroutes);
app.use("/api/community", communityroutes);
app.use("/api/personalchat", personalchat);
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
server.listen(process.env.PORT || 4500, () => {
  console.log(`Server is running on port ${process.env.PORT || 4500}`);
});

export { io };
