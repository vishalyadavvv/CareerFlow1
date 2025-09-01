import React, { useEffect, useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { motion, useInView, useAnimation } from "framer-motion";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cards = [
    {
      icon: <FaUserPlus className="text-4xl md:text-5xl" />,
      title: "Create Account",
      description: "JoinCareerFlow to unlock powerful tools for job seekers and recruiters. Set up your profile to start applying for jobs or posting listings in minutes."
    },
    {
      icon: <MdFindInPage className="text-4xl md:text-5xl" />,
      title: "Find a Job/Post a Job",
      description: "Discover jobs that match your skills or post roles to find the best talent. Use smart filters to find the perfect job or publish vacancies instantly."
    },
    {
      icon: <IoMdSend className="text-4xl md:text-5xl" />,
      title: "Apply For Job/Recruit Suitable Candidates",
      description: "Apply with a single click or shortlist candidates who match your criteria. Track applications or connect with potential hires effortlessly."
    }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h3 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          How <span className="text-blue-600">JobZee</span> Works
        </motion.h3>
        
        <motion.p 
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Streamlining your job search and recruitment process with an intuitive platform designed for success.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="group"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl flex flex-col">
                <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
                  <div className="bg-blue-100 p-4 rounded-full mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-200">
                    <div className="text-blue-600">{card.icon}</div>
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                    {card.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-6 flex-grow">
                    {card.description}
                  </p>
                  
                  <span className="text-blue-600 font-medium inline-flex items-center transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-700">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-1 w-0 transition-all duration-500 group-hover:w-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg transform hover:-translate-y-1">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;