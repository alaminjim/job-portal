import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import isRecruiter from "../middleware/isRecruiter.js";
import {
  getAllCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(authenticateToken, isRecruiter, registerCompany);
router.route("/get").get(authenticateToken, isRecruiter, getAllCompanies);
router.route("/get/:id").get(authenticateToken, getCompanyById);
router.route("/update/:id").put(authenticateToken, isRecruiter, singleUpload, updateCompany);

export default router;
