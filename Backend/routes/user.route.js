import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  bookmarkJob,
  getBookmarkedJobs,
} from "../controllers/user.controller.js";
import { googleAuth } from "../controllers/googleAuth.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/google-auth").post(googleAuth);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);
router.route("/bookmark/:id").get(authenticateToken, bookmarkJob);
router.route("/bookmarks").get(authenticateToken, getBookmarkedJobs);

export default router;
