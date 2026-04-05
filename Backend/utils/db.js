import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

export let connectionError = null;

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Trim and remove any accidental quotes from URI
    const uri = process.env.MONGO_URI?.trim().replace(/^["']|["']$/g, "");
    
    mongoose.set("bufferCommands", false);
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected...");
    connectionError = null;
  } catch (error) {
    connectionError = error.message;
    console.error("CRITICAL DATABASE CONNECTION ERROR:", error);
  }
};

export default connectDB;
