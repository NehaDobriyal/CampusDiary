import User from "../model/user.js";
import { hashValue, verifyValue } from "../helper/hashfunction.js";
import { generateUsername } from "../helper/username.js";
import Room from "../model/room.js";
import jwt from 'jsonwebtoken';

const generateJWTToken = (user) => {
   return jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '59d' }
   );
};

export const registerController = async (req, res) => {
   try {
      let { email, password, university } = req.body;
      if (!email || !password || !university) {
         return res.status(400).json({ message: "All fields are required." });
      }
      email = hashValue(email);
      password = await hashValue(password); 
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "Email already exists." });
      }
      const existingRoom = await Room.findOne({ university });
      if (!existingRoom) {
         return res.status(400).json({ message: "University doesn't exist." });
      }
      const username = generateUsername(university, existingRoom.userno + 1);
      existingRoom.userno++;
      await existingRoom.save();
      const roomid = existingRoom._id;
      const user = new User({ email, username, password, university, roomid });
      await user.save();
      const token = generateJWTToken(user);
      res.cookie('authToken', token, {
         maxAge: 59 * 24 * 60 * 60 * 1000, // 59 days in milliseconds
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production'
      });
      res.status(201).json({
         success: true,
         message: 'User registered successfully',
         user: username,
         token,
      });
   } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
   }
};

export const loginController = async (req, res) => {
   try {
      let { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ message: "All fields are required." });
      }
      email = hashValue(email);
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(401).json({ message: "Invalid credentials." });
      }
      const isMatch = await verifyValue(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials." });
      }
      const token = generateJWTToken(user);
      res.cookie('authToken', token, {
         maxAge: 59 * 24 * 60 * 60 * 1000, // 59 days in milliseconds
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production'
      });
      res.status(200).json({
         success: true,
         message: 'Login successful',
         user: user.username,
         token,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
   }
};
export const logoutController = (req, res) => {
   try {
      res.clearCookie('authToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(200).send({ success: true, message: 'Logout successful' });
   } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send({ success: false, message: 'Logout failed', error });
   }
};