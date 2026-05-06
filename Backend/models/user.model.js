import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: "",         // optional for Google OAuth users
    },
    password: {
      type: String,
      default: "",         // optional for Google OAuth users
    },
    role: {
      type: String,
      enum: ["Applicant", "Recruiter"],
      default: "Applicant",
      required: true,
    },
    // Google OAuth fields
    googleId: {
      type: String,
      default: null,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    profile: {
      bio:   { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalname: { type: String },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true, autoIndex: false }
);

export const User = mongoose.model("newUser", userSchema);
