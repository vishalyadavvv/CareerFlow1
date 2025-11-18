import React from "react";
import { 
  X, 
  Star, 
  Briefcase, 
  Users, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Award,
  Building,
  Globe,
  Heart,
  Share2,
  Bookmark,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const CardDetailModal = ({ card, onClose }) => {
  if (!card) return null;

  const renderCategoryDetails = () => (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Role Overview</h3>
        <p className="text-gray-700 text-base leading-relaxed">{card.description}</p>
      </div>

      {/* Skills Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Required Skills</h3>
          <span className="text-sm text-gray-500">{card.skills?.length} skills</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {card.skills?.map((skill, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 transition-colors group">
              <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-1">{skill}</div>
              <div className="text-xs text-gray-500">High Demand</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center">
          <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{card.salary}</div>
          <div className="text-sm text-gray-600 mt-1">Avg Salary</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 text-center">
          <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{card.difficulty}</div>
          <div className="text-sm text-gray-600 mt-1">Entry Level</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 text-center">
          <Building className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{card.companies}+</div>
          <div className="text-sm text-gray-600 mt-1">Companies</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-5 text-center">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{card.avgExperience}</div>
          <div className="text-sm text-gray-600 mt-1">Experience</div>
        </div>
      </div>

      {/* Growth Section */}
      {card.growth && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Market Growth</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{card.growth}</div>
          <p className="text-gray-700">Projected job growth over the next 5 years</p>
        </div>
      )}

      {/* CTA Button */}
      <div className="flex gap-3 pt-4">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group">
          Explore {card.title} Jobs
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderCompanyDetails = () => (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About {card.title}</h3>
        <p className="text-gray-700 text-base leading-relaxed">{card.description}</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-900">{card.founded}</div>
          <div className="text-sm text-gray-600 mt-1">Founded</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 text-center">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{card.employees}</div>
          <div className="text-sm text-gray-600 mt-1">Employees</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-5 text-center">
          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{card.rating}</div>
          <div className="text-sm text-gray-600 mt-1">Rating</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 text-center">
          <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{card.openPositions}</div>
          <div className="text-sm text-gray-600 mt-1">Open Roles</div>
        </div>
      </div>

      {/* Company Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Website</h4>
          </div>
          <a href={`https://${card.website}`} className="text-blue-600 hover:text-blue-700 font-medium text-lg">
            {card.website}
          </a>
        </div>
        
        <div className="bg-white border border-green-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Location</h4>
          </div>
          <div className="text-gray-700 font-medium">{card.location}</div>
        </div>
      </div>

      {/* Benefits */}
      {card.benefits && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {card.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group">
          View All Positions
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex gap-3">
          <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            <Bookmark className="w-5 h-5" />
            Save
          </button>
          <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );

  const renderHowItWorksDetails = () => (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h3>
        <p className="text-gray-700 text-base leading-relaxed">{card.description}</p>
      </div>

      {/* Steps */}
      {card.steps && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Process Steps</h3>
          {card.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits */}
      {card.details?.benefits && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {card.details.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Required */}
      {card.details?.timeRequired && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Time Commitment</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">{card.details.timeRequired}</div>
          <p className="text-gray-700">Average time to complete the process</p>
        </div>
      )}

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group">
        Start Your Journey
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${card.color} p-8 text-white rounded-t-3xl`}>
          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Title and Badges */}
          <div className="pr-20">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl font-bold">{card.title || card.name}</h2>
              {card.verified && (
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </div>
              )}
              {card.trending && (
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </div>
              )}
            </div>
            
            {/* Subtitle and Metadata */}
            <div className="flex flex-wrap gap-4 text-white/90">
              {card.type === 'category' && (
                <>
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> 
                    {card.subTitle}
                  </span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {card.growth} Growth
                  </span>
                </>
              )}
              {card.type === 'company' && (
                <>
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4" /> 
                    {card.rating} Rating
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {card.employees}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {card.location}
                  </span>
                </>
              )}
              {card.type === 'howitworks' && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {card.details?.timeRequired}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {card.type === 'category' && renderCategoryDetails()}
          {card.type === 'company' && renderCompanyDetails()}
          {card.type === 'howitworks' && renderHowItWorksDetails()}
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;