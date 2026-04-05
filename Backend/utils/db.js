import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Set global buffering to false to prevent hanging queries on connection fail
    mongoose.set("bufferCommands", false);
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
