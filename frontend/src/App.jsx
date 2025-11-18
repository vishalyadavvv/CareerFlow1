import React, { useContext } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
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
import ScrollToTop from "./components/Layout/ScrollToTop";

// Main Layout component that always includes Footer
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthorized, loading } = useContext(Context);
  const location = useLocation();
  
  // Show loading during auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/JobZeelogo.png"
            alt="CareerFlow Logo"
            className="mx-auto h-16 w-auto mb-4 animate-pulse"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-indigo-600 font-medium">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    // Store intended destination
    localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }
  
  return <MainLayout>{children}</MainLayout>;
};

// Public Route Component - Always shows footer
const PublicRoute = ({ children, redirectIfAuth = true }) => {
  const { isAuthorized, loading } = useContext(Context);
  
  // Show loading during auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/JobZeelogo.png"
            alt="CareerFlow Logo"
            className="mx-auto h-16 w-auto mb-4 animate-pulse"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-indigo-600 font-medium">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Only redirect if user is authorized AND redirectIfAuth is true
  if (isAuthorized && redirectIfAuth) {
    // Check for intended destination after login
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath && redirectPath !== '/login' && redirectPath !== '/register' && redirectPath !== '/') {
      localStorage.removeItem('redirectAfterLogin');
      return <Navigate to={redirectPath} replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return <MainLayout>{children}</MainLayout>;
};

// Role-based route protection
const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthorized, loading } = useContext(Context);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-indigo-600 mt-2">Checking permissions...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return <MainLayout>{children}</MainLayout>;
};

const App = () => {
  const { loading } = useContext(Context);

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Routes>
        {/* Home Page - PUBLIC with Footer */}
        <Route 
          path="/" 
          element={
            <PublicRoute redirectIfAuth={false}>
              <Home />
            </PublicRoute>
          }
        />

        {/* Auth Pages - PUBLIC with Footer */}
        <Route 
          path="/login" 
          element={
            <PublicRoute redirectIfAuth={true}>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute redirectIfAuth={true}>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - with Footer */}
        <Route 
          path="/job/getall" 
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/job/:id" 
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/application/:id" 
          element={
            <ProtectedRoute>
              <Application />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/applications/me" 
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          } 
        />
        
        {/* Role-based protected routes with Footer */}
        <Route 
          path="/job/post" 
          element={
            <RoleBasedRoute allowedRoles={['Employer']}>
              <PostJob />
            </RoleBasedRoute>
          } 
        />
        <Route 
          path="/job/me" 
          element={
            <RoleBasedRoute allowedRoles={['Employer']}>
              <MyJobs />
            </RoleBasedRoute>
          } 
        />

        {/* Catch all route with Footer */}
        <Route path="*" element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        } />
      </Routes>
      
      <Toaster />
    </BrowserRouter>
  );
};

export default App;