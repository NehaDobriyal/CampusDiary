import User from "../model/user.js";
export const registerController = async (req,res)=>{
    try{
       const {email,password,university} = req.body;
       if(!email || !password || !university){
          return res.status(400).json({message: "All fields are required."});
       }
       const existingUser = await User.findOne({email});
       if(existingUser){
          return res.status(400).json({message: "Email already exists."});
       } 
    }
    catch(e){
        console.error(e);
    }
};