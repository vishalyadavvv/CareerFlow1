import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import gsap from "gsap";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  const footerRef = useRef(null);

  useEffect(() => {
    if (isAuthorized && footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [isAuthorized]);

  return (
    <footer
      className={isAuthorized ? "footerShow" : "footerHide"}
      ref={footerRef}
    >
      <div>&copy; All Rights Reserved by Vicky.</div>
      <div>
        <Link
          to={"https://www.facebook.com/profile.php?id=100024670202929"}
          target="_blank"
        >
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@vickymimit9987"} target="_blank">
          <FaYoutube />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/vicky-kumar-691a92222/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link
          to={"https://www.instagram.com/vickyyyky_singh/"}
          target="_blank"
        >
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
