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
    encryptedMessage: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isread:{
        type: Boolean,
        default: false
    }
});

const PersonalMessage = mongoose.model('PersonalMessage', PersonalMessageSchema);
export default PersonalMessage;
