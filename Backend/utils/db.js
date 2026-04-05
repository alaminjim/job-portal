import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Set global buffering to false to prevent hanging queries on connection fail
    mongoose.set("bufferCommands", false);
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("CRITICAL DATABASE CONNECTION ERROR:", error);
  }
};

export default connectDB;
