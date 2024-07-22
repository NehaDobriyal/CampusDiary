import mongoose from 'mongoose';

const ChatSessionSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalMessage'
  }]
}, {
  timestamps: true 
});

const ChatSession = mongoose.model('ChatSession', ChatSessionSchema);
export default ChatSession;
