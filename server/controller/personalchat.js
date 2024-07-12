import { getUserId } from "../middleware/auth";
import User from "../model/user";
import PersonalMessage from "../model/personal";
import {io} from '../server'
import {encryptMessage,encryptedSymmetricKey,decryptMessage,decryptSymmetricKey} from "../helper/encryption";
export const sendPersonalMessage = async (req, res) => {
    const { recipientId, content } = req.body;
    const senderId = getUserId(req);

    if (!senderId || !recipientId || !content) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
        return res.status(404).json({ message: "Recipient not found" });
    }

    const symmetricKey = generateSymmetricKey();
    const { encryptedMessage, iv } = encryptMessage(content, symmetricKey);
    const encryptedSymmetricKey = encryptSymmetricKey(symmetricKey, recipient.publicKey);

    const newMessage = {
        senderId,
        recipientId,
        encryptedMessage: `${encryptedSymmetricKey}:${iv}:${encryptedMessage}`
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
    const { recipientId } = req.params;
    const userId = getUserId(req);

    if (!userId || !recipientId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const messages = await PersonalMessage.find({
            $or: [
                { senderId: userId, recipientId },
                { senderId: recipientId, recipientId: userId }
            ]
        }).sort({ timestamp: 1 });

        const decryptedMessages = messages.map(message => {
            const [encryptedSymmetricKey, iv, encryptedContent] = message.encryptedMessage.split(':');
            const symmetricKey = decryptSymmetricKey(encryptedSymmetricKey, user.privateKey);
            const content = decryptMessage(encryptedContent, symmetricKey, iv);
            return { ...message._doc, content };
        });

        res.status(200).json(decryptedMessages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving messages" });
    }
};