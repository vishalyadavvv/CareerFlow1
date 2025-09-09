import React, { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const heroRef = useRef(null);

  const stats = [
    { value: "2.4M+", label: "Active Jobs", change: "+12%" },
    { value: "95K+", label: "Companies", change: "+8%" },
    { value: "8.1M+", label: "Professionals", change: "+15%" },
    { value: "150+", label: "Countries", change: "+5%" },
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Apple",  logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
     {
    name: "Meta",
    color: "#1877F2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/288px-Meta_Platforms_Inc._logo_%28cropped%29.svg"
  },
    { name: "Netflix",  logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    { name: "Airbnb",  logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />
      </div>

      <div className="relative z-10">
        {/* Hero Content */}
        <div className="container mx-auto px-4 py-16 lg:py-24">
          {/* Main Heading */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find the{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                perfect job
              </span>{" "}
              for your future
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with world-class companies, discover opportunities that match your ambitions,
              and accelerate your career with personalized job recommendations.
            </p>

            {/* Search Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 max-w-4xl mx-auto mb-8">
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Trusted Companies */}
            <p className="text-gray-500 text-lg font-medium mb-8">Trusted by professionals at world-class companies</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="group cursor-pointer transform hover:scale-110 transition-all duration-300"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm"
                    style={{
                      backgroundColor: company.color,
                      boxShadow: `0 10px 30px ${company.color}40, 0 6px 15px ${company.color}25`
                    }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-10 h-10 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    {company.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm mb-2">{stat.label}</div>
                  <div className="inline-flex items-center text-green-600 text-xs font-semibold">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
