import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { ChevronDown, User, Mail, Phone, Shield, Settings, LogOut } from "lucide-react";
import gsap from "gsap";
import { URL } from "../../../constant/api";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const navRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoutRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Handle scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${URL}/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      setShow(false);
      setIsProfileOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(false);
      navigate("/");
    }
  };

  // Animation for navbar entrance
  useEffect(() => {
    // Animate logo (always visible now)
    gsap.fromTo(logoRef.current, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    if (isAuthorized) {
      // Animate desktop menu items with delay and stagger
      gsap.fromTo([...menuItemsRef.current, logoutRef.current], 
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: 0.3,
          stagger: 0.1,
          ease: "power2.out" 
        }
      );
    }
  }, [isAuthorized]);

  // Animation for mobile menu and overlay
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      
      setIsOverlayVisible(true);
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(mobileMenuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      
      const mobileItems = mobileMenuRef.current.querySelectorAll("li, button, a");
      gsap.fromTo(mobileItems,
        { x: 20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.08,
          delay: 0.2,
          ease: "power2.out" 
        }
      );
    } else {
      document.body.style.overflow = 'unset';
      
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
      
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setIsOverlayVisible(false);
          }
        });
      }
    }
  }, [show]);

  // Close mobile menu when route changes
  useEffect(() => {
    setShow(false);
    setIsProfileOpen(false);
  }, [location]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShow(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuLinks = [
    { label: "HOME", path: "/" },
    { label: "ALL JOBS", path: "/job/getall" },
    {
      label:
        user && user.role === "Employer"
          ? "APPLICANT'S APPLICATIONS"
          : "MY APPLICATIONS",
      path: "/applications/me",
    },
    ...(user?.role === "Employer"
      ? [
          { label: "POST NEW JOB", path: "/job/post" },
          { label: "VIEW YOUR JOBS", path: "/job/me" },
        ]
      : []),
  ];

  return (
    <>
      {/* Spacer to prevent content jump - always show now */}
      <div className="h-16 md:h-18"></div>
      
      <nav
        ref={navRef}
        className={`w-full z-50 transition-all duration-300 fixed top-0 left-0 right-0
          ${
            scrolled 
              ? 'bg-gradient-to-r from-blue-900/95 to-indigo-900/95 backdrop-blur-md shadow-xl' 
              : 'bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg'
          }`}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <img 
                  src="https://res.cloudinary.com/dtcaankcx/image/upload/v1756847080/Gemini_Generated_Image_cpf0s3cpf0s3cpf0-removebg-preview_cmvabg.png" 
                  alt="logo" 
                  className="h-30 w-40 transition-transform duration-300 group-hover:scale-105" 
                />
              </Link>
            </div>

            {/* Conditional Desktop Menu - Show different content based on auth */}
            {isAuthorized ? (
              // Logged In Menu
              <ul className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                {menuLinks.map((item, index) => (
                  <li key={item.label} ref={el => (menuItemsRef.current[index] = el)}>
                    <Link 
                      to={item.path}
                      className="relative text-white font-medium py-2 px-2 xl:px-3 text-sm xl:text-base transition-colors duration-300 hover:text-blue-200 group whitespace-nowrap"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}

                {/* Profile Dropdown */}
                {user && (
                  <li className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-2 hover:bg-white/20 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-white/50"
                      />
                      <span className="text-sm font-medium hidden xl:block">{user.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                        {/* User Info Header */}
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* User Details */}
                        <div className="p-6 space-y-4">
                          <div className="flex items-start space-x-3 text-gray-600">
                            <Mail className="w-5 h-5 mt-0.5 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Email Address</p>
                              <p className="text-sm font-medium text-gray-900">{user.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-gray-600">
                            <Phone className="w-5 h-5 mt-0.5 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Phone Number</p>
                              <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-gray-600">
                            <Shield className="w-5 h-5 mt-0.5 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">User Role</p>
                              <p className="text-sm font-medium text-gray-900">{user.role}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50">
                          <button 
                            onClick={() => {
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
                          >
                            <Settings className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium">Account Settings</span>
                          </button>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 hover:shadow-sm rounded-lg transition-all duration-200"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                )}
              </ul>
            ) : (
              // Not Logged In - Show Login/Signup Buttons
              <div className="hidden lg:flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="text-white font-medium py-2 px-4 text-sm xl:text-base transition-colors duration-300 hover:text-blue-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-white text-blue-900 font-semibold py-2 px-6 rounded-full text-sm xl:text-base transition-all duration-300 hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-shrink-0">
              <button 
                onClick={() => setShow(!show)}
                className="text-white p-2 rounded-full hover:bg-blue-800/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300/50 touch-manipulation"
                aria-label="Toggle menu"
              >
                {show ? (
                  <RxCross2 className="w-6 h-6" />
                ) : (
                  <GiHamburgerMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="lg:hidden fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[85vw] bg-gradient-to-b from-blue-900 to-indigo-900 shadow-2xl transform translate-x-full opacity-0 z-50 overflow-y-auto"
      >
        <div className="p-4 sm:p-6">
          {/* Close button */}
          <div className="flex justify-end mb-8 pt-2">
            <button 
              onClick={() => setShow(false)}
              className="text-white p-2 rounded-full hover:bg-blue-800/50 transition-colors duration-300 touch-manipulation"
              aria-label="Close menu"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
          </div>
          
          {isAuthorized ? (
            <>
              {/* User Profile Section in Mobile Menu */}
              {user && (
                <div className="mb-8 pb-6 border-b border-blue-700/50">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-white/50"
                    />
                    <div>
                      <h3 className="text-white font-bold text-lg">{user.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* User details in mobile */}
                  <div className="space-y-2 text-white/80 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Menu items */}
              <ul className="space-y-2">
                {menuLinks.map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.path}
                      className="block text-white font-medium py-4 px-4 rounded-lg transition-all duration-300 hover:bg-blue-800/50 hover:pl-6 text-base touch-manipulation"
                      onClick={() => setShow(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-blue-700/50 mt-6">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left text-white font-medium py-4 px-4 rounded-lg transition-all duration-300 hover:bg-blue-800/50 hover:pl-6 text-base touch-manipulation"
                  >
                    LOGOUT
                  </button>
                </li>
              </ul>
            </>
          ) : (
            // Mobile Menu - Not Logged In
            <div className="space-y-4">
              <h3 className="text-white font-bold text-xl mb-6">Welcome to CareerFlow</h3>
              <Link 
                to="/login"
                className="block w-full text-center bg-white/10 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:bg-white/20 touch-manipulation"
                onClick={() => setShow(false)}
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="block w-full text-center bg-white text-blue-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-lg touch-manipulation"
                onClick={() => setShow(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOverlayVisible && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden opacity-0 touch-manipulation"
          onClick={() => setShow(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;