import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

export let connectionError = null;

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Set global buffering to false to prevent hanging queries on connection fail
    mongoose.set("bufferCommands", false);
    
    await mongoose.connect(process.env.MONGO_URI, {
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
