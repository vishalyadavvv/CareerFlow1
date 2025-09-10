import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

// -------------------- Apply for a Job --------------------
export const applyJob = catchAsyncErrors(async (req, res, next) => {
  const jobId = req.params.id;
  const userId = req.user._id;
  const { name, email, phone, address, coverLetter } = req.body;

  // Validate Job ID
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return next(new ErrorHandler("Invalid Job ID", 400));
  }

  // Find the job
  const job = await Job.findById(jobId);
  if (!job) return next(new ErrorHandler("Job not found", 404));

  // Check if user already applied
  const existingApp = await Application.findOne({ job: jobId, applicant: userId });
  if (existingApp) return next(new ErrorHandler("You already applied for this job", 400));

  // Handle resume upload (if you have file upload setup)
  let resumeData = {};
  if (req.files && req.files.resume) {
    // Add your cloudinary or file upload logic here
    // For now, we'll just store basic info
    resumeData = {
      public_id: "temp_id",
      url: "temp_url" // Replace with actual upload logic
    };
  }

  // Create new application with all the required fields
  const application = await Application.create({
    job: jobId,
    applicant: userId,
    name,
    email,
    phone,
    address,
    coverLetter: coverLetter || "No cover letter provided",
    resume: resumeData,
    status: "pending",
  });

  // Ensure job.applications is initialized
  if (!Array.isArray(job.applications)) {
    job.applications = [];
  }

  // Add application reference to job
  job.applications.push(application._id);
  await job.save();

  res.status(201).json({
    success: true,
    message: "Applied successfully",
    application,
  });
});

// -------------------- Get all applications for a user --------------------
export const getAppliedJobs = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const applications = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({ path: "job", populate: { path: "company" } });

  if (!applications.length) {
    return next(new ErrorHandler("No applications found", 404));
  }

  res.status(200).json({ success: true, applications });
});

// -------------------- Get applicants for a job --------------------
export const getApplicants = catchAsyncErrors(async (req, res, next) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return next(new ErrorHandler("Invalid Job ID", 400));
  }

  const job = await Job.findById(jobId).populate({
    path: "applications",
    populate: { path: "applicant" },
  });

  if (!job) return next(new ErrorHandler("Job not found", 404));

  res.status(200).json({ success: true, job });
});

// -------------------- Employer: Get all applications --------------------
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("=== EMPLOYER GET ALL APPLICATIONS DEBUG ===");
    
    // Step 1: Try basic query without populate
    console.log("Step 1: Basic query...");
    const basicApps = await Application.find();
    console.log("Basic applications count:", basicApps.length);
    console.log("Sample application:", basicApps[0]);

    // Step 2: Try with simple populate
    console.log("Step 2: With job populate...");
    const jobPopulated = await Application.find().populate('job');
    console.log("Job populated count:", jobPopulated.length);

    // Step 3: Try full populate
    console.log("Step 3: Full populate...");
    const applications = await Application.find()
      .populate('job')
      .populate('applicant')
      .sort({ createdAt: -1 });

    console.log("Fully populated count:", applications.length);

    res.status(200).json({ 
      success: true, 
      applications: applications || [],
      count: applications.length
    });

  } catch (error) {
    console.error("EMPLOYER GET ALL ERROR:", error);
    return next(new ErrorHandler(`Failed to fetch applications: ${error.message}`, 500));
  }
});

// -------------------- Jobseeker: Get all applications --------------------
// -------------------- Jobseeker: Get all applications --------------------
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  console.log("=== DEBUG: Starting jobseekerGetAllApplications ===");
  console.log("User from req:", req.user);
  
  if (!req.user || !req.user._id) {
    console.log("❌ No user found in request");
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const userId = req.user._id;
  console.log("✅ User ID:", userId);

  try {
    // Step 1: Try basic query
    console.log("Step 1: Basic query...");
    const applications = await Application.find({ applicant: userId });
    console.log("✅ Found applications count:", applications.length);

    // Step 2: Try with sort
    console.log("Step 2: With sorting...");
    const sortedApps = await Application.find({ applicant: userId }).sort({ createdAt: -1 });
    console.log("✅ Sorted applications count:", sortedApps.length);

    // Step 3: Try with populate
    console.log("Step 3: With populate...");
    const populatedApps = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate('job');
    console.log("✅ Populated applications count:", populatedApps.length);

    res.status(200).json({ 
      success: true, 
      applications: populatedApps,
      count: populatedApps.length
    });

  } catch (error) {
    console.error("❌ ACTUAL ERROR:", error.message);
    console.error("❌ FULL ERROR:", error);
    return next(new ErrorHandler(`Database error: ${error.message}`, 500));
  }
});
// -------------------- Delete application --------------------
export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const applicationId = req.params.id;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return next(new ErrorHandler("Invalid Application ID", 400));
  }

  // Just delete the application without job cleanup for now
  const application = await Application.findOneAndDelete({ 
    _id: applicationId, 
    applicant: userId 
  });

  if (!application) {
    return next(new ErrorHandler("Application not found or unauthorized", 404));
  }

  res.status(200).json({ success: true, message: "Application deleted successfully" });
});

// -------------------- Update application status --------------------
export const updateStatus = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const applicationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return next(new ErrorHandler("Invalid Application ID", 400));
  }

  if (!status) return next(new ErrorHandler("Status is required", 400));

  const application = await Application.findById(applicationId);
  if (!application) return next(new ErrorHandler("Application not found", 404));

  application.status = status.toLowerCase();
  await application.save();

  res.status(200).json({ success: true, message: "Status updated successfully" });
});
// -------------------- Employer: Delete application --------------------
export const employerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const applicationId = req.params.id;
  const employerId = req.user._id;

  console.log("=== EMPLOYER DELETE DEBUG ===");
  console.log("Application ID:", applicationId);
  console.log("Employer ID:", employerId);

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return next(new ErrorHandler("Invalid Application ID", 400));
  }

  try {
    const application = await Application.findById(applicationId);
    
    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }

    console.log("Application found, job reference:", application.job);

    // Check if job exists and belongs to employer
    if (application.job && mongoose.Types.ObjectId.isValid(application.job)) {
      const job = await Job.findById(application.job);
      
      if (job) {
        console.log("Job found. Job owner:", job.postedBy);
        console.log("Current employer:", employerId);
        console.log("Ownership match:", job.postedBy.toString() === employerId.toString());
        
        // Check ownership
        if (job.postedBy.toString() !== employerId.toString()) {
          return next(new ErrorHandler("Unauthorized: You can only delete applications for your jobs", 403));
        }

        // Clean up job's applications array
        if (job.applications && Array.isArray(job.applications)) {
          job.applications = job.applications.filter(appId => 
            appId && appId.toString() !== applicationId.toString()
          );
          await job.save();
        }
      } else {
        console.log("Job not found, allowing delete of orphaned application");
      }
    } else {
      console.log("Invalid job reference, allowing delete");
    }

    // Perform the delete
    const deletedApp = await Application.findByIdAndDelete(applicationId);
    
    if (!deletedApp) {
      return next(new ErrorHandler("Failed to delete application", 500));
    }

    console.log("Application successfully deleted");

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully"
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return next(new ErrorHandler(`Delete failed: ${error.message}`, 500));
  }
});