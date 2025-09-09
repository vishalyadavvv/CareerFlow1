import express from "express";
import { upload } from "../middlewares/multer.js"; // add this line at top
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

// =========================
// Jobseeker Routes
// =========================

// Apply for a job
router.post("/apply/:id", isAuthenticated, applyJob); // pass jobId as param

// Get all applications by logged-in jobseeker
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);

// Delete an application by jobseeker
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

// Get all applied jobs for logged-in jobseeker
router.get("/applied", isAuthenticated, getAppliedJobs);

// =========================
// Employer Routes
// =========================

// Get all applications (for employer dashboard)
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);

// Get all applicants for a specific job
router.get("/applicants/:jobId", isAuthenticated, getApplicants);

// =========================
// General Routes
// =========================

// Post a new application (alternative route)
router.post("/post", isAuthenticated, upload.single("resume"), postApplication);

// Update application status (by employer)
router.put("/status/:id", isAuthenticated, updateStatus);

export default router;
