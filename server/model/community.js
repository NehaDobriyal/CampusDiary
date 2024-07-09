import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    /*
    isApproved: {
        type: Boolean,
        default: false
    }
    */
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
