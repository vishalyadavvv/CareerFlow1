import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZee Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Join JobZee to unlock powerful tools for job seekers and recruiters.
                <br/>
Option 2:
Create your free account and manage your job search or hiring in one place.<br/>
Option 3:
Set up your profile to start applying for jobs or posting listings in minutes.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Discover jobs that match your skills or post roles to find the best talent.<br/>
                Option 2:
                Use smart filters to find the perfect job or publish vacancies instantly.<br/>
                Option 3:
                Explore career opportunities or promote openings for thousands to see.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Apply with a single click or shortlist candidates who match your criteria.<br/>
                Option 2:
                Track applications or connect with potential hires effortlessly.<br/>
                Option 3:
                Take the next step—submit applications or reach out to top candidates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
