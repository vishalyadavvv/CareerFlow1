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
      icon: <MdOutlineDesignServices className="text-3xl" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500",
      link: "/jobs?category=design" // Added navigation link
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
      link: "/jobs?category=mobile" // Added navigation link
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-3xl" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500",
      link: "/jobs?category=frontend" // Added navigation link
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact className="text-3xl" />,
      color: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-500",
      link: "/jobs?category=mern" // Added navigation link
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-3xl" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500",
      link: "/jobs?category=finance" // Added navigation link
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-3xl" />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500",
      link: "/jobs?category=ai" // Added navigation link
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-3xl" />,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500",
      link: "/jobs?category=animation" // Added navigation link
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-3xl" />,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500",
      link: "/jobs?category=gaming" // Added navigation link
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Popular <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the most in-demand job categories with thousands of opportunities waiting for you
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <Link 
                to={category.link} 
                className="block h-full"
                onClick={() => window.scrollTo(0, 0)} // Scroll to top on navigation
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl border border-gray-100">
                  <div className="p-6 flex flex-col h-full">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 bg-gradient-to-r ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {category.subTitle}
                    </p>
                    
                    <div className="mt-auto flex items-center">
                      <span className="text-sm font-medium text-blue-600 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                        Explore jobs
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className={`h-1 w-0 transition-all duration-500 group-hover:w-full ${category.bgColor}`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/jobs">
            <button className="bg-white border border-blue-600 text-blue-600 font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:-translate-y-1">
              View All Categories
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategories;