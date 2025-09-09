import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  const footerRef = useRef(null);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized animations - only run once when authorized
  useEffect(() => {
    if (isAuthorized && footerRef.current && !animationsLoaded) {
      // Single timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
          once: true // Only trigger once for better performance
        }
      });

      // Animate footer with reduced complexity
      tl.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        ".footer-section",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

      setAnimationsLoaded(true);
    }
  }, [isAuthorized, animationsLoaded]);

  const socialLinks = [
    {
      icon: <FaFacebookF className="text-sm sm:text-base lg:text-lg" />,
      url: "https://www.facebook.com/profile.php?id=100024670202929",
      color: "hover:bg-blue-600",
      label: "Facebook"
    },
    {
      icon: <FaYoutube className="text-sm sm:text-base lg:text-lg" />,
      url: "https://www.youtube.com/@vickymimit9987",
      color: "hover:bg-red-600",
      label: "YouTube"
    },
    {
      icon: <FaLinkedin className="text-sm sm:text-base lg:text-lg" />,
      url: "https://www.linkedin.com/in/vicky-kumar-691a92222/",
      color: "hover:bg-blue-500",
      label: "LinkedIn"
    },
    {
      icon: <RiInstagramFill className="text-sm sm:text-base lg:text-lg" />,
      url: "https://www.instagram.com/vickyyyky_singh/",
      color: "hover:bg-pink-600",
      label: "Instagram"
    }
  ];

  // Updated navigation links to match your routing structure
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/job/getall" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" }
  ];

  const jobSeekerLinks = [
    { name: "Browse Jobs", path: "/job/getall" },
    { name: "Create Account", path: "/register" },
    { name: "My Applications", path: "/applications/me" },
    { name: "Login", path: "/login" }
  ];

  const employerLinks = [
    { name: "Post a Job", path: "/job/post" },
    { name: "Create Account", path: "/register" },
    { name: "My Jobs", path: "/job/me" },
    { name: "Login", path: "/login" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" }
  ];

  if (!isAuthorized) return null;

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-r from-gray-900 to-blue-900 text-white pt-12 sm:pt-16 pb-6 sm:pb-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Company Info */}
          <div className="footer-section sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
              <img 
                src="/JobZee-logos__white.png" 
                alt="JobZee Logo" 
                className="h-8 sm:h-10 mr-2"
                loading="lazy"
              />
              CareerFlow
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with our advanced platform.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-blue-800 p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${link.color} touch-manipulation`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center text-sm sm:text-base py-1 touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Seeker */}
          <div className="footer-section">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">For Job Seekers</h4>
            <ul className="space-y-2 sm:space-y-3">
              {jobSeekerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div className="footer-section">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">For Employers</h4>
            <ul className="space-y-2 sm:space-y-3">
              {employerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 block touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-section border-t border-gray-700 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
            &copy; {new Date().getFullYear()} CareerFlow. All Rights Reserved by Vishal.
          </p>
          
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
            {legalLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path} 
                className="hover:text-white transition-colors duration-300 py-1 touch-manipulation"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-blue-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 active:scale-95 z-50 touch-manipulation"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-sm sm:text-base" />
        </button>
      )}
    </footer>
  );
};

export default Footer;