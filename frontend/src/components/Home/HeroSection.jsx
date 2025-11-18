import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin, Briefcase, TrendingUp, Users, Building2, Globe, ChevronRight, Sparkles, Award, Target } from "lucide-react";

const HeroSection = ({ onCardClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [activeCategory, setActiveCategory] = useState(null);
  const heroRef = useRef(null);

  const stats = [
    { value: 2400000, suffix: "+", label: "Active Jobs", change: "+12%", icon: Briefcase },
    { value: 95000, suffix: "+", label: "Companies", change: "+8%", icon: Building2 },
    { value: 8100000, suffix: "+", label: "Professionals", change: "+15%", icon: Users },
    { value: 150, suffix: "+", label: "Countries", change: "+5%", icon: Globe },
  ];

  const categories = [
    { name: "Technology", icon: "💻", count: "45K+ jobs", color: "from-blue-500 to-cyan-500" },
    { name: "Design", icon: "🎨", count: "28K+ jobs", color: "from-purple-500 to-pink-500" },
    { name: "Marketing", icon: "📊", count: "32K+ jobs", color: "from-orange-500 to-red-500" },
    { name: "Finance", icon: "💼", count: "19K+ jobs", color: "from-green-500 to-emerald-500" },
    { name: "Sales", icon: "📈", count: "24K+ jobs", color: "from-indigo-500 to-blue-500" },
    { name: "Engineering", icon: "⚙️", count: "38K+ jobs", color: "from-gray-600 to-gray-800" },
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", color: "#4285F4" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", color: "#00A4EF" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", color: "#000000" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", color: "#FF9900" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/288px-Meta_Platforms_Inc._logo_%28cropped%29.svg", color: "#0081FB" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", color: "#E50914" },
    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", color: "#1DB954" },
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg", color: "#FF5A5F" }
  ];

  const features = [
    { icon: Target, text: "AI-Powered Job Matching" },
    { icon: Award, text: "Verified Companies Only" },
    { icon: Sparkles, text: "Instant Application Process" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location, "Type:", jobType);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Content */}
        <div className="container mx-auto px-4 py-12 lg:py-20">
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fadeIn">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Main Heading */}
          <div className="text-center max-w-5xl mx-auto mb-12">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Find the{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                    perfect job
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8 Q75 2 150 8 T300 8" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#9333EA" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                for your future
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with world-class companies, discover opportunities that match your ambitions,
                and accelerate your career with personalized job recommendations powered by AI.
              </p>
            </div>

            {/* Enhanced Search Section */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 max-w-5xl mx-auto mb-8 hover:shadow-3xl transition-shadow duration-300">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Job title or keywords"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, state, or remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
                  >
                    <option value="all">All Job Types</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </select>
                  <button
                    onClick={handleSearch}
                    className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Search Jobs</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {["React Developer", "UI Designer", "Product Manager", "Data Scientist"].map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(term)}
                      className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Categories */}
            <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Browse by Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`cursor-pointer group p-4 sm:p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                      activeCategory === index
                        ? 'bg-gradient-to-br ' + category.color + ' text-white shadow-lg'
                        : 'bg-white border-2 border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{category.icon}</div>
                    <h4 className={`font-semibold text-sm sm:text-base mb-1 ${activeCategory === index ? 'text-white' : 'text-gray-900'}`}>
                      {category.name}
                    </h4>
                    <p className={`text-xs sm:text-sm ${activeCategory === index ? 'text-white/90' : 'text-gray-500'}`}>
                      {category.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted Companies */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-gray-500 text-base sm:text-lg font-medium mb-6 sm:mb-8">
                Trusted by professionals at world-class companies
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12">
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer transform hover:scale-110 transition-all duration-300"
                  >
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm bg-white"
                    >
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain mx-auto"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 sm:mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      {company.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Stats Section with Counter */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <StatCard key={index} stat={stat} index={index} Icon={Icon} isVisible={isVisible} />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

// Separate component for animated stat counting
const StatCard = ({ stat, index, Icon, isVisible }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const duration = 2000; // 2 seconds
    const endValue = stat.value;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * endValue);
      
      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, stat.value]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <div
      className="group text-center transform hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {formatNumber(count)}{stat.suffix}
          </div>
          <div className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">{stat.label}</div>
          <div className="inline-flex items-center text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3 mr-1" />
            {stat.change}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;