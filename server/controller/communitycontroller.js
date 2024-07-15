import { getUserId } from "../middleware/auth.js";
import User from "../model/user.js";
import Message from "../model/groupchat.js";
import { io } from '../main.js';
import Group from "../model/room.js";

export const createGroup = async (req, res) => {
  const { university } = req.body;
  if (!university) {
    return res.status(400).json({ message: "University field is required." });
  }
  try {
    const newRoom = new Group({ collegename: university });
    await newRoom.save();
    res.status(201).json({ message: "Room created successfully", newRoom });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { content } = req.body;
  const { roomid } = req.params;
  const id = req.user._id; // Get user ID from middleware
  console.log(id);

  if (!id || !content) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newMessage = {
    senderId: id,
    content: content,
    roomid: roomid,
  };

  try {
    const newChat = await Message.create(newMessage);
    io.to(roomid).emit('message', newChat);
    res.status(201).json({ message: "Message sent successfully", newChat });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};

export const getMessages = async (req, res) => {
  const { roomid } = req.params;
  const id = req.user._id; // Get user ID from middleware

  if (!id || !roomid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const messages = await Message.find({ roomid: roomid }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ message: "Error retrieving messages" });
  }
};
