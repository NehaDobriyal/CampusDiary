import { getUserId } from "../middleware/auth.js";
import User from "../model/user.js";
import PersonalMessage from "../model/personal.js";
import {io} from '../main.js';
import { timestamp } from "rxjs";
import mongoose from "mongoose";
//import ChatSession from "../model/ChatSession.js";
//import {encryptMessage,encryptedSymmetricKey,decryptMessage,decryptSymmetricKey} from "../helper/encryption.js";
export const sendPersonalMessage = async (req, res) => {
    const { senderId, recipientId, message } = req.body;
    if (!senderId || !recipientId || !message) {
        return res.status(400).json({ message: "Bad Request: Missing required fields" });
    }
    const sender = await User.find(ObjectId(senderId));
    const reader = await User.find(ObjectId(recipientId));
    const recipient = await User.findById(recipientId);
    if (!recipient) {
        return res.status(404).json({ message: "Recipient not found" });
    }

    try {
        let connection = await PersonalMessage.findOne({
            $or: [
                { senderId, recipientId },
                { senderId: recipientId, recipientId: senderId }
            ]
        });

        if (!connection) {
            connection = new PersonalMessage({
                senderId,
                recipientId,
                encryptedMessages: []
            });
        }

        const newMessage = {
            sendBy: senderId,
            readBy: recipientId,
            content: message,
            senderusername : sender.username,
            readerusername : reader.username,
            read: false,
            timestamp: new Date()
        };

        connection.encryptedMessages.push(newMessage);
        await connection.save();
        io.to(senderId).emit('receiveMessage', newMessage);
        io.to(recipientId).emit('receiveMessage', newMessage);
        io.to(senderId).emit('updateSidebar', newMessage);
        io.to(recipientId).emit('updateSidebar', newMessage);
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending message" });
    }
};
export const getPersonalMessages = async (req, res) => {
    const userId = getUserId(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    //console.log(userId);
    try {
        const chatSessions = await PersonalMessage.find({
            $or: [
                { senderId: userId },
                { recipientId: userId}
            ]
        });
        if (!chatSessions.length) {
            return res.status(404).json({ message: "No messages found" });
        }
        let messages = [];
        for (const session of chatSessions) {
            if (session.encryptedMessages.length === 0) {
                continue;
            }
            const sortedMessages = session.encryptedMessages.sort((a, b) => b.timestamp - a.timestamp);
            const lastMessage = sortedMessages[0];
            //console.log(lastMessage);
            //console.log("sending:"+lastMessage.sendBy);
            //console.log("reading:"+lastMessage.readBy); 
            //console.log(lastMessage.sendBy===userId);
            const id = (lastMessage.sendBy.toString()) === userId ? lastMessage.readBy : lastMessage.sendBy;
            const user2 = await User.findById(id);
            //console.log("user2:"+id);
            if (!user2) {
                console.log("User not found");
                continue;
            }
            messages.push({
                senderId: lastMessage.sendBy,
                recipientId: lastMessage.readBy,
                message: lastMessage.content,
                timestamp: lastMessage.timestamp,
                username: user2.username,
                isSender: ((lastMessage.sendBy.toString()) === userId),
                seconduser :id,
            });
        }

        messages.sort((a, b) => b.timestamp - a.timestamp);

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving messages" });
    }
};


export const setupchat = async (req, res) => {
    const { user1, user2 } = req.params;
    //console.log(user1);
    //console.log(user2);
    if (!user1 || !user2) {
        return res.status(400).json({ message: "Bad Request: Missing user parameters" });
    }

    try {
        let chatSession = await PersonalMessage.findOne({
            $or: [
                { senderId: user1, recipientId: user2 },
                { senderId: user2, recipientId: user1 }
            ]
        });
        //console.log("chatSession: " + chatSession);
        if (!chatSession) {
            chatSession = new PersonalMessage({
                senderId: user1,
                recipientId: user2,
                encryptedMessages: []
            });
            await chatSession.save();
        }
        let messages = [];
        //console.log(chatSession);
        if(chatSession.encryptedMessages){
            for(const message of chatSession.encryptedMessages){
                const id = (message.sendBy.toString()) === user1? message.readBy : message.sendBy;
                const user = await User.findById(id);
                //console.log(user.username);
                //console.log("debugging messages..");
                messages.push({
                    sendBy: message.sendBy,
                    readBy: message.readBy,
                    content: message.content,
                    timestamp: message.timestamp,
                    username: user.username,
                    isSender: ((message.sendBy.toString()) === user1),
                    seconduser :id,
                })
            }
        }
        //console.log("messages:"+ messages);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};