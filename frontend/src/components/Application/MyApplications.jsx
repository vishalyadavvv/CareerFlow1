import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { URL } from "../../../constant/api";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        if (user && user.role === "Employer") {
          const res = await axios.get(
            `${URL}/v1/application/employer/getall`,
            { withCredentials: true }
          );
          // Ensure we always set an array, even if the response is malformed
          setApplications(Array.isArray(res.data.applications) ? res.data.applications : []);
        } else {
          const res = await axios.get(
            `${URL}/v1/application/jobseeker/getall`,
            { withCredentials: true }
          );
          // Ensure we always set an array, even if the response is malformed
          setApplications(Array.isArray(res.data.applications) ? res.data.applications : []);
        }
      } catch (error) {
        console.error("Fetch applications error:", error);
        toast.error(error.response?.data?.message || "An error occurred");
        // Set empty array on error to prevent undefined errors
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthorized) {
      navigateTo("/");
    } else {
      fetchApplications();
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
  if (!id) {
    toast.error("Invalid application ID");
    return;
  }

  try {
    setDeletingIds(prev => new Set([...prev, id]));
    
    let endpoint;
    
    if (user && user.role === "Employer") {
      endpoint = `${URL}/v1/application/employer/delete/${id}`;
    } else {
      endpoint = `${URL}/v1/application/delete/${id}`;
    }
    
    // Debug info
    console.log("DELETE REQUEST DEBUG:", {
      endpoint,
      applicationId: id,
      userRole: user?.role,
      userId: user?.id || user?._id,
      userName: user?.name,
      userEmail: user?.email
    });
    
    const res = await axios.delete(endpoint, { withCredentials: true });
    // ... rest of success handling
    
  } catch (error) {
    console.error("Frontend delete error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    // ... rest of error handling
  }
};

  const openModal = (imageUrl) => {
    if (imageUrl) {
      setResumeImageUrl(imageUrl);
      setModalOpen(true);
    } else {
      toast.error("Resume not available");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
            {user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-48 sm:h-56 md:h-64">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : !Array.isArray(applications) || applications.length <= 0 ? (
          /* Empty State - Added array check */
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center animate-pulse max-w-md mx-auto">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">📋</div>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No Applications Found</h4>
            <p className="text-gray-500 text-sm sm:text-base px-2">
              {user && user.role === "Job Seeker" 
                ? "You haven't applied to any jobs yet." 
                : "No one has applied to your jobs yet."}
            </p>
          </div>
        ) : (
          /* Applications Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 items-start">
            {applications
              .filter(element => element && element._id) // Filter out invalid elements
              .map((element, index) => (
                user && user.role === "Job Seeker" ? (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                    index={index}
                    isDeleting={deletingIds.has(element._id)}
                  />
                ) : (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                    deleteApplication={deleteApplication}
                    index={index}
                    isDeleting={deletingIds.has(element._id)}
                  />
                )
              ))}
          </div>
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal, index, isDeleting }) => {
  // Add safety checks for element
  if (!element || !element._id) {
    return null;
  }

  const handleDelete = () => {
    if (element._id) {
      deleteApplication(element._id);
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in-up ${
        isDeleting 
          ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none' 
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        minHeight: isDeleting ? '0' : 'auto',
        marginBottom: isDeleting ? '0' : 'auto',
        paddingBottom: isDeleting ? '0' : 'auto'
      }}
    >
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate flex-1 min-w-0 pr-2">
            {element.name || 'N/A'}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
            Applied
          </span>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center text-gray-600 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="truncate min-w-0">{element.email || 'N/A'}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="break-all sm:break-normal">{element.phone || 'N/A'}</span>
          </div>
          
          <div className="flex items-start text-gray-600 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="break-words leading-relaxed">{element.address || 'N/A'}</span>
          </div>
        </div>
        
        {/* Cover Letter */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Cover Letter</h4>
          <div className="text-gray-600 text-xs sm:text-sm bg-gray-50 p-3 rounded-lg max-h-24 sm:max-h-32 overflow-y-auto">
            <p className="leading-relaxed break-words">
              {element.coverLetter || 'No cover letter provided'}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <button
            onClick={() => openModal(element.resume?.url)}
            className="flex-1 inline-flex justify-center items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="whitespace-nowrap">View Resume</span>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`xs:flex-shrink-0 inline-flex justify-center items-center px-3 sm:px-4 py-2 sm:py-2.5 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors text-sm sm:text-base ${
              isDeleting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="whitespace-nowrap">{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal, index, deleteApplication, isDeleting }) => {
  // Add safety checks for element
  if (!element || !element._id) {
    return null;
  }

  const handleDelete = () => {
    if (element._id) {
      // Add confirmation dialog
      if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
        console.log("Deleting application:", element._id);
        deleteApplication(element._id);
      }
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in-up ${
        isDeleting 
          ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none' 
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        minHeight: isDeleting ? '0' : 'auto',
        marginBottom: isDeleting ? '0' : 'auto',
        paddingBottom: isDeleting ? '0' : 'auto'
      }}
    >
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate flex-1 min-w-0 pr-2">
            {element.name || element.applicant?.name || 'Unknown Applicant'}
            <span className="block text-sm text-gray-500">
              Applied for: {element.job?.title || element.jobTitle || "N/A"}
            </span>
          </h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
            New Applicant
          </span>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center text-gray-600 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="truncate min-w-0">{element.email || element.applicant?.email || 'N/A'}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 1 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="break-all sm:break-normal">{element.phone || element.applicant?.phone || 'N/A'}</span>
          </div>
          
          <div className="flex items-start text-gray-600 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="break-words leading-relaxed">{element.address || element.applicant?.address || 'N/A'}</span>
          </div>
        </div>
        
        {/* Cover Letter */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Cover Letter</h4>
          <div className="text-gray-600 text-xs sm:text-sm bg-gray-50 p-3 rounded-lg max-h-24 sm:max-h-32 overflow-y-auto">
            <p className="leading-relaxed break-words">
              {element.coverLetter || 'No cover letter provided'}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <button
            onClick={() => openModal(element.resume?.url || element.applicant?.resume?.url)}
            className="flex-1 inline-flex justify-center items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="whitespace-nowrap">View Resume</span>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`xs:flex-shrink-0 inline-flex justify-center items-center px-3 sm:px-4 py-2 sm:py-2.5 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors text-sm sm:text-base ${
              isDeleting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="whitespace-nowrap">{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};