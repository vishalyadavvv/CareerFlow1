import React, { useContext, useState, useEffect } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import {URL} from "../../../constant/api"
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setShowRegister(true);
    }, 1000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${URL}/v1/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data?.message || "Registration successful! Please login.");

      // Clear fields
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");

      // ✅ Redirect to login page instead of setting authorized
      navigate("/login");

    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
      console.error("Registration error:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto p-8">
            <img 
              src="/JobZeelogo.png" 
              alt="JobZee Logo" 
              className="mx-auto h-20 w-auto mb-6 animate-bounce"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6 animate-pulse">
              Join CareerFlow Community
            </h1>
            <p className="text-xl text-gray-600">
              Start your journey to finding dream jobs or exceptional talent
            </p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {showRegister && (
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <img 
                src="/JobZeelogo.png" 
                alt="JobZee Logo" 
                className="mx-auto h-16 w-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800">Create your account</h3>
              <p className="text-gray-600 mt-2">Join us today and unlock new opportunities</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Register As</label>
                <div className="relative">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-colors duration-200"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    required
                  />
                  <FaPencilAlt className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    required
                  />
                  <MdOutlineMailOutline className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    required
                  />
                  <FaPhoneAlt className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    required
                  />
                  <RiLock2Fill className="absolute right-3 top-3.5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Use at least 8 characters with a mix of letters, numbers & symbols
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Create Account
              </button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                  >
                    Login Now
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right side Info */}
                  <div className="hidden md:flex bg-gradient-to-br from-indigo-500 to-purple-600 p-8 items-center justify-center">
            <div className="text-center text-white p-6">
              <h2 className="text-3xl font-bold mb-6">Why Join CareerFlow?</h2>
              <p className="text-indigo-100 mb-8 text-lg">
                Be part of a community that connects talent with opportunity
              </p>
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p>Secure and encrypted data protection</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p>Personalized job recommendations</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p>Network with industry professionals</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p>Career growth and development resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
          
      
      
    </section>
  );
};

export default Register;
