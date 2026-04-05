import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB, { connectionError } from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});
const app = express();

try {
  await connectDB();
} catch (error) {
  console.error("Database initialization failed:", error.message);
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-367396.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Strip trailing slash if any
    const cleanOrigin = origin ? origin.replace(/\/$/, "") : null;
    if (!cleanOrigin || allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Database connection check middleware
app.use(async (req, res, next) => {
  // If connecting (2), wait for a few seconds
  if (mongoose.connection.readyState === 2) {
    let attempts = 0;
    while (mongoose.connection.readyState === 2 && attempts < 30) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // wait 100ms
      attempts++;
    }
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: `Database connection not ready. Error: ${connectionError || "Check Atlas IP whitelist or URI"}`,
      success: false,
    });
  }
  next();
});

const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
