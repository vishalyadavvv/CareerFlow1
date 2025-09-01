import React, { useEffect, useRef, useState } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const stats = [
    { value: "1.2M+", label: "Active Jobs", icon: <FaSuitcase />, color: "#3B82F6" },
    { value: "850K+", label: "Companies", icon: <FaBuilding />, color: "#8B5CF6" },
    { value: "5.3M+", label: "Job Seekers", icon: <FaUsers />, color: "#10B981" },
    { value: "420K+", label: "Employers", icon: <FaUserPlus />, color: "#F59E0B" },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-400/20 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-violet-600/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-20">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div 
            ref={textRef}
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">🔥 Trending Jobs Available</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Find Your
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Dream Career
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full" />
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Connect with top companies, discover opportunities that match your skills, and take the next step in your professional journey.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center space-x-2 max-w-lg">
              <div className="flex items-center space-x-3 flex-1 px-4">
                <FaSearch className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Job title or keyword..."
                  className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none text-lg"
                />
              </div>
              <div className="flex items-center space-x-3 px-4 border-l border-white/20">
                <FaMapMarkerAlt className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Location"
                  className="bg-transparent text-white placeholder-gray-400 w-24 outline-none"
                />
              </div>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                Search
              </button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              {['Remote', 'Full-time', 'Tech', 'Marketing', 'Design'].map((filter) => (
                <button 
                  key={filter}
                  className="bg-white/5 hover:bg-white/15 border border-white/20 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div 
            ref={imageRef}
            className={`relative transform transition-all duration-1200 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl rotate-12 opacity-80 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional team meeting"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Overlay Stats */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-400 text-white p-4 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-400 text-white p-4 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm opacity-90">Avg Response</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 800}ms` }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-xl group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute top-40 right-40 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;