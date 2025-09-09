import React, { useEffect, useRef } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const PopularCompanies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Noida Sector 16, India",
      openPositions: 10,
      icon: <FaMicrosoft className="text-2xl sm:text-3xl md:text-4xl" />,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-500",
      link: "/jobs?company=microsoft"
    },
    {
      id: 2,
      title: "Tesla",
      location: "Greater Noida, India",
      openPositions: 5,
      icon: <SiTesla className="text-2xl sm:text-3xl md:text-4xl" />,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-500",
      link: "/jobs?company=tesla"
    },
    {
      id: 3,
      title: "Apple",
      location: "DLF Phase 1, India",
      openPositions: 20,
      icon: <FaApple className="text-2xl sm:text-3xl md:text-4xl" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-600",
      link: "/jobs?company=apple"
    },
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            Top <span className="text-blue-600">Companies</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
            Discover opportunities at leading companies with open positions waiting for talented professionals like you
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {companies.map((company) => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              className="group cursor-pointer w-full"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to={company.link} 
                className="block h-full"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl border border-gray-100 touch-manipulation">
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${company.color} text-white mr-3 sm:mr-4 transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110 flex-shrink-0`}>
                        {company.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 min-w-0 truncate">
                        {company.title}
                      </h3>
                    </div>
                    
                    <div className="mb-4 sm:mb-6 flex-grow">
                      <div className="flex items-start text-gray-600 mb-2 sm:mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm sm:text-base leading-relaxed">{company.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6m0 0v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6" />
                        </svg>
                        <span className="text-sm sm:text-base">{company.openPositions} open positions</span>
                      </div>
                    </div>
                    
                    <button className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r ${company.color} transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg text-sm sm:text-base touch-manipulation min-h-[44px] active:scale-95`}>
                      View Open Positions
                    </button>
                  </div>
                  
                  <div className={`h-1 w-0 transition-all duration-500 group-hover:w-full ${company.bgColor}`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/companies">
            <button className="bg-white border border-blue-600 text-blue-600 font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base touch-manipulation min-h-[44px] w-full sm:w-auto active:scale-95">
              View All Companies
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCompanies;