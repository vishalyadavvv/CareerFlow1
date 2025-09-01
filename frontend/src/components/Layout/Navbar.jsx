import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import gsap from "gsap";
import { URL } from "../../../constant/api";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const navRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoutRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${URL}/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
      setShow(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Animation for navbar entrance
  useEffect(() => {
    if (isAuthorized) {
      // Animate logo
      gsap.fromTo(logoRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      
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
      // Show overlay with fade in
      setIsOverlayVisible(true);
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Open mobile menu with animation
      gsap.to(mobileMenuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Animate mobile menu items with stagger
      const mobileItems = mobileMenuRef.current.querySelectorAll("li, button");
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
      // Close mobile menu with animation
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
      
      // Hide overlay with fade out
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
  }, [location]);

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
   <nav
  ref={navRef}
  className={`w-full z-50 transition-all duration-500 
    fixed top-0 left-0 lg:sticky lg:top-0
    ${
      isAuthorized
        ? "opacity-100 translate-y-0 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg"
        : "opacity-0 -translate-y-full pointer-events-none"
    }`}
>


      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/JobZee-logos__white.png" 
                alt="logo" 
                className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105" 
              />
              <span className="ml-2 text-white font-bold text-xl hidden md:block transition-colors duration-300 group-hover:text-blue-200">
               CareerFlow
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            {menuLinks.map((item, index) => (
              <li key={item.label} ref={el => (menuItemsRef.current[index] = el)}>
                <Link 
                  to={item.path}
                  className="relative text-white font-medium py-2 px-1 transition-colors duration-300 hover:text-blue-200 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li ref={logoutRef}>
              <button 
                onClick={handleLogout}
                className="bg-transparent border-2 border-white text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:bg-white hover:text-blue-900 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                LOGOUT
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setShow(!show)}
              className="text-white p-2 rounded-full hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-blue-900 to-indigo-900 shadow-2xl transform translate-x-full opacity-0 z-50"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <Link 
                to="/" 
                className="flex items-center"
                onClick={() => setShow(false)}
              >
                <img 
                  src="/JobZee-logos__white.png" 
                  alt="logo" 
                  className="h-10" 
                />
                <span className="ml-2 text-white font-bold text-xl">JobZee</span>
              </Link>
              <button 
                onClick={() => setShow(false)}
                className="text-white p-1 rounded-full hover:bg-blue-800 transition-colors duration-300"
                aria-label="Close menu"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>
            
            <ul className="space-y-6">
              {menuLinks.map((item, index) => (
                <li key={item.label}>
                  <Link 
                    to={item.path}
                    className="block text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-blue-800 hover:pl-6"
                    onClick={() => setShow(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-blue-800 hover:pl-6"
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOverlayVisible && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden opacity-0"
          onClick={() => setShow(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;