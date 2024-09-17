import mongoose from 'mongoose';

const PersonalMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    encryptedMessages: [{
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        isRead: {
            type: Boolean,
            default: false
        },
        sendBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        readBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        senderusername:{
            type: String,
        },
        readerusername:{
            type: String,
        }
    }]
});

const PersonalMessage = mongoose.model('PersonalMessage', PersonalMessageSchema);
export default PersonalMessage;
