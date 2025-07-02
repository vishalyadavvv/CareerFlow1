import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import gsap from "gsap";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const navRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoutRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Float in nav items with delay and stagger
  useEffect(() => {
    if (isAuthorized) {
      gsap.from([...menuItemsRef.current, logoutRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.5, // 👈 Add delay before animation starts
        stagger: 0.15,
        ease: "power2.out",
      });
    }
  }, [isAuthorized]);

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
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"} ref={navRef}>
      <div className="container">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>

        <ul className={show ? "show-menu menu" : "menu"}>
          {menuLinks.map((item, index) => (
            <li
              key={item.label}
              ref={(el) => (menuItemsRef.current[index] = el)}
            >
              <Link to={item.path} onClick={() => setShow(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <button ref={logoutRef} onClick={handleLogout}>
            LOGOUT
          </button>
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
