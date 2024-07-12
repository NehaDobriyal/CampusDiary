import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    roomid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const Message = mongoose.model('Message', MessageSchema);
export default Message;
