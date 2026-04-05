import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, getAdminApplicants } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(authenticateToken, applyJob);
router.route("/get").get(authenticateToken, getAppliedJobs);
router.route("/:id/applicants").get(authenticateToken, getApplicants);
router.route("/alladminapplicants").get(authenticateToken, getAdminApplicants);
router.route("/status/:id/update").post(authenticateToken, updateStatus);

export default router;
