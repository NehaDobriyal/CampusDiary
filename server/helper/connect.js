import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// making a connection to database
export default async function connection() {
  const url = process.env.MONGODB_URI;  
  if (!url) {
    console.error("Error: MONGODB_URI is not defined in the environment variables.");
    return;
  }
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
