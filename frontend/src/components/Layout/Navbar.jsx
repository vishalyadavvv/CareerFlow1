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
  const [scrolled, setScrolled] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const navRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoutRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const handleLogout = async () => {
  try {
    const response = await axios.get(`${URL}/v1/user/logout`, {
      withCredentials: true,
    });
    toast.success(response.data.message);
    setIsAuthorized(false);
        setShow(false);
    navigate("/login");

  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
    setIsAuthorized(false);
    navigate("/login",);
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
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      
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
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
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

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
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
      {/* Spacer to prevent content jump when navbar is fixed */}
      {isAuthorized && <div className="h-16 md:h-18"></div>}
      
      <nav
        ref={navRef}
        className={`w-full z-50 transition-all duration-300 fixed top-0 left-0 right-0
          ${
            isAuthorized
              ? `opacity-100 translate-y-0 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-900/95 to-indigo-900/95 backdrop-blur-md shadow-xl' 
                    : 'bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg'
                }`
              : "opacity-0 -translate-y-full pointer-events-none"
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

            {/* Desktop Menu */}
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
              <li ref={logoutRef}>
                <button 
                  onClick={handleLogout}
                  className="bg-transparent border-2 border-white text-white font-medium py-2 px-4 xl:px-6 text-sm xl:text-base rounded-full transition-all duration-300 hover:bg-white hover:text-blue-900 hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  LOGOUT
                </button>
              </li>
            </ul>

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
          
          {/* Logo in mobile menu */}
          <div className="flex items-center justify-center mb-8 pb-6 border-b border-blue-700/50">
            <img 
              src="/JobZee-logos__white.png" 
              alt="logo" 
              className="h-10" 
            />
            <span className="ml-2 text-white font-bold text-xl">
              CareerFlow
            </span>
          </div>
          
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