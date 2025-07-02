import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    { id: 1, title: "1,23,441", subTitle: "Live Job", icon: <FaSuitcase /> },
    { id: 2, title: "91220", subTitle: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "2,34,200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "1,03,761", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  const imageRef = useRef(null);
  const titleRefs = useRef([]);

  const addToTitleRefs = (el) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      titleRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.6, ease: "power3.out" }
    );

    // Hover animations for image
    const img = imageRef.current;
    const handleImgEnter = () => {
      gsap.to(img, {
        scale: 1.1,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
        force3D: true,
        transformOrigin: "center center",
      });
    };
    const handleImgLeave = () => {
      gsap.to(img, {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
        transformOrigin: "center center",
      });
    };
    img.addEventListener("mouseenter", handleImgEnter);
    img.addEventListener("mouseleave", handleImgLeave);

    // Hover animations for titles
    titleRefs.current.forEach((el) => {
      const handleTitleEnter = () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          force3D: true,
          transformOrigin: "center center",
        });
      };
      const handleTitleLeave = () => {
        gsap.to(el, {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          force3D: true,
          transformOrigin: "center center",
        });
      };
      el.addEventListener("mouseenter", handleTitleEnter);
      el.addEventListener("mouseleave", handleTitleLeave);

      // Cleanup listeners on unmount for each title
      return () => {
        el.removeEventListener("mouseenter", handleTitleEnter);
        el.removeEventListener("mouseleave", handleTitleLeave);
      };
    });

    // Cleanup listeners on unmount for image
    return () => {
      img.removeEventListener("mouseenter", handleImgEnter);
      img.removeEventListener("mouseleave", handleImgLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        .title h1 {
          cursor: pointer;
          display: inline-block;
          margin-right: 0.3rem;
          will-change: transform;
        }
        .image img {
          cursor: pointer;
          display: block;
          max-width: 100%;
          will-change: transform;
        }
      `}</style>

      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1 ref={addToTitleRefs}>Find a job that suits</h1>
            <h1 ref={addToTitleRefs}>your interests and skills</h1>
            <p>
              Discover exciting opportunities in tech — from frontend development
              to backend engineering. Start your journey with companies looking
              for passionate coders like you!
            </p>
          </div>
          <div className="image">
            <img ref={imageRef} src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
