import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import { URL } from "../constant/api";
import ScrollToTop from "./components/Layout/ScrollToTop";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Quick synchronous check first
        const hasToken = localStorage.getItem("careerflow-token") || 
                         document.cookie.includes("token=");
        
        // If no token, skip API call and show login immediately
        if (!hasToken) {
          setIsAuthorized(false);
          setUser(null);
          setInitializing(false);
          return;
        }

        // Only make API call if token exists
        const response = await axios.get(`${URL}/v1/user/getuser`, {
          withCredentials: true,
          timeout: 5000, // 5 second timeout
        });
        
        if (response.data?.user) {
          setUser(response.data.user);
          setIsAuthorized(true);
        } else {
          // Invalid response, clear auth
          setIsAuthorized(false);
          setUser(null);
          localStorage.removeItem("careerflow-token");
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        
        // On error, clear invalid tokens and show login
        setIsAuthorized(false);
        setUser(null);
        localStorage.removeItem("careerflow-token");
        
        // Clear potentially invalid cookies
        if (error.response?.status === 401 || error.response?.status === 403) {
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, [setIsAuthorized, setUser]);

  // Show minimal loading only during the very brief initialization
  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/JobZeelogo.png"
            alt="CareerFlow Logo"
            className="mx-auto h-16 w-auto mb-4"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-indigo-600 font-medium">Starting CareerFlow...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        {!isAuthorized ? (
          <>
            {/* Default route when not logged in → redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Private Routes when logged in */}
            <Route path="/" element={<Home />} />
            <Route path="/job/getall" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/applications/me" element={<MyApplications />} />
            <Route path="/job/post" element={<PostJob />} />
            <Route path="/job/me" element={<MyJobs />} />
            
            {/* Redirect auth pages to dashboard if already logged in */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;