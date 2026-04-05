import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

export let connectionError = null;

let cachedPromise = null;

// Connect to MongoDB with caching and retry logic
const connectDB = async () => {
  if (cachedPromise && mongoose.connection.readyState === 1) return;

  if (!cachedPromise || mongoose.connection.readyState === 0) {
    const uri = process.env.MONGO_URI?.trim().replace(/^["']|["']$/g, "");
    mongoose.set("bufferCommands", false);
    
    cachedPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000, // Wait up to 15s
    }).then((conn) => {
      console.log("MongoDB Connected Successfully");
      connectionError = null;
      return conn;
    }).catch((err) => {
      connectionError = err.message;
      cachedPromise = null; // Reset handle to allow retry on next request
      throw err;
    });
  }
  return cachedPromise;
};

export default connectDB;
