import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaFileAlt } from "react-icons/fa";
import { URL } from "../../../constant/api";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    
    try {
      const response = await axios.post(
        `${URL}/v1/job/post`,
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      toast.success(response.data.message);
      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <div className="max-w-sm mx-auto xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-down">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 sm:mb-4 leading-tight">
            Post a New Job Opportunity
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2">
            Find the perfect candidate for your team by posting your job opening on our platform.
          </p>
          <div className="mt-3 sm:mt-4 h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl animate-fade-in-up">
          {/* Form Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6 text-white">
            <div className="flex items-center">
              <FaBriefcase className="text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Job Details</h2>
            </div>
            <p className="mt-1 sm:mt-2 opacity-90 text-sm sm:text-base">Fill in the details below to create your job posting</p>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleJobPost} className="space-y-6 sm:space-y-8">
              {/* Job Title & Category */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 flex items-center">
                    <FaBriefcase className="mr-1 sm:mr-2 text-indigo-500 text-sm sm:text-base flex-shrink-0" />
                    <span className="truncate">Job Title <span className="text-red-500 ml-1">*</span></span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 flex items-center">
                    <FaBriefcase className="mr-1 sm:mr-2 text-indigo-500 text-sm sm:text-base flex-shrink-0" />
                    <span className="truncate">Category <span className="text-red-500 ml-1">*</span></span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Web Development">Frontend Web Development</option>
                    <option value="MERN Stack Development">MERN STACK Development</option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="MEAN Stack Development">MEAN STACK Development</option>
                    <option value="MEVN Stack Development">MEVN STACK Development</option>
                    <option value="Data Entry Operator">Data Entry Operator</option>
                  </select>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                  <FaMapMarkerAlt className="mr-1 sm:mr-2 text-indigo-500 text-sm sm:text-base flex-shrink-0" />
                  <span>Location Details</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    Full Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Full address or remote work details"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Salary Information */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                  <FaMoneyBillWave className="mr-1 sm:mr-2 text-indigo-500 text-sm sm:text-base flex-shrink-0" />
                  <span>Salary Information</span>
                </h3>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                      Salary Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={salaryType}
                      onChange={(e) => setSalaryType(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="default">Select Salary Type</option>
                      <option value="Fixed Salary">Fixed Salary</option>
                      <option value="Ranged Salary">Ranged Salary</option>
                    </select>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                      {salaryType === "Fixed Salary" ? "Fixed Amount" : "Salary Range"} <span className="text-red-500">*</span>
                    </label>
                    {salaryType === "default" ? (
                      <p className="text-xs sm:text-sm text-gray-500 italic py-2 sm:py-3">Please select a salary type</p>
                    ) : salaryType === "Fixed Salary" ? (
                      <div className="relative">
                        <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm sm:text-base">$</span>
                        <input
                          type="number"
                          placeholder="Enter Fixed Salary"
                          value={fixedSalary}
                          onChange={(e) => setFixedSalary(e.target.value)}
                          className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div className="relative">
                          <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm sm:text-base">$</span>
                          <input
                            type="number"
                            placeholder="From"
                            value={salaryFrom}
                            onChange={(e) => setSalaryFrom(e.target.value)}
                            className="w-full pl-6 sm:pl-8 pr-2 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                        <div className="relative">
                          <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-500 text-sm sm:text-base">$</span>
                          <input
                            type="number"
                            placeholder="To"
                            value={salaryTo}
                            onChange={(e) => setSalaryTo(e.target.value)}
                            className="w-full pl-6 sm:pl-8 pr-2 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 flex items-center">
                  <FaFileAlt className="mr-1 sm:mr-2 text-indigo-500 text-sm sm:text-base flex-shrink-0" />
                  <span>Job Description <span className="text-red-500 ml-1">*</span></span>
                </label>
                <textarea
                  rows="4"
                  className="sm:hidden w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  required
                />
                <textarea
                  rows="6"
                  className="hidden sm:block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium text-white transition-all duration-300 shadow-lg text-sm sm:text-base ${
                    isSubmitting 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1 active:transform active:translate-y-0'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm sm:text-base">Processing...</span>
                    </span>
                  ) : (
                    'Create Job Posting'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom animations and responsive styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs\\:max-w-md { max-width: 28rem; }
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:max-w-xs { max-width: 20rem; }
          .xs\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
        }

        /* Ensure proper touch targets on mobile */
        @media (max-width: 640px) {
          input, select, textarea, button {
            min-height: 44px;
          }
          
          /* Improve readability on small screens */
          .truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        /* Improve focus states for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-down,
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
          }
          
          .transition-all {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PostJob;