import React, { useContext, useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  useEffect(() => {
    // Show welcome message for 1 seconds, then transition to login form
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    // Show login form after welcome message
    const loginTimer = setTimeout(() => {
      setShowLogin(true);
    }, 1000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(loginTimer);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data?.message || "Login successful!");
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto p-8">
              <div className="mb-8 animate-bounce">
                <img 
                  src="/JobZeelogo.png" 
                  alt="JobZee Logo" 
                  className="mx-auto h-20 w-auto"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6 animate-pulse">
                Welcome to CareerFlow
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Your gateway to dream careers and exceptional talent
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center text-indigo-600">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  <span>Find Your Dream Job</span>
                </div>
                <div className="flex items-center text-indigo-600">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>Connect with Talent</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        {showLogin && (
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <img 
                  src="/JobZeelogo.png" 
                  alt="JobZee Logo" 
                  className="mx-auto h-16 w-auto mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-800">Login to your account</h3>
                <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Login As</label>
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
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                      required
                    />
                    <RiLock2Fill className="absolute right-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  Login
                </button>

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link 
                      to="/register" 
                      className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                    >
                      Register Now
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            <div className="hidden md:flex bg-gradient-to-br from-indigo-500 to-purple-600 p-8 items-center justify-center">
              <div className="text-center text-white p-6">
                <h2 className="text-3xl font-bold mb-6">JoinCareerFlow Today</h2>
                <p className="text-indigo-100 mb-8 text-lg">
                  Discover thousands of job opportunities or find the perfect candidate for your company
                </p>
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p>Access to exclusive job listings</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p>Secure and personalized experience</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p>Connect with top employers and candidates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Login;