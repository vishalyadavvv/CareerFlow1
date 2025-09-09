import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <div className="w-full">
          {/* Hero Section - Full width with responsive padding */}
          <div className="px-4 sm:px-6 lg:px-8">
            <HeroSection />
          </div>
          
          {/* How It Works - Responsive container */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <HowItWorks />
          </div>
          
          {/* Popular Categories - Responsive grid container */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gray-50">
            <PopularCategories />
          </div>
          
          {/* Popular Companies - Responsive container */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <PopularCompanies />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;