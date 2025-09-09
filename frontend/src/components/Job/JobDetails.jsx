import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { URL } from "../../../constant/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${URL}/v1/job/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.job);
      } catch (error) {
        navigateTo("/notfound");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 mb-2 sm:mb-4 animate-fade-in-down leading-tight">
            Job Opportunity Details
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Explore this exciting career opportunity
          </p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Job Header */}
            <div className="mb-4 sm:mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 leading-tight">{job.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-800 w-fit">
                  {job.category}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Job Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Location */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-base sm:text-lg font-medium text-gray-900 break-words">{job.location}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{job.city}, {job.country}</p>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500">Salary</h3>
                  {job.fixedSalary ? (
                    <p className="text-base sm:text-lg font-medium text-gray-900">${job.fixedSalary}</p>
                  ) : (
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      ${job.salaryFrom} - ${job.salaryTo}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-500">{job.fixedSalary ? "Fixed" : "Range"}</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
              <div className="prose prose-indigo max-w-none text-sm sm:text-base text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-lg leading-relaxed">
                {job.description}
              </div>
            </div>

            {/* Conditional Content Based on User Role */}
            {user && user.role === "Employer" ? (
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Employer View
                    </h3>
                    <div className="mt-2 text-xs sm:text-sm text-blue-700">
                      <p>
                        You're viewing this job as an employer. Applicants will see this page when applying.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 flex justify-center">
                <Link 
                  to={`/application/${job._id}`}
                  className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] w-full sm:w-auto justify-center"
                >
                  Apply Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-4 sm:mt-6 text-center">
          <button
            onClick={() => navigateTo(-1)}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300 touch-manipulation py-2 px-3 rounded-md hover:bg-indigo-50 active:bg-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to previous page
          </button>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobDetails;