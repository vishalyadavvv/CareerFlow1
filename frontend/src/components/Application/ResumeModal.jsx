import React, { useEffect } from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header with filename and close button */}
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center min-w-0 flex-1 mr-2">
            <svg className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6 text-indigo-600 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
              {imageUrl?.split('/').pop() || "resume_preview"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Image container with improved mobile scrolling */}
        <div className="overflow-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)] bg-gray-900 flex justify-center p-1 sm:p-2 md:p-4">
          <img 
            src={imageUrl} 
            alt="Resume" 
            className="max-w-full h-auto object-contain rounded-sm sm:rounded-lg shadow-lg touch-manipulation"
            style={{
              // Ensure image is properly sized on mobile
              maxHeight: 'calc(95vh - 140px)',
              width: 'auto'
            }}
          />
        </div>
        
        {/* Footer with download button - responsive layout */}
        <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t bg-gray-50 flex justify-center sm:justify-end">
          <a
            href={imageUrl}
            download
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-md sm:rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 touch-manipulation w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>
        </div>
      </div>
      
      {/* Custom styles for animations and mobile optimization */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        /* Improve touch scrolling on mobile */
        .overflow-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }
        
        /* Custom scrollbar for webkit browsers */
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .overflow-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Ensure modal is properly sized on very small screens */
        @media (max-width: 320px) {
          .max-w-xs {
            max-width: calc(100vw - 16px);
          }
        }
        
        /* Improve button touch targets on mobile */
        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeModal;