import { getUserId } from "../middleware/auth.js";
import User from "../model/user.js";
import Room from "../model/room.js";
export const getallusers = async (req, res) => {
    try {
        const id = getUserId(req);
        if (!id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const roomid = user.roomid; 
        const room = await Room.findById(roomid); 
        if (!room) {
            return res.status(404).json({ message: "Room not found." });
        }
        const users = room.users.filter(u1 => u1.toString() !== user._id.toString());
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
