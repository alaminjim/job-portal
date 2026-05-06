import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * POST /api/user/google-auth
 * Body: { idToken, role }
 *
 * Flow:
 *  1. Verify Google ID token
 *  2. If user exists → check role matches → login
 *  3. If user does NOT exist → register with the chosen role
 */
export const googleAuth = async (req, res) => {
  try {
    const { idToken, role } = req.body;

    if (!idToken || !role) {
      return res
        .status(400)
        .json({ message: "Google token and role are required", success: false });
    }

    if (!["Student", "Recruiter"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Invalid role selected", success: false });
    }

    // ── 1. Verify the Google ID token ──────────────────────────────────────
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      return res
        .status(401)
        .json({ message: "Invalid Google token", success: false });
    }

    const { sub: googleId, email, name, picture } = payload;

    // ── 2. Find existing user ───────────────────────────────────────────────
    let user = await User.findOne({ email });

    if (user) {
      // User exists — check role
      if (user.role !== role) {
        return res.status(403).json({
          message: `This account is registered as a ${user.role}. Please select "${user.role}" to login.`,
          success: false,
        });
      }

      // Update googleId if first time Google login
      if (!user.googleId) {
        user.googleId = googleId;
        user.isGoogleUser = true;
        if (!user.profile.profilePhoto && picture) {
          user.profile.profilePhoto = picture;
        }
        await user.save();
      }
    } else {
      // ── 3. New user — register via Google ────────────────────────────────
      user = new User({
        fullname: name,
        email,
        googleId,
        isGoogleUser: true,
        role,
        profile: {
          profilePhoto: picture || "",
        },
      });
      await user.save();
    }

    // ── 4. Issue JWT ────────────────────────────────────────────────────────
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isGoogleUser: user.isGoogleUser,
      profile: user.profile,
    };

    return res.status(200).json({
      message: `Welcome, ${user.fullname}!`,
      user: sanitizedUser,
      token,
      success: true,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res
      .status(500)
      .json({ message: "Google authentication failed", success: false });
  }
};
