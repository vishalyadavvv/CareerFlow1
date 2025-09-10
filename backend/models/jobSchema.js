import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    trim: true,
    minLength: [3, "Title must contain at least 3 characters!"],
    maxLength: [30, "Title cannot exceed 30 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
    trim: true,
    minLength: [30, "Description must contain at least 30 characters!"],
    maxLength: [500, "Description cannot exceed 500 characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please provide a location."],
    trim: true,
    minLength: [5, "Location must contain at least 5 characters!"],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Salary must be at least 4 digits"],
    max: [999999999, "Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary must be at least 4 digits"],
    max: [999999999, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary must be at least 4 digits"],
    max: [999999999, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Job must be posted by a user."],
  },
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
