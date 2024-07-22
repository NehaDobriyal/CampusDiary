import { getUserId } from "../middleware/auth.js";
import User from "../model/user.js";
import PersonalMessage from "../model/personal.js";
import {io} from '../main.js';
import ChatSession from "../model/ChatSession.js";
//import {encryptMessage,encryptedSymmetricKey,decryptMessage,decryptSymmetricKey} from "../helper/encryption.js";
export const sendPersonalMessage = async (req, res) => {
    const { senderId,recipientId,message} = req.body;
    if (!senderId || !recipientId || !message) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
        return res.status(404).json({ message: "Recipient not found" });
    }
   // const symmetricKey = generateSymmetricKey();
   // const { encryptedMessage, iv } = encryptMessage(content, symmetricKey);
    //const encryptedSymmetricKey = encryptSymmetricKey(symmetricKey, recipient.publicKey);
    const newMessage = {
        senderId,
        recipientId,
        encryptedMessage: message
    };
    try {
        await PersonalMessage.create(newMessage);
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

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const lastMessages = await PersonalMessage.find({
            $or: [
                { senderId: userId },
                { recipientId: userId }
            ]
        }).sort({ timestamp: -1 });
        console.log(lastMessages);
        let messages = [];
        for (const msg of lastMessages) {
            const id = (msg.recipientId === userId) ? msg.senderId : msg.recipientId;
            const user2 = await User.findById(id);
            if (!user2) {
                console.log("User not found");
                continue;
            }
            const secondUsername = user2.username;
            
            messages.push({
                senderId: userId,
                recipientId: id,
                message: msg.encryptedMessage,
                timestamp: msg.timestamp,
                username: secondUsername,
                isSender: (msg.senderId === userId)
            });
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving messages" });
    }
};


export const setupchat = async(req,res)=>{
    const {user1,user2} = req.params;
    if(!user1 ||!user2){
        return res.status(401).json({message:"Unauthorized"});
    }
    try {
        let chatSession = await ChatSession.findOne({
          $or: [
            { user1: user1, user2: user2 },
            { user1: user2, user2: user1 }
          ]
        });
    
        if (!chatSession) {
          chatSession = new ChatSession({
            user1: user1,
            user2: user2
          });
          await chatSession.save();
        }
    
        res.status(200).json(chatSession.messages);
      } catch (error) {
        res.status(500).send(error.message);
      }
};