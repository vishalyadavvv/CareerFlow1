import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 sm:px-6 md:px-8'>
        <div className="max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto text-center">
          {/* Main Content Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100 animate-fade-in-up">
            
            {/* 404 Text */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 sm:mb-4 leading-none animate-bounce-slow">
                404
              </h1>
              <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto mb-4 sm:mb-6"></div>
            </div>

            {/* Error Image */}
            <div className="mb-6 sm:mb-8 md:mb-10 animate-float">
              <div className="relative inline-block">
                <img 
                  src="/notfound.png" 
                  alt="Page Not Found" 
                  className="max-w-full h-auto w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 mx-auto drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                {/* Fallback icon if image fails to load */}
                <div className="hidden">
                  <div className="w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0l3.353-3.354A1.886 1.886 0 018 10.5V21a3.5 3.5 0 006.844.97L18 18.5V12a7.966 7.966 0 01-4.07 0V21z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto px-2">
                The page you're looking for seems to have wandered off. Don't worry, it happens to the best of us!
              </p>
            </div>

            {/* Return Home Button */}
            <div className="space-y-4 sm:space-y-6">
              <Link 
                to={'/'} 
                className="inline-flex items-center justify-center w-full xs:w-auto px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-4 sm:py-5 text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 animate-pulse-gentle"
              >
                <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 mr-2 xs:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                RETURN TO HOME PAGE
              </Link>

              {/* Alternative Navigation Links */}
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 justify-center text-xs xs:text-sm text-gray-500">
                <Link to="/about" className="hover:text-indigo-600 transition-colors duration-200">
                  About Us
                </Link>
                <span className="hidden xs:inline">•</span>
                <Link to="/contact" className="hover:text-indigo-600 transition-colors duration-200">
                  Contact Support
                </Link>
                <span className="hidden xs:inline">•</span>
                <Link to="/help" className="hover:text-indigo-600 transition-colors duration-200">
                  Help Center
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 right-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Custom Styles and Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceGentle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes pulseGentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounceGentle 2s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-pulse-gentle {
          animation: pulseGentle 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs\\:max-w-md { max-width: 28rem; }
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:text-7xl { font-size: 4.5rem; line-height: 1; }
          .xs\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:w-56 { width: 14rem; }
          .xs\\:h-56 { height: 14rem; }
          .xs\\:w-auto { width: auto; }
          .xs\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
          .xs\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .xs\\:w-5 { width: 1.25rem; }
          .xs\\:h-5 { height: 1.25rem; }
          .xs\\:mr-3 { margin-right: 0.75rem; }
          .xs\\:flex-row { flex-direction: row; }
          .xs\\:gap-4 { gap: 1rem; }
          .xs\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .xs\\:inline { display: inline; }
        }

        /* Improve accessibility and performance */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up,
          .animate-bounce-slow,
          .animate-float,
          .animate-blob,
          .animate-pulse-gentle {
            animation: none;
          }
          
          .transition-all,
          .transition-colors {
            transition: none;
          }
        }

        /* Ensure proper spacing on very small screens */
        @media (max-width: 320px) {
          .text-6xl {
            font-size: 3.5rem;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gradient-to-br {
            background: white;
          }
          
          .bg-gradient-to-r {
            background: #4f46e5;
          }
        }
      `}</style>
    </>
  )
}

export default NotFound