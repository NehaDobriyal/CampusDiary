import { getUserId } from "../middleware/auth";
import User from "../model/user";
import Message from "../model/groupchat.js";

import { getUserId } from "../middleware/auth";
import User from "../model/user";
import Message from "../model/groupchat.js";
import { io } from '../server'; // Import the io instance

export const sendMessage = async (req, res) => {
    const { content, chatid } = req.body;
    const id = getUserId(req);

    if (!id || !chatid || !content) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const roomid = user.roomid;

    const newmessage = {
        senderId: id,
        content: content,
        roomid: roomid,
    };

    try {
        const newchat = await Message.create(newmessage);
        io.to(roomid).emit('message', newchat); 
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending message" });
    }
};

export const getMessages = async (req, res) => {
    const { chatid } = req.params;
    const id = getUserId(req);
    if (!id || !chatid) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        const messages = await Message.find({ roomid: chatid }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving messages" });
    }
};