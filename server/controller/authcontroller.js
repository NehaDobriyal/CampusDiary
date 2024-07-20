import User from "../model/user.js";
import { hashValue, verifyValue } from "../helper/hashfunction.js";
import { generateUsername } from "../helper/username.js";
import Room from "../model/room.js";
import jwt from 'jsonwebtoken';
import { createGroup } from "./communitycontroller.js";
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
    password = await hashValue(password); 

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    let existingRoom = await Room.findOne({ collegename: university });
    if (!existingRoom) {
      await createGroup(university);
      existingRoom = await Room.findOne({ collegename: university });
    }
    const roomid = existingRoom._id;
    const username = await generateUsername(university, existingRoom.userno + 1);
    const user = new User({ email, username, password, university, roomid });
    await user.save();
    existingRoom.userno++;
    existingRoom.users.push(user._id);
    await existingRoom.save();
    const authToken = generateJWTToken(user);
    res.cookie('authToken', authToken, {
      maxAge: 59 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      secure: true,
      sameSite: 'None' 
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: user._id,
      roomId: user.roomid,
      authToken,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await verifyValue(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const authToken = generateJWTToken(user);
    res.cookie('authToken',authToken, {
      maxAge: 59 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      secure: true,
      sameSite: 'None' 
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      userId: user._id,
      roomId: user.roomid,
      authToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User Logout Controller
export const logoutController = (req, res) => {
  try {
    res.clearCookie('authToken', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict' 
    });
    res.status(200).send({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).send({ success: false, message: 'Logout failed', error });
  }
};
