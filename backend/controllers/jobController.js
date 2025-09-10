import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js"; // ✅ Import Application model
import ErrorHandler from "../middlewares/error.js";

// ✅ Get all jobs
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({ success: true, jobs });
});

// ✅ Post a job (Only Employers)
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400));
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(new ErrorHandler("Cannot enter both fixed and ranged salary.", 400));
  }

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy: req.user._id,
  });

  res.status(200).json({ success: true, message: "Job Posted Successfully!", job });
});

// ✅ Get jobs posted by logged-in employer
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({ success: true, myJobs });
});

// ✅ Update job
export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  const { id } = req.params;
  let job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  res.status(200).json({ success: true, message: "Job Updated!", job });
});

// ✅ Delete job
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }

  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job Deleted!" });
});

// ✅ Get single job
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  res.status(200).json({ success: true, job });
});

// ✅ Apply job (Job Seeker applies)
export const applyJob = catchAsyncErrors(async (req, res, next) => {
  const jobId = req.params.id;
  const userId = req.user._id; // ✅ From isAuthenticated middleware

  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  // Check if user already applied
  const existingApp = await Application.findOne({ job: jobId, user: userId });
  if (existingApp) {
    return next(new ErrorHandler("You already applied for this job.", 400));
  }

  // Create new application
  const application = await Application.create({
    job: jobId,
    user: userId,
    status: "pending",
  });

  res.status(201).json({ success: true, message: "Applied Successfully!", application });
});
