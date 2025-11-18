import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import Footer from "../Layout/Footer";

const Home = () => {
  return (
    <>
      <section className="homePage page">
        <div className="w-full min-h-screen flex flex-col">
          {/* Main content */}
          <div className="flex-grow">
            <div className="px-4 sm:px-6 lg:px-8">
              <HeroSection />
            </div>
            
            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
              <HowItWorks />
            </div>
            
            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gray-50">
              <PopularCategories />
            </div>
            
            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
              <PopularCompanies />
            </div>
          </div>
          
          {/* Footer - Always visible regardless of auth state */}
          <div className="w-full mt-auto">
            {/* <Footer /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;