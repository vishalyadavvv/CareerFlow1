import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { URL } from "../../../constant/api";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id: jobId } = useParams(); // get job ID from route

  // Handle file change and preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResume(file);

    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL);
    } else {
      setPreviewURL(null);
    }
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) {
      toast.error("Job ID is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverLetter", coverLetter);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("jobId", jobId); // send jobId to backend
    if (resume) formData.append("resume", resume);

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${URL}/v1/application/post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Application submitted successfully!");
      navigateTo("/job/getall"); // redirect after submission
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden animate-fade-in">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Job Application</h1>
            <p className="text-sm sm:text-base opacity-90">Complete the form below to apply for this position</p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
              <textarea
                id="coverLetter"
                placeholder="Tell us why you're the perfect candidate..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="4"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume</label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6">
                    <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 5MB)</p>
                  </div>
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {resume && (
                <div className="mt-3 flex items-center justify-between bg-blue-50 p-2 sm:p-3 rounded-lg animate-fade-in">
                  <span className="text-xs sm:text-sm font-medium text-blue-700 truncate">{resume.name}</span>
                  <button type="button" onClick={() => { setResume(null); setPreviewURL(null); }} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 sm:py-3 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                  isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>

        {/* Back Button */}
        <div className="mt-4 sm:mt-6 text-center">
          <button
            onClick={() => navigateTo("/job/getall")}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 text-sm sm:text-base"
          >
            Back to Job Listings
          </button>
        </div>
      </div>
    </section>
  );
};

export default Application;
  