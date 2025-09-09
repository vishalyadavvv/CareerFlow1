import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  updateStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Jobseeker routes
router.post("/apply", isAuthenticated, applyJob);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
router.get("/applied", isAuthenticated, getAppliedJobs);

// Employer routes
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/applicants/:jobId", isAuthenticated, getApplicants);

// Post Application route
router.post("/post", isAuthenticated, postApplication);

// Update status route
router.put("/status/:id", isAuthenticated, updateStatus);

export default router;
