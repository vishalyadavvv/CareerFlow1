import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

// -------------------- Apply for a Job --------------------
export const applyJob = catchAsyncErrors(async (req, res, next) => {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
        return next(new ErrorHandler("Job id is required.", 400));
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
        return next(new ErrorHandler("You have already applied for this job.", 400));
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
    }

    // Create a new application
    const newApplication = await Application.create({ job: jobId, applicant: userId });

    // Push application id to job model
    job.applications.push(newApplication._id);
    await job.save();

    res.status(201).json({
        success: true,
        message: "Job applied successfully."
    });
});

// -------------------- Get all applied jobs for a user --------------------
export const getAppliedJobs = catchAsyncErrors(async (req, res, next) => {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
            path: "job",
            populate: { path: "company" },
        });

    if (!applications || applications.length === 0) {
        return next(new ErrorHandler("No applications found.", 404));
    }

    res.status(200).json({
        success: true,
        applications,
    });
});

// -------------------- Get applicants for a job (Admin) --------------------
export const getApplicants = catchAsyncErrors(async (req, res, next) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path: "applications",
        populate: { path: "applicant" }
    });

    if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
    }

    res.status(200).json({
        success: true,
        job,
    });
});

// -------------------- Employer: Get all applications --------------------
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
    const applications = await Application.find()
        .populate({
            path: "job",
            populate: { path: "company" },
        })
        .populate("applicant")
        .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
        return next(new ErrorHandler("No applications found.", 404));
    }

    res.status(200).json({
        success: true,
        applications,
    });
});

// -------------------- Jobseeker: Get all applications --------------------
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
            path: "job",
            populate: { path: "company" },
        });

    if (!applications || applications.length === 0) {
        return next(new ErrorHandler("No applications found for this user.", 404));
    }

    res.status(200).json({
        success: true,
        applications,
    });
});

// -------------------- Delete application (Jobseeker) --------------------
export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
    const applicationId = req.params.id;
    const userId = req.id;

    const application = await Application.findOne({ _id: applicationId, applicant: userId });
    if (!application) {
        return next(new ErrorHandler("Application not found or not authorized.", 404));
    }

    // Remove from job
    const job = await Job.findById(application.job);
    if (job) {
        job.applications = job.applications.filter(appId => appId.toString() !== applicationId.toString());
        await job.save();
    }

    // Delete application
    await Application.findByIdAndDelete(applicationId);

    res.status(200).json({
        success: true,
        message: "Application deleted successfully."
    });
});

// -------------------- Post application --------------------
export const postApplication = catchAsyncErrors(async (req, res, next) => {
    const { jobId } = req.body;
    const userId = req.id;

    if (!jobId) {
        return next(new ErrorHandler("Job ID is required", 400));
    }

    const job = await Job.findById(jobId);
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }

    const existing = await Application.findOne({ job: jobId, applicant: userId });
    if (existing) {
        return next(new ErrorHandler("You have already applied for this job", 400));
    }

    const application = await Application.create({ job: jobId, applicant: userId });
    job.applications.push(application._id);
    await job.save();

    res.status(201).json({
        success: true,
        message: "Application submitted successfully"
    });
});

// -------------------- Update application status --------------------
export const updateStatus = catchAsyncErrors(async (req, res, next) => {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
        return next(new ErrorHandler("Status is required", 400));
    }

    const application = await Application.findById(applicationId);
    if (!application) {
        return next(new ErrorHandler("Application not found.", 404));
    }

    application.status = status.toLowerCase();
    await application.save();

    res.status(200).json({
        success: true,
        message: "Status updated successfully."
    });
});
