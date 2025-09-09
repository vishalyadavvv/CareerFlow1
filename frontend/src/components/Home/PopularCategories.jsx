import React, { useEffect, useRef } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const PopularCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
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
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-2xl sm:text-3xl" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500",
      link: "/jobs?category=design"
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-2xl sm:text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
      link: "/jobs?category=mobile"
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-2xl sm:text-3xl" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500",
      link: "/jobs?category=frontend"
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact className="text-2xl sm:text-3xl" />,
      color: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-500",
      link: "/jobs?category=mern"
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-2xl sm:text-3xl" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500",
      link: "/jobs?category=finance"
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-2xl sm:text-3xl" />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500",
      link: "/jobs?category=ai"
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-2xl sm:text-3xl" />,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500",
      link: "/jobs?category=animation"
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-2xl sm:text-3xl" />,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500",
      link: "/jobs?category=gaming"
    },
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
            Popular <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-4 leading-relaxed">
            Explore the most in-demand job categories with thousands of opportunities waiting for you
          </p>
        </motion.div>
        
        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group cursor-pointer h-full"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }} // Added for better mobile interaction
            >
              <Link 
                to={category.link} 
                className="block h-full"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl border border-gray-100 group-active:scale-98">
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl mb-4 sm:mb-5 bg-gradient-to-r ${category.color} text-white flex-shrink-0`}>
                      {category.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {category.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex-grow">
                      {category.subTitle}
                    </p>
                    
                    {/* Call to Action */}
                    <div className="mt-auto flex items-center">
                      <span className="text-xs sm:text-sm font-medium text-blue-600 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                        <span className="whitespace-nowrap">Explore jobs</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover Effect Bar */}
                  <div className={`h-0.5 sm:h-1 w-0 transition-all duration-500 group-hover:w-full ${category.bgColor}`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-10 sm:mt-12 px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/jobs">
            <button className="bg-white border-2 border-blue-600 text-blue-600 font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-1 active:scale-95 text-sm sm:text-base">
              View All Categories
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategories;