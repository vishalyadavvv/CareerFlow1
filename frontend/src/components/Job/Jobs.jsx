import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FiSearch, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    country: "",
    salaryRange: ""
  });
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
        setFilteredJobs(res.data.jobs || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  useEffect(() => {
    let results = jobs;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category) {
      results = results.filter(job => job.category === filters.category);
    }
    
    // Apply country filter
    if (filters.country) {
      results = results.filter(job => job.country === filters.country);
    }
    
    // Apply salary filter
    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split('-').map(Number);
      if (max === 0) {
        results = results.filter(job => job.fixedSalary >= min);
      } else {
        results = results.filter(job => 
          job.fixedSalary >= min && job.fixedSalary <= max
        );
      }
    }
    
    setFilteredJobs(results);
  }, [searchTerm, filters, jobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      country: "",
      salaryRange: ""
    });
    setSearchTerm("");
  };

  // Extract unique categories and countries for filters
  const categories = [...new Set(jobs.map(job => job.category))];
  const countries = [...new Set(jobs.map(job => job.country))];

  const jobCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (!isAuthorized) return null;

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Available Job Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover your next career move from our curated list of opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            {/* Salary Filter */}
            <select
              name="salaryRange"
              value={filters.salaryRange}
              onChange={handleFilterChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Salary Range</option>
              <option value="0-50000">Up to $50,000</option>
              <option value="50000-100000">$50,000 - $100,000</option>
              <option value="100000-150000">$100,000 - $150,000</option>
              <option value="150000-0">$150,000+</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(filters.category || filters.country || filters.salaryRange || searchTerm) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <FiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  variants={jobCardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {job.category}
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiBriefcase className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="h-4 w-4 mr-2" />
                        <span>{job.country}</span>
                      </div>
                      {job.fixedSalary && (
                        <div className="flex items-center text-gray-600">
                          <FiDollarSign className="h-4 w-4 mr-2" />
                          <span>${job.fixedSalary.toLocaleString()}</span>
                        </div>
                      )}
                      {job.jobType && (
                        <div className="flex items-center text-gray-600">
                          <FiClock className="h-4 w-4 mr-2" />
                          <span className="capitalize">{job.jobType}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {job.description.length > 120 
                        ? `${job.description.substring(0, 120)}...` 
                        : job.description
                      }
                    </p>

                    <Link
                      to={`/job/${job._id}`}
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Jobs;