import mongoose from 'mongoose';
const roomschema = mongoose.Schema({
    collegename:{
        type:String,
        required: true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    userno:{
        type:Number,
        default:0
    }
});
const Room = mongoose.model('Room',roomschema);

export default Room;