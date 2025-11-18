import React, { useEffect, useRef, useState } from "react";
import { 
  Palette, Smartphone, Globe, Code, Calculator, Brain, 
  Video, Gamepad2, X, TrendingUp, Building2, Clock, 
  Award, Star, ChevronRight, Filter, Search, Briefcase,
  Users, DollarSign, Target, Zap, CheckCircle, ArrowUpRight
} from "lucide-react";

const PopularCategories = ({ onCardClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      salary: "$40k - $80k",
      difficulty: "Intermediate",
      companies: 450,
      avgExperience: "2-4 years",
      growth: "+15%",
      remote: "85%",
      skills: ["Figma", "Adobe Suite", "UI/UX Design", "Prototyping", "Illustration", "Branding"],
      description: "Create stunning visual content for web, mobile, and print media. Perfect for designers with a creative eye and technical proficiency in modern design tools.",
      trending: false,
      benefits: [
        "Creative freedom and flexibility",
        "Remote work opportunities",
        "Portfolio building projects",
        "Industry networking events"
      ],
      topCompanies: ["Adobe", "Canva", "Figma", "Dribbble"],
      stats: {
        avgSalary: 60000,
        totalJobs: 305,
        avgResponse: 48
      }
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      salary: "$60k - $120k",
      difficulty: "Advanced",
      companies: 620,
      avgExperience: "3-6 years",
      growth: "+22%",
      remote: "90%",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Mobile UI/UX"],
      description: "Build native and cross-platform mobile applications for iOS and Android. High demand for React Native and Flutter experts with strong architectural knowledge.",
      trending: true,
      benefits: [
        "High earning potential",
        "Global opportunities",
        "Cutting-edge technology",
        "Startup culture"
      ],
      topCompanies: ["Meta", "Google", "Uber", "Spotify"],
      stats: {
        avgSalary: 90000,
        totalJobs: 500,
        avgResponse: 36
      }
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: Globe,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      salary: "$50k - $100k",
      difficulty: "Intermediate",
      companies: 380,
      avgExperience: "1-3 years",
      growth: "+18%",
      remote: "88%",
      skills: ["React", "Vue.js", "Tailwind CSS", "JavaScript", "TypeScript", "Webpack"],
      description: "Develop responsive and interactive web interfaces using modern frameworks and libraries. Expertise in React, Vue, or Angular essential for enterprise applications.",
      trending: false,
      benefits: [
        "Fast-growing field",
        "Creative problem solving",
        "Flexible schedules",
        "Continuous learning"
      ],
      topCompanies: ["Vercel", "Netflix", "Airbnb", "Shopify"],
      stats: {
        avgSalary: 75000,
        totalJobs: 200,
        avgResponse: 52
      }
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: "1000+ Open Positions",
      icon: Code,
      color: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      salary: "$70k - $140k",
      difficulty: "Advanced",
      companies: 890,
      avgExperience: "2-5 years",
      growth: "+28%",
      remote: "92%",
      skills: ["MongoDB", "Express", "React", "Node.js", "REST APIs", "GraphQL"],
      description: "Full-stack development with MongoDB, Express, React, and Node.js. Highest demand in the market with excellent career growth opportunities.",
      trending: true,
      benefits: [
        "Full-stack expertise",
        "High demand",
        "Competitive salaries",
        "Startup opportunities"
      ],
      topCompanies: ["Amazon", "PayPal", "LinkedIn", "Twitter"],
      stats: {
        avgSalary: 105000,
        totalJobs: 1000,
        avgResponse: 24
      }
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: Calculator,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      salary: "$45k - $90k",
      difficulty: "Intermediate",
      companies: 280,
      avgExperience: "2-4 years",
      growth: "+12%",
      remote: "65%",
      skills: ["Excel", "Accounting", "SAP", "Financial Analysis", "QuickBooks", "Taxation"],
      description: "Financial management and accounting roles across industries. CPA certification and advanced Excel skills highly preferred for senior positions.",
      trending: false,
      benefits: [
        "Job stability",
        "Career progression",
        "Professional certifications",
        "Industry variety"
      ],
      topCompanies: ["Deloitte", "EY", "KPMG", "PwC"],
      stats: {
        avgSalary: 67500,
        totalJobs: 150,
        avgResponse: 60
      }
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: Brain,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      salary: "$80k - $160k",
      difficulty: "Expert",
      companies: 520,
      avgExperience: "3-7 years",
      growth: "+35%",
      remote: "80%",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Deep Learning"],
      description: "Work on cutting-edge ML and AI projects transforming industries. Machine learning expertise and research experience highly valued in this rapidly growing field.",
      trending: true,
      benefits: [
        "Cutting-edge research",
        "Premium salaries",
        "Innovation focus",
        "Conference attendance"
      ],
      topCompanies: ["OpenAI", "DeepMind", "Microsoft", "Tesla"],
      stats: {
        avgSalary: 120000,
        totalJobs: 867,
        avgResponse: 30
      }
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: Video,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      salary: "$35k - $75k",
      difficulty: "Advanced",
      companies: 150,
      avgExperience: "2-5 years",
      growth: "+10%",
      remote: "70%",
      skills: ["After Effects", "Blender", "Premiere", "Motion Graphics", "3D Animation", "Compositing"],
      description: "Create compelling video content and animations for media, advertising, and entertainment. Creative storytelling skills and technical proficiency essential.",
      trending: false,
      benefits: [
        "Creative expression",
        "Diverse projects",
        "Freelance options",
        "Portfolio showcase"
      ],
      topCompanies: ["Pixar", "Disney", "DreamWorks", "Blue Sky"],
      stats: {
        avgSalary: 55000,
        totalJobs: 50,
        avgResponse: 72
      }
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: Gamepad2,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      salary: "$55k - $110k",
      difficulty: "Expert",
      companies: 180,
      avgExperience: "3-6 years",
      growth: "+20%",
      remote: "75%",
      skills: ["Unity", "Unreal Engine", "C#", "Game Design", "3D Modeling", "Physics"],
      description: "Develop engaging games for multiple platforms including PC, console, and mobile. C# and game engines knowledge required with strong problem-solving skills.",
      trending: false,
      benefits: [
        "Gaming industry perks",
        "Creative challenges",
        "Global recognition",
        "Indie opportunities"
      ],
      topCompanies: ["Epic Games", "Ubisoft", "EA", "Riot Games"],
      stats: {
        avgSalary: 82500,
        totalJobs: 80,
        avgResponse: 45
      }
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCardClick) {
      onCardClick({ type: 'category', ...category });
    }
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  const filteredCategories = categories.filter(cat => {
    const matchesDifficulty = filterDifficulty === "all" || cat.difficulty === filterDifficulty;
    const matchesSearch = cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cat.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const trendingCount = categories.filter(cat => cat.trending).length;
  const totalJobs = categories.reduce((sum, cat) => sum + cat.stats.totalJobs, 0);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Briefcase className="w-4 h-4" />
            <span>{totalJobs}+ Jobs Available</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Popular <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Categories</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore the most in-demand job categories with thousands of opportunities across diverse industries
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">{trendingCount}</div>
                <div className="text-xs text-gray-500">Trending Now</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                />
              </div>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border-2 ${category.borderColor} hover:border-opacity-100 border-opacity-0 transition-all duration-300`}>
                  {/* Trending Badge */}
                  {category.trending && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <TrendingUp className="w-3 h-3" />
                        <span>Hot</span>
                      </div>
                    </div>
                  )}

                  {/* Color Header */}
                  <div className={`h-2 bg-gradient-to-r ${category.color}`} />

                  <div className="p-6">
                    {/* Icon */}
                    <div className={`${category.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                      <Icon className="w-8 h-8 text-gray-700" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      {category.subTitle}
                    </p>

                    {/* Quick Info */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Salary Range</span>
                        <span className="font-semibold text-gray-900">{category.salary}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Level</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          category.difficulty === 'Expert' ? 'bg-red-100 text-red-700' :
                          category.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {category.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Growth</span>
                        <span className="font-semibold text-green-600 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          {category.growth}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-300">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
            <span>View All Categories</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && <CategoryModal category={selectedCategory} onClose={closeModal} />}
    </section>
  );
};

// Category Detail Modal Component
const CategoryModal = ({ category, onClose }) => {
  const Icon = category.icon;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={`bg-gradient-to-r ${category.color} p-6 sm:p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{category.title}</h2>
                {category.trending && (
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                )}
              </div>
              <p className="text-white/90 text-base sm:text-lg mb-3">{category.description}</p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  {category.subTitle}
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  {category.companies}+ Companies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Static Avg Salary without animation */}
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
              <div className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                ${category.stats.avgSalary.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mt-2">Avg Salary</div>
            </div>
            
            {/* Animated counters for other stats */}
            <StatCounter stat={{ value: category.stats.totalJobs, label: "Open Jobs", suffix: "+" }} color={category.color} />
            <StatCounter stat={{ value: category.stats.avgResponse, label: "Response Time", suffix: "hrs" }} color={category.color} />
          </div>

          {/* Key Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Career Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Salary Range</span>
                  <span className="font-semibold text-gray-900">{category.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold text-gray-900">{category.avgExperience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-semibold text-green-600">{category.growth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Remote Jobs</span>
                  <span className="font-semibold text-gray-900">{category.remote}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Top Companies
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {category.topCompanies.map((company, index) => (
                  <div key={index} className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Career Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {category.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                  <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`flex-1 bg-gradient-to-r ${category.color} text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
              <Search className="w-5 h-5" />
              <span>Browse Jobs</span>
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2">
              <Star className="w-5 h-5" />
              <span>Save Category</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

// Animated Stat Counter Component
const StatCounter = ({ stat, color }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = stat.value;
    if (start === end) return;
    
    let totalMilSecDur = 1500;
    let incrementTime = (totalMilSecDur / end) * 10;
    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMilSecDur / incrementTime));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [stat.value]);
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
      <div className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
        {stat.prefix || ""}{count.toLocaleString()}{stat.suffix || ""}
      </div>
      <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
    </div>
  );
}

export default PopularCategories;