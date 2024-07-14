import User from "../model/user.js";
import { getUserId } from "../middleware/auth";
export const getProfile = async (req, res) => {
  try {
    const id  = getUserId(req);
    if(!id){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(id).select('username interest'); 
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateprofile = async(req, res) =>{
  try{
    const text = req.body;
    const id = getUserId(req);
    if(!id){
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.find(id);
    if(!user){
      return res.status(404).json({ message: "User not found." });
    }
    user.interest = text;
    await user.save();
    res.json(text);
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getnewprofile = async (req, res) => {
    try {
       const id = req.params.id;
       if(!id){
            return res.status(401).json({ message: "Unauthorized" });
       }
       const user = await User.findById(id).select('_id username interest');
       if (!user) {
          return res.status(404).json({ message: "User not found." });
       }
       res.json(user);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};