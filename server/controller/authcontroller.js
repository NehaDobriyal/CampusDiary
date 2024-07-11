import User from "../model/user.js";
import { hashValue,verifyValue } from "../helper/hashfunction.js";
import { generateUsername } from "../helper/username.js";
import Room from "../model/room.js";
export const registerController = async (req,res)=>{
    try{
       const {email,password,university} = req.body;
       if(!email || !password || !university){
          return res.status(400).json({message: "All fields are required."});
       }
       email = hashValue(email);
       password = hashValue(password);
       const existingUser = await User.findOne({email});
       if(existingUser){
           return res.status(400).json({message: "Email already exists."});
       }
       const existingRoom = await Room.findOne({university});
       if(!existingRoom){
          return res.status(400).json({message: "University doesn't exists."});
       }
       username = generateUsername(university,existingRoom.userno+1);
       existingRoom.userno++;
       await existingRoom.save();
       const roomid = existingRoom._id;
       const user = new User({email,username,password, university,roomid});
       await user.save();
    }
    catch(e){
        console.error(e);
    }
};
export const loginController  = async (req,res)=>{
   try{
      const {email,password} = req.body;
      if(!email ||!password){
         return res.status(400).json({message: "All fields are required."});
      }
      email = hashValue(email);
      const user = await User.findOne({email: email});
      if(!user){
         return res.status(401).json({message: "Invalid credentials."});
      }
      password = hashValue(password);
      const isMatch = await verifyValue(password, user.password);
      if(isMatch){
         
      }
      else{
         return res.status(401).json({message: "Invalid credentials."});
      }
   }
   catch(error){
       console.error(error);
   }
}