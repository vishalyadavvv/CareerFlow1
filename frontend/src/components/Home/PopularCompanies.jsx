import React, { useState, useEffect, useRef } from "react";
import { FaMicrosoft, FaApple, FaAmazon, FaGoogle, FaFacebook } from "react-icons/fa";
import { SiTesla, SiNetflix, SiSpotify } from "react-icons/si";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  MdClose, 
  MdLocationOn, 
  MdWork, 
  MdStar, 
  MdPeople,
  MdTrendingUp,
  MdVerified,
  MdLanguage,
  MdDateRange,
  MdBusinessCenter
} from "react-icons/md";

const PopularCompanies = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
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
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const isVisible = useInView(countRef, { once: true });

    useEffect(() => {
      if (!isVisible) return;
      
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [end, duration, isVisible]);

    return <span ref={countRef}>{count}{suffix}</span>;
  };

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Noida Sector 16, India",
      openPositions: 10,
      icon: <FaMicrosoft className="text-3xl sm:text-4xl" />,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-500",
      rating: 4.8,
      employees: "50K+",
      description: "Leading global technology company innovating in cloud, AI, and enterprise solutions. Join us to work on cutting-edge projects that impact billions.",
      founded: 1975,
      website: "microsoft.com",
      verified: true,
      trending: true,
      benefits: ["Health Insurance", "Remote Work", "401k Matching", "Learning Budget"],
      departments: ["Engineering", "Product", "Design", "Sales", "Marketing"],
      culture: "Innovation-focused with emphasis on work-life balance",
      avgSalary: "$120k - $180k",
      growth: "+15%"
    },
    {
      id: 2,
      title: "Tesla",
      location: "Greater Noida, India",
      openPositions: 5,
      icon: <SiTesla className="text-3xl sm:text-4xl" />,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-500",
      rating: 4.6,
      employees: "5K+",
      description: "Revolutionizing sustainable energy and electric vehicles with cutting-edge technology. Be part of the future of transportation and clean energy.",
      founded: 2003,
      website: "tesla.com",
      verified: true,
      trending: true,
      benefits: ["Stock Options", "Free Charging", "Gym Membership", "Career Development"],
      departments: ["Engineering", "Manufacturing", "Design", "Operations"],
      culture: "Fast-paced, mission-driven with high impact work",
      avgSalary: "$110k - $160k",
      growth: "+22%"
    },
    {
      id: 3,
      title: "Apple",
      location: "DLF Phase 1, India",
      openPositions: 20,
      icon: <FaApple className="text-3xl sm:text-4xl" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-600",
      rating: 4.7,
      employees: "80K+",
      description: "Creating innovative products that integrate hardware, software, and services seamlessly. Join a team that values creativity and excellence.",
      founded: 1976,
      website: "apple.com",
      verified: true,
      trending: false,
      benefits: ["Product Discounts", "Health & Wellness", "Tuition Reimbursement", "Paid Time Off"],
      departments: ["Hardware", "Software", "Design", "Retail", "Operations"],
      culture: "Creativity-driven with attention to detail",
      avgSalary: "$130k - $200k",
      growth: "+12%"
    },
    {
      id: 4,
      title: "Google",
      location: "Gurugram, India",
      openPositions: 35,
      icon: <FaGoogle className="text-3xl sm:text-4xl" />,
      color: "from-blue-500 via-red-500 to-yellow-500",
      bgColor: "bg-blue-500",
      rating: 4.9,
      employees: "100K+",
      description: "Organizing the world's information and making it universally accessible. Work on products used by billions globally.",
      founded: 1998,
      website: "google.com",
      verified: true,
      trending: true,
      benefits: ["Free Meals", "On-site Gym", "Generous PTO", "Learning Programs"],
      departments: ["Engineering", "Product", "UX", "Data Science", "Cloud"],
      culture: "Innovative and collaborative with great perks",
      avgSalary: "$140k - $220k",
      growth: "+18%"
    },
    {
      id: 5,
      title: "Amazon",
      location: "Bengaluru, India",
      openPositions: 45,
      icon: <FaAmazon className="text-3xl sm:text-4xl" />,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-500",
      rating: 4.5,
      employees: "150K+",
      description: "Earth's most customer-centric company. Join us to innovate in e-commerce, cloud computing, and AI.",
      founded: 1994,
      website: "amazon.com",
      verified: true,
      trending: true,
      benefits: ["Stock Options", "Career Choice", "Parental Leave", "Employee Discounts"],
      departments: ["AWS", "Retail", "Operations", "Alexa", "Prime"],
      culture: "Customer-obsessed and data-driven",
      avgSalary: "$115k - $175k",
      growth: "+25%"
    },
    {
      id: 6,
      title: "Meta",
      location: "Hyderabad, India",
      openPositions: 28,
      icon: <FaFacebook className="text-3xl sm:text-4xl" />,
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-600",
      rating: 4.4,
      employees: "40K+",
      description: "Building the future of social technology and the metaverse. Connect with billions through our platforms.",
      founded: 2004,
      website: "meta.com",
      verified: true,
      trending: false,
      benefits: ["Wellness Programs", "Family Support", "Free Transport", "Education Fund"],
      departments: ["AI Research", "Product", "Infrastructure", "Reality Labs"],
      culture: "Bold and collaborative innovation culture",
      avgSalary: "$135k - $210k",
      growth: "+10%"
    },
    {
      id: 7,
      title: "Netflix",
      location: "Mumbai, India",
      openPositions: 12,
      icon: <SiNetflix className="text-3xl sm:text-4xl" />,
      color: "from-red-600 to-red-800",
      bgColor: "bg-red-600",
      rating: 4.6,
      employees: "12K+",
      description: "Entertaining the world with amazing stories. Join a team that values freedom and responsibility.",
      founded: 1997,
      website: "netflix.com",
      verified: true,
      trending: false,
      benefits: ["Unlimited PTO", "Generous Parental Leave", "Stock Options", "Learning Budget"],
      departments: ["Content", "Engineering", "Product", "Marketing"],
      culture: "Freedom and responsibility with high performance",
      avgSalary: "$125k - $190k",
      growth: "+14%"
    },
    {
      id: 8,
      title: "Spotify",
      location: "Pune, India",
      openPositions: 8,
      icon: <SiSpotify className="text-3xl sm:text-4xl" />,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-500",
      rating: 4.7,
      employees: "8K+",
      description: "Unlocking the potential of human creativity. Work on products that power the soundtrack of people's lives.",
      founded: 2006,
      website: "spotify.com",
      verified: true,
      trending: false,
      benefits: ["Flexible Hours", "Music Perks", "Wellness Benefits", "Parental Support"],
      departments: ["Engineering", "Data Science", "Design", "Content"],
      culture: "Creative and music-loving team culture",
      avgSalary: "$110k - $170k",
      growth: "+16%"
    },
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || company.location.includes(filterLocation);
    return matchesSearch && matchesLocation;
  });

  const totalPositions = companies.reduce((sum, company) => sum + company.openPositions, 0);
  const avgRating = (companies.reduce((sum, company) => sum + company.rating, 0) / companies.length).toFixed(1);

  const locations = [...new Set(companies.map(c => c.location.split(',')[0].trim()))];

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
              <MdVerified className="inline mr-1 -mt-0.5" />
              Top Employers
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
            Join <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">World-Class</span> Companies
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
            Discover opportunities at industry-leading companies with exceptional benefits and culture
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              <CountUp end={companies.length} duration={2000} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Top Companies</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
              <CountUp end={totalPositions} duration={2500} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Open Positions</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-1">
              <CountUp end={parseFloat(avgRating)} duration={2000} />
              <MdStar className="text-yellow-500 text-2xl sm:text-3xl" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Avg Rating</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              <CountUp end={98} duration={2000} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Satisfaction</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base shadow-sm"
            />
          </div>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base bg-white shadow-sm"
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </motion.div>
        
        {/* Companies Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredCompanies.map((company) => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              className="group cursor-pointer w-full h-full"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCompany(company)}
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 group-hover:shadow-2xl border border-gray-100 relative flex flex-col">
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {company.verified && (
                    <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <MdVerified className="text-sm" />
                    </div>
                  )}
                  {company.trending && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <MdTrendingUp className="text-sm" />
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Company Icon & Name */}
                  <div className="flex items-center mb-5">
                    <div className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${company.color} text-white mr-3 sm:mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0 shadow-lg`}>
                      {company.icon}
                      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r ${company.color} opacity-20 blur-xl`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                        {company.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <MdStar className="text-yellow-500 text-sm" />
                        <span className="text-sm font-semibold text-gray-700">{company.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location & Positions */}
                  <div className="space-y-3 mb-5 flex-1">
                    <div className="flex items-start text-gray-600">
                      <MdLocationOn className="text-blue-500 text-lg mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{company.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MdWork className="text-green-500 text-lg mr-2 flex-shrink-0" />
                      <span className="text-sm font-semibold">{company.openPositions} open positions</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MdPeople className="text-purple-500 text-lg mr-2 flex-shrink-0" />
                      <span className="text-sm">{company.employees} employees</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-100">
                      <div className="text-xs text-gray-600 mb-0.5">Growth</div>
                      <div className="text-sm font-bold text-green-600">{company.growth}</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-2.5 border border-emerald-100">
                      <div className="text-xs text-gray-600 mb-0.5">Founded</div>
                      <div className="text-sm font-bold text-gray-900">{company.founded}</div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r ${company.color} transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl text-sm touch-manipulation active:scale-95 mt-auto`}>
                    View Positions
                  </button>
                </div>
                
                {/* Animated gradient bar */}
                <div className="relative h-1 bg-gray-100 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${company.color} transform -translate-x-full transition-transform duration-700 group-hover:translate-x-0`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg text-gray-600">No companies found matching your criteria.</p>
          </motion.div>
        )}
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-10 sm:mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 active:scale-95 text-sm sm:text-base relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore All Companies
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
onClick={() => setSelectedCompany(null)}
>
  <motion.div
    initial={{ scale: 0.8, opacity: 0, y: 50 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.8, opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
    onClick={(e) => e.stopPropagation()}
    className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-6 sm:p-8 relative"
  >
    {/* Close Button */}
    <button
      onClick={() => setSelectedCompany(null)}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
    >
      <MdClose className="text-2xl" />
    </button>

    {/* Header */}
    <div className="flex items-center mb-5">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedCompany.color} text-white mr-4`}>
        {selectedCompany.icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          {selectedCompany.title}
          {selectedCompany.verified && <MdVerified className="text-blue-500" />}
        </h3>
        <div className="flex items-center text-gray-600 mt-1 text-sm">
          <MdLocationOn className="mr-1 text-blue-500" /> {selectedCompany.location}
        </div>
      </div>
    </div>

    {/* Description */}
    <p className="text-gray-700 mb-5 leading-relaxed">{selectedCompany.description}</p>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Open Positions</div>
        <div className="text-lg font-bold text-blue-700">{selectedCompany.openPositions}</div>
      </div>
      <div className="bg-green-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Founded</div>
        <div className="text-lg font-bold text-green-700">{selectedCompany.founded}</div>
      </div>
      <div className="bg-purple-50 rounded-lg p-3">
        <div className="text-sm text-gray-600">Employees</div>
        <div className="text-lg font-bold text-purple-700">{selectedCompany.employees}</div>
      </div>
    </div>

    {/* Additional Info */}
    <div className="space-y-3 text-sm text-gray-700 mb-6">
      <div className="flex items-start">
        <MdBusinessCenter className="text-indigo-500 text-lg mr-2 mt-0.5" />
        <span><strong>Departments:</strong> {selectedCompany.departments.join(", ")}</span>
      </div>
      <div className="flex items-start">
        <MdPeople className="text-pink-500 text-lg mr-2 mt-0.5" />
        <span><strong>Culture:</strong> {selectedCompany.culture}</span>
      </div>
      <div className="flex items-start">
        <MdTrendingUp className="text-green-500 text-lg mr-2 mt-0.5" />
        <span><strong>Growth:</strong> {selectedCompany.growth}</span>
      </div>
      <div className="flex items-start">
        <MdLanguage className="text-blue-500 text-lg mr-2 mt-0.5" />
        <span><strong>Website:</strong> <a href={`https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedCompany.website}</a></span>
      </div>
    </div>

    {/* Benefits */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-2">Employee Benefits</h4>
      <div className="flex flex-wrap gap-2">
        {selectedCompany.benefits.map((benefit, index) => (
          <span key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
            {benefit}
          </span>
        ))}
      </div>
    </div>

    {/* Footer Button */}
    <div className="text-center mt-6">
      <button
        onClick={() => window.open(`https://${selectedCompany.website}`, "_blank")}
        className={`bg-gradient-to-r ${selectedCompany.color} text-white px-6 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105`}
      >
        Visit Website
      </button>
    </div>
  </motion.div>
</motion.div>
)}
</AnimatePresence>
</section>
);
};

export default PopularCompanies;
