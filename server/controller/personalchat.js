import { getUserId } from "../middleware/auth";
import User from "../model/user";
import PersonalMessage from "../model/personal";
import {io} from '../server'

export const sendPersonalMessage = async (req, res) => {
    const { content, receiverId } = req.body;
    const senderId = getUserId(req);

    if (!senderId || !receiverId || !content) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
        return res.status(404).json({ message: "User not found" });
    }

    const newMessage = {
        senderId: senderId,
        receiverId: receiverId,
        content: content,
    };

    try {
        const personalMessage = await PersonalMessage.create(newMessage);
        io.to(receiverId.toString()).emit('personalMessage', personalMessage); // Emit to the receiver's socket
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending message" });
    }
};



export const getPersonalMessages = async (req, res) => {
    const userId = getUserId(req);
    const { chatWithId } = req.params;

    if (!userId || !chatWithId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const messages = await PersonalMessage.find({
            $or: [
                { senderId: userId, receiverId: chatWithId },
                { senderId: chatWithId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 });

        const decryptedMessages = messages.map(msg => {
            const decryptedContent = msg.decryptContent();
            return { ...msg.toObject(), content: decryptedContent };
        });

        res.status(200).json(decryptedMessages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving messages" });
    }
};