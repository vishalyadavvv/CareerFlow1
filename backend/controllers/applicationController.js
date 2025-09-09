import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { Cloudinary } from "../utils/cloudinary.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const employerGetAllApplications = async (req, res) => {
    try {
        // Fetch all applications with job and applicant details
        const applications = await Application.find()
            .populate({
                path: "job",
                populate: { path: "company" },
            })
            .populate("applicant") // user details
            .sort({ createdAt: -1 });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while fetching applications.",
            success: false,
        });
    }
};
export const jobseekerDeleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const userId = req.id;

        // Find the application
        const application = await Application.findOne({ _id: applicationId, applicant: userId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found or you are not authorized.",
                success: false,
            });
        }

        // Remove application reference from job
        const job = await Job.findById(application.job);
        if (job) {
            job.applications = job.applications.filter(
                (appId) => appId.toString() !== applicationId.toString()
            );
            await job.save();
        }

        // Delete application
        await Application.findByIdAndDelete(applicationId);

        return res.status(200).json({
            message: "Application deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while deleting application.",
            success: false,
        });
    }
};

export const jobseekerGetAllApplications = async (req, res) => {
    try {
        const userId = req.id; // Logged-in user ID

        // Find all applications by this user
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: { path: "company" },
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found for this user.",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while fetching applications.",
            success: false,
        });
    }
};
export const postApplication = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Check if user already applied
        const existing = await Application.findOne({ job: jobId, applicant: userId });
        if (existing) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Create application
        const application = await Application.create({ job: jobId, applicant: userId });
        job.applications.push(application._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while posting application",
            success: false
        });
    }
};


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}