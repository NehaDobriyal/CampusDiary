import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        default : null
    },
    interest: {
        type: String,
    },
    //publicKey: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);
export default User;
