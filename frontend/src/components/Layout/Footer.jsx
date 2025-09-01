import React, { useContext, useEffect, useRef } from "react";
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
  const socialLinksRef = useRef([]);
  const copyrightRef = useRef(null);
  const scrollTopRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (isAuthorized && footerRef.current) {
      // Animate footer entrance
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate social icons with stagger
      gsap.fromTo(
        socialLinksRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate copyright text
      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate scroll to top button
      gsap.fromTo(
        scrollTopRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isAuthorized]);

  const socialLinks = [
    {
      icon: <FaFacebookF className="text-lg" />,
      url: "https://www.facebook.com/profile.php?id=100024670202929",
      color: "hover:bg-blue-600"
    },
    {
      icon: <FaYoutube className="text-lg" />,
      url: "https://www.youtube.com/@vickymimit9987",
      color: "hover:bg-red-600"
    },
    {
      icon: <FaLinkedin className="text-lg" />,
      url: "https://www.linkedin.com/in/vicky-kumar-691a92222/",
      color: "hover:bg-blue-500"
    },
    {
      icon: <RiInstagramFill className="text-lg" />,
      url: "https://www.instagram.com/vickyyyky_singh/",
      color: "hover:bg-pink-600"
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/job/getall" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer
      ref={footerRef}
      className={`bg-gradient-to-r from-gray-900 to-blue-900 text-white pt-16 pb-8 transition-all duration-500 ${
        isAuthorized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <img 
                src="/JobZee-logos__white.png" 
                alt="JobZee Logo" 
                className="h-10 mr-2"
              />
             CareerFlow
            </h3>
            <p className="text-gray-300 mb-6">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with our advanced platform.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-blue-800 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${link.color}`}
                  ref={el => (socialLinksRef.current[index] = el)}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Seeker */}
          <div>
            <h4 className="text-xl font-semibold mb-6">For Job Seekers</h4>
            <ul className="space-y-3">
              <li><Link to="/job/getall" className="text-gray-300 hover:text-white transition-colors duration-300">Browse Jobs</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-300">Create Account</Link></li>
              <li><Link to="/applications/me" className="text-gray-300 hover:text-white transition-colors duration-300">Job Alerts</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">Career Advice</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-xl font-semibold mb-6">For Employers</h4>
            <ul className="space-y-3">
              <li><Link to="/job/post" className="text-gray-300 hover:text-white transition-colors duration-300">Post a Job</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-300">Create Account</Link></li>
              <li><Link to="/job/me" className="text-gray-300 hover:text-white transition-colors duration-300">Browse Candidates</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing Plans</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p ref={copyrightRef} className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()}CareerFlow. All Rights Reserved by Vishal.
          </p>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        ref={scrollTopRef}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 z-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;