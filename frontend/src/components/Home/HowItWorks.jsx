import React, { useEffect, useRef, useState } from "react";
import { UserPlus, Search, Send, Clock, CheckCircle, TrendingUp, Users, Briefcase, Target, Award, Zap, ArrowRight, X, Star } from "lucide-react";

const HowItWorks = ({ onCardClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
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

  const cards = [
    {
      id: 1,
      icon: UserPlus,
      title: "Create Account",
      subtitle: "Start Your Journey",
      description: "Join thousands of professionals and companies. Set up your profile in minutes with our guided onboarding process.",
      shortDesc: "Quick and easy registration",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      details: {
        benefits: [
          { icon: CheckCircle, text: "Quick 5-minute setup" },
          { icon: Target, text: "AI-powered profile optimization" },
          { icon: Award, text: "Resume builder & templates" },
          { icon: Zap, text: "Instant job alerts" }
        ],
        stats: [
          { value: 50000, label: "New users this month", suffix: "+" },
          { value: 95, label: "Profile completion rate", suffix: "%" }
        ],
        features: [
          "Professional profile creation",
          "Skills assessment tools",
          "Portfolio showcase",
          "Privacy controls",
          "Mobile app access"
        ],
        timeRequired: "5 minutes",
        successRate: "98%"
      }
    },
    {
      id: 2,
      icon: Search,
      title: "Find Perfect Match",
      subtitle: "Discover Opportunities",
      description: "Use advanced AI filters to discover jobs that perfectly match your skills, or post roles to find ideal candidates instantly.",
      shortDesc: "Smart job matching technology",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      details: {
        benefits: [
          { icon: Target, text: "AI-powered job recommendations" },
          { icon: Zap, text: "Real-time notifications" },
          { icon: CheckCircle, text: "Save & compare options" },
          { icon: TrendingUp, text: "Salary insights & trends" }
        ],
        stats: [
          { value: 2400000, label: "Active job listings", suffix: "+" },
          { value: 85, label: "Match accuracy rate", suffix: "%" }
        ],
        features: [
          "Advanced search filters",
          "Personalized recommendations",
          "Company research tools",
          "Salary comparisons",
          "Remote job filtering"
        ],
        timeRequired: "10 minutes",
        successRate: "92%"
      }
    },
    {
      id: 3,
      icon: Send,
      title: "Apply & Connect",
      subtitle: "Get Hired Faster",
      description: "Apply with one click using your profile, or review qualified candidates. Track everything in real-time with our dashboard.",
      shortDesc: "Streamlined application process",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      details: {
        benefits: [
          { icon: Zap, text: "1-click application" },
          { icon: TrendingUp, text: "Real-time tracking" },
          { icon: Users, text: "Direct messaging" },
          { icon: CheckCircle, text: "Interview scheduling" }
        ],
        stats: [
          { value: 150000, label: "Successful hires", suffix: "+" },
          { value: 72, label: "Average response time", suffix: "hrs" }
        ],
        features: [
          "Instant application submission",
          "Application status tracking",
          "Interview preparation tips",
          "Recruiter communication",
          "Offer management"
        ],
        timeRequired: "2 minutes",
        successRate: "89%"
      }
    }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveStep(card.id);
    if (onCardClick) {
      onCardClick({ type: 'howitworks', ...card });
    }
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            How <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">JobZee</span> Works
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your journey to the perfect career starts here. Follow three simple steps to transform your professional life.
          </p>
        </div>

        {/* Progress Steps */}
        <div className={`flex justify-center items-center mb-12 sm:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 sm:gap-4 bg-white rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-xl border border-gray-100">
            {cards.map((card, index) => (
              <React.Fragment key={card.id}>
                <button
                  onClick={() => setActiveStep(card.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                    activeStep === card.id
                      ? 'bg-gradient-to-r ' + card.color + ' text-white shadow-lg scale-105'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold text-sm sm:text-base">{card.id}</span>
                  <span className="hidden sm:inline text-sm font-medium">{card.title.split(' ')[0]}</span>
                </button>
                {index < cards.length - 1 && (
                  <div className="h-px w-6 sm:w-12 bg-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  activeStep === card.id ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Number Badge */}
                <div className="absolute -top-4 -left-4 z-10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.color} shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <span className="text-white font-bold text-xl">{card.id}</span>
                  </div>
                </div>

                <div className={`h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 border-2 ${
                  activeStep === card.id ? 'border-blue-500' : 'border-transparent group-hover:border-gray-200'
                }`}>
                  {/* Color Bar */}
                  <div className={`h-2 bg-gradient-to-r ${card.color}`} />

                  <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className={`${card.bgColor} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700" />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-500 mb-2">{card.subtitle}</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">{card.details.timeRequired}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">{card.details.successRate}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm sm:text-base group-hover:text-blue-700 transition-colors duration-300">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 sm:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6 sm:mb-8 text-base sm:text-lg">Join thousands of professionals finding their dream jobs every day</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base">
                Create Free Account
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && <DetailModal card={selectedCard} onClose={closeModal} />}
    </section>
  );
};

// Detail Modal Component
const DetailModal = ({ card, onClose }) => {
  const Icon = card.icon;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Modal Header */}
        <div className={`bg-gradient-to-r ${card.color} p-6 sm:p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">{card.subtitle}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{card.title}</h2>
            </div>
          </div>
          
          <p className="text-white/90 text-base sm:text-lg">{card.description}</p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Stats with Counter */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {card.details.stats.map((stat, index) => (
              <StatCounter key={index} stat={stat} color={card.color} />
            ))}
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Key Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {card.details.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                    <div className={`bg-gradient-to-r ${card.color} p-2 rounded-lg`}>
                      <BenefitIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Features Included
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {card.details.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`} />
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`flex-1 bg-gradient-to-r ${card.color} text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              Get Started Now
            </button>
            <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300">
              Close
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

// Stat Counter Component
const StatCounter = ({ stat, color }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000;
    const endValue = stat.value;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
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
  }, [stat.value]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl text-white`}>
      <div className="text-3xl sm:text-4xl font-bold mb-2">
        {formatNumber(count)}{stat.suffix}
      </div>
      <div className="text-white/80 text-sm font-medium">{stat.label}</div>
    </div>
  );
};

export default HowItWorks;