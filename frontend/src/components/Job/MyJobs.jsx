import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEdit, FaTrash, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../constant/api";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${URL}/v1/job/getmyjobs`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  // Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `${URL}/v1/job/update/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    
    try {
      const res = await axios.delete(
        `${URL}/v1/job/delete/${jobId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-indigo-700 font-medium">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-6 px-3 sm:py-8 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-3 sm:mb-4 animate-fade-in-down">
            Your Posted Opportunities
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Manage, update, and track all your job listings in one place
          </p>
          <div className="mt-4 sm:mt-6 h-1 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
        </div>

        {myJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {myJobs.map((element, index) => (
              <div
                key={element._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl animate-fade-in-up relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Status Badge */}
                <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold ${element.expired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {element.expired ? 'Expired' : 'Active'}
                </div>
                
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-5 text-white">
                  <div className="flex items-center justify-between">
                    <FaBriefcase className="text-lg sm:text-xl" />
                    <span className="text-xs sm:text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {element.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mt-2 sm:mt-3 truncate">{element.title}</h3>
                </div>

                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="space-y-4 sm:space-y-5">
                    {/* Location */}
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-indigo-500 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Location</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                              editingMode === element._id
                                ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                : "border-transparent bg-gray-50"
                            }`}
                            placeholder="Country"
                          />
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                              editingMode === element._id
                                ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                : "border-transparent bg-gray-50"
                            }`}
                            placeholder="City"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="flex items-start">
                      <FaMoneyBillWave className="text-indigo-500 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Salary</h4>
                        {element.fixedSalary ? (
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "fixedSalary",
                                e.target.value
                              )
                            }
                            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                              editingMode === element._id
                                ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                : "border-transparent bg-gray-50"
                            }`}
                          />
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryFrom",
                                  e.target.value
                                )
                              }
                              className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                                editingMode === element._id
                                  ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  : "border-transparent bg-gray-50"
                              }`}
                              placeholder="From"
                            />
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryTo",
                                  e.target.value
                                )
                              }
                              className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                                editingMode === element._id
                                  ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  : "border-transparent bg-gray-50"
                              }`}
                              placeholder="To"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="flex items-start">
                      <FaBriefcase className="text-indigo-500 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Category</h4>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "category",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                          className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                            editingMode === element._id
                              ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              : "border-transparent bg-gray-50"
                          }`}
                        >
                          <option value="Graphics & Design">Graphics & Design</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Frontend Web Development">Frontend Web Development</option>
                          <option value="MERN Stack Development">MERN Stack Development</option>
                          <option value="Account & Finance">Account & Finance</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Video Animation">Video Animation</option>
                          <option value="MEAN Stack Development">MEAN Stack Development</option>
                          <option value="MEVN Stack Development">MEVN Stack Development</option>
                          <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-start">
                      <FaClock className="text-indigo-500 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Status</h4>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "expired",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                          className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                            editingMode === element._id
                              ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              : "border-transparent bg-gray-50"
                          }`}
                        >
                          <option value={true}>Expired</option>
                          <option value={false}>Active</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Description</h4>
                      <textarea
                        rows={2}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                          editingMode === element._id
                            ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            : "border-transparent bg-gray-50"
                        }`}
                      />
                    </div>

                    {/* Location Details */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Location Details</h4>
                      <textarea
                        rows={2}
                        value={element.location}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "location",
                            e.target.value
                          )
                        }
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                          editingMode === element._id
                            ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            : "border-transparent bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      {editingMode === element._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(element._id)}
                            className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
                            title="Save Changes"
                          >
                            <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Save
                          </button>
                          <button
                            onClick={handleDisableEdit}
                            className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
                            title="Cancel"
                          >
                            <RxCross2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
                        >
                          <FaEdit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Edit Job
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="flex items-center justify-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-10 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                No Jobs Posted Yet
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                You haven't posted any jobs yet. Get started by creating your first job listing and find the perfect candidate!
              </p>
              <button
                onClick={() => navigateTo("/job/post")}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Post Your First Job
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add custom animations */}
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
      `}</style>
    </div>
  );
};

export default MyJobs;